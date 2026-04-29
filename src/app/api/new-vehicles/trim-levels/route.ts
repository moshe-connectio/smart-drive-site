/**
 * POST /api/new-vehicles/trim-levels
 * Add a new trim level
 */

import { createServerSupabaseClient } from '@core/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      model_id: model_id_input,
      manufacturer,
      manufacturer_slug,
      model,
      model_slug,
      name,
      slug,
      description,
      price,
      monthly_payment,
      transmission,
      engine_type,
      fuel_type,
      power_hp,
      torque_nm,
      acceleration_0_100,
      top_speed,
      fuel_consumption,
      co2_emissions,
      body_dimensions,
      weight,
      seats,
      doors,
      trunk_volume,
      display_order,
    } = body;

    // Validation
    if (!name || !slug || !price) {
      return Response.json(
        { error: 'name, slug, and price are required' },
        { status: 400 }
      );
    }

    const client = createServerSupabaseClient();

    // Resolve model_id from model+manufacturer name/slug if not provided
    let model_id: string | null = model_id_input || null;
    if (!model_id) {
      if (!model && !model_slug) {
        return Response.json(
          { error: 'Provide either model_id, or model/model_slug (with manufacturer/manufacturer_slug)' },
          { status: 400 }
        );
      }

      // Find manufacturer (optional but recommended to disambiguate)
      let manufacturer_id: string | null = null;
      if (manufacturer || manufacturer_slug) {
        const mq = client.from('new_vehicles_manufacturers').select('id, name, slug');
        const { data: mfrRows, error: mfrErr } = manufacturer_slug
          ? await mq.ilike('slug', manufacturer_slug)
          : await mq.ilike('name', manufacturer as string);
        if (mfrErr) throw mfrErr;
        if (!mfrRows || mfrRows.length === 0) {
          return Response.json(
            { error: `Manufacturer not found: ${manufacturer_slug || manufacturer}` },
            { status: 404 }
          );
        }
        manufacturer_id = mfrRows[0].id;
      }

      // Find model
      let modelQuery = client.from('new_vehicles_models').select('id, name, slug, manufacturer_id');
      modelQuery = model_slug
        ? modelQuery.ilike('slug', model_slug)
        : modelQuery.ilike('name', model as string);
      if (manufacturer_id) modelQuery = modelQuery.eq('manufacturer_id', manufacturer_id);
      const { data: modelRows, error: modelErr } = await modelQuery;
      if (modelErr) throw modelErr;

      if (!modelRows || modelRows.length === 0) {
        return Response.json(
          { error: `Model not found: ${model_slug || model}${manufacturer ? ` (manufacturer: ${manufacturer})` : ''}` },
          { status: 404 }
        );
      }
      if (modelRows.length > 1) {
        return Response.json(
          {
            error: `Multiple models match "${model_slug || model}". Provide manufacturer to disambiguate.`,
            matches: modelRows.map((r) => ({ id: r.id, name: r.name, slug: r.slug })),
          },
          { status: 400 }
        );
      }
      model_id = modelRows[0].id;
    }

    // Build payload (skip undefined to avoid overwriting on update)
    const payload: Record<string, unknown> = {
      model_id,
      name,
      slug,
      price,
      is_active: true,
    };
    if (description !== undefined) payload.description = description || null;
    if (monthly_payment !== undefined) payload.monthly_payment = monthly_payment ?? null;
    if (transmission !== undefined) payload.transmission = transmission || null;
    if (engine_type !== undefined) payload.engine_type = engine_type || null;
    if (fuel_type !== undefined) payload.fuel_type = fuel_type || null;
    if (power_hp !== undefined) payload.power_hp = power_hp || null;
    if (torque_nm !== undefined) payload.torque_nm = torque_nm || null;
    if (acceleration_0_100 !== undefined) payload.acceleration_0_100 = acceleration_0_100 || null;
    if (top_speed !== undefined) payload.top_speed = top_speed || null;
    if (fuel_consumption !== undefined) payload.fuel_consumption = fuel_consumption || null;
    if (co2_emissions !== undefined) payload.co2_emissions = co2_emissions || null;
    if (body_dimensions !== undefined) payload.body_dimensions = body_dimensions || null;
    if (weight !== undefined) payload.weight = weight || null;
    if (seats !== undefined) payload.seats = seats || null;
    if (doors !== undefined) payload.doors = doors || null;
    if (trunk_volume !== undefined) payload.trunk_volume = trunk_volume || null;
    if (display_order !== undefined) payload.display_order = display_order || 0;

    // Check if trim already exists for this model (by slug or by name)
    const { data: existing, error: findErr } = await client
      .from('new_vehicles_trim_levels')
      .select('id')
      .eq('model_id', model_id as string)
      .or(`slug.eq.${slug},name.eq.${name}`)
      .limit(1)
      .maybeSingle();

    if (findErr) {
      console.error('Error checking existing trim level:', findErr);
      return Response.json(
        { error: findErr.message || 'Failed to check existing trim level' },
        { status: 400 }
      );
    }

    let data;
    let error;
    let status = 201;

    if (existing?.id) {
      // Update existing record
      payload.updated_at = new Date().toISOString();
      ({ data, error } = await client
        .from('new_vehicles_trim_levels')
        .update(payload)
        .eq('id', existing.id)
        .select()
        .single());
      status = 200;
    } else {
      // Insert new record
      ({ data, error } = await client
        .from('new_vehicles_trim_levels')
        .insert([payload])
        .select()
        .single());
    }

    if (error) {
      console.error('Error saving trim level:', error);
      return Response.json(
        { error: error.message || 'Failed to save trim level' },
        { status: 400 }
      );
    }

    return Response.json(
      { ...data, _action: existing?.id ? 'updated' : 'created' },
      { status }
    );
  } catch (error) {
    console.error('API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/new-vehicles/trim-levels?model_id=xxx
 * Get trim levels by model
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const model_id = searchParams.get('model_id');

    const client = createServerSupabaseClient();

    let query = client.from('trim_levels_full_info').select('*');

    if (model_id) {
      query = query.eq('model_id', model_id);
    }

    const { data, error } = await query
      .order('display_order', { ascending: true })
      .order('price', { ascending: true });

    if (error) {
      throw error;
    }

    return Response.json(data);
  } catch (error) {
    console.error('Error fetching trim levels:', error);
    return Response.json(
      { error: 'Failed to fetch trim levels' },
      { status: 500 }
    );
  }
}
