/**
 * POST /api/new-vehicles/models
 * Create, update, or delete a model
 * active=true + not exists → create
 * active=true + exists → update
 * active=false + exists → delete from DB
 */

import { revalidatePath } from 'next/cache';
import { createServerSupabaseClient } from '@core/lib/supabase';

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u0590-\u05ff-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      manufacturer_id,
      manufacturer_name,
      name,
      name_he,
      slug,
      active = true,
      description,
      image_url,
      body_type,
      segment,
      year_from,
      year_to,
      base_price,
      display_order,
    } = body;

    // Validation
    if (!name) {
      return Response.json({ error: 'name is required' }, { status: 400 });
    }

    if (!manufacturer_id && !manufacturer_name) {
      return Response.json({ error: 'manufacturer_name or manufacturer_id is required' }, { status: 400 });
    }

    const client = createServerSupabaseClient();

    // Resolve manufacturer_id from name if not provided
    let resolvedManufacturerId = manufacturer_id;
    if (!resolvedManufacturerId && manufacturer_name) {
      const { data: mfr, error: mfrError } = await client
        .from('new_vehicles_manufacturers')
        .select('id')
        .ilike('name', manufacturer_name)
        .single();

      if (mfrError || !mfr) {
        return Response.json(
          { error: `Manufacturer "${manufacturer_name}" not found` },
          { status: 404 }
        );
      }
      resolvedManufacturerId = mfr.id;
    }

    // Check if model already exists for this manufacturer
    const { data: existing } = await client
      .from('new_vehicles_models')
      .select('*')
      .eq('manufacturer_id', resolvedManufacturerId)
      .ilike('name', name)
      .single();

    // active=false → delete
    if (!active) {
      if (!existing) {
        return Response.json({ message: 'Model not found, nothing to delete', _action: 'no_change' });
      }

      // Delete related trim levels and their specifications first
      const { data: trims } = await client
        .from('new_vehicles_trim_levels')
        .select('id')
        .eq('model_id', existing.id);

      if (trims && trims.length > 0) {
        const trimIds = trims.map((t: { id: string }) => t.id);
        await client.from('new_vehicles_specifications').delete().in('trim_id', trimIds);
        await client.from('new_vehicles_trim_levels').delete().eq('model_id', existing.id);
      }

      // Delete model images
      await client.from('new_vehicles_model_images').delete().eq('model_id', existing.id);

      const { error: delError } = await client
        .from('new_vehicles_models')
        .delete()
        .eq('id', existing.id);

      if (delError) {
        return Response.json({ error: delError.message }, { status: 400 });
      }

      revalidatePath('/');
      revalidatePath('/new-vehicles');
      return Response.json({ message: `Model "${name}" deleted`, _action: 'deleted' });
    }

    const resolvedSlug = slug ? toSlug(slug) : toSlug(name);

    const modelFields = {
      manufacturer_id: resolvedManufacturerId,
      name,
      name_he: name_he ?? null,
      slug: resolvedSlug,
      description: description ?? null,
      image_url: image_url ?? null,
      body_type: body_type ?? null,
      segment: segment ?? null,
      year_from: year_from ?? null,
      year_to: year_to ?? null,
      base_price: base_price ?? null,
      display_order: display_order ?? 0,
      is_active: true,
    };

    // Existing → update changed fields
    if (existing) {
      const updates: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(modelFields)) {
        if (key === 'manufacturer_id') continue;
        if (JSON.stringify(existing[key]) !== JSON.stringify(value)) {
          updates[key] = value;
        }
      }

      if (Object.keys(updates).length === 0) {
        return Response.json({ ...existing, _action: 'no_change' });
      }

      const { data, error } = await client
        .from('new_vehicles_models')
        .update(updates)
        .eq('id', existing.id)
        .select()
        .single();

      if (error) {
        return Response.json({ error: error.message }, { status: 400 });
      }

      revalidatePath('/');
      revalidatePath('/new-vehicles');
      return Response.json({ ...data, _action: 'updated' });
    }

    // New → insert
    const { data, error } = await client
      .from('new_vehicles_models')
      .insert([modelFields])
      .select()
      .single();

    if (error) {
      console.error('Error adding model:', error);
      return Response.json({ error: error.message || 'Failed to add model' }, { status: 400 });
    }

    revalidatePath('/');
    revalidatePath('/new-vehicles');
    return Response.json({ ...data, _action: 'created' }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/new-vehicles/models?manufacturer_id=xxx
 * Get models by manufacturer
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const manufacturer_id = searchParams.get('manufacturer_id');

    const client = createServerSupabaseClient();

    let query = client.from('models_with_manufacturer').select('*');

    if (manufacturer_id) {
      query = query.eq('manufacturer_id', manufacturer_id);
    }

    const { data, error } = await query
      .order('display_order', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    return Response.json(data);
  } catch (error) {
    console.error('Error fetching models:', error);
    return Response.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}
