/**
 * POST /api/new-vehicles/manufacturers
 * Add a new manufacturer
 */

import { createServerSupabaseClient } from '@core/lib/supabase';
import type { Manufacturer } from '@modules/new-vehicles/types';

/**
 * Convert any string to a URL-safe slug
 * "Alfa Romeo" -> "alfa-romeo"
 */
function toSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0590-\u05ff]+/g, '-') // replace non-alphanumeric (keep Hebrew) with dash
    .replace(/^-+|-+$/g, '');                   // trim leading/trailing dashes
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug: rawSlug, logo_url, banner_url, description, country, website_url, display_order } = body;

    // Validation
    if (!name) {
      return Response.json(
        { error: 'name is required' },
        { status: 400 }
      );
    }

    // Auto-generate slug from name if not provided, always sanitize
    const slug = toSlug(rawSlug || name);

    const client = createServerSupabaseClient();

    // Check if manufacturer already exists by name
    const { data: existing } = await client
      .from('new_vehicles_manufacturers')
      .select('*')
      .eq('name', name)
      .single();

    if (existing) {
      // Build update payload only with changed fields
      const updates: Record<string, unknown> = {};
      const newSlug = toSlug(rawSlug || name);
      if (newSlug !== existing.slug) updates.slug = newSlug;
      if (logo_url !== undefined && logo_url !== existing.logo_url) updates.logo_url = logo_url || null;
      if (banner_url !== undefined && banner_url !== existing.banner_url) updates.banner_url = banner_url || null;
      if (description !== undefined && description !== existing.description) updates.description = description || null;
      if (country !== undefined && country !== existing.country) updates.country = country || null;
      if (website_url !== undefined && website_url !== existing.website_url) updates.website_url = website_url || null;
      if (display_order !== undefined && display_order !== existing.display_order) updates.display_order = display_order;

      if (Object.keys(updates).length === 0) {
        // No changes — return existing as-is
        return Response.json({ ...existing, _action: 'no_change' }, { status: 200 });
      }

      const { data: updated, error: updateError } = await client
        .from('new_vehicles_manufacturers')
        .update(updates)
        .eq('id', existing.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating manufacturer:', updateError);
        return Response.json(
          { error: updateError.message || 'Failed to update manufacturer' },
          { status: 400 }
        );
      }

      return Response.json({ ...updated, _action: 'updated' }, { status: 200 });
    }

    // Insert new manufacturer
    const { data, error } = await client
      .from('new_vehicles_manufacturers')
      .insert([
        {
          name,
          slug,
          logo_url: logo_url || null,
          banner_url: banner_url || null,
          description: description || null,
          country: country || null,
          website_url: website_url || null,
          display_order: display_order || 0,
          is_active: true,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error adding manufacturer:', error);
      return Response.json(
        { error: error.message || 'Failed to add manufacturer' },
        { status: 400 }
      );
    }

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
 * GET /api/new-vehicles/manufacturers
 * Get all manufacturers
 */
export async function GET(request: Request) {
  try {
    const client = createServerSupabaseClient();

    const { data, error } = await client
      .from('manufacturers_with_counts')
      .select('*')
      .order('display_order', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    return Response.json(data);
  } catch (error) {
    console.error('Error fetching manufacturers:', error);
    return Response.json(
      { error: 'Failed to fetch manufacturers' },
      { status: 500 }
    );
  }
}
