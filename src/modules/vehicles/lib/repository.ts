import { createServerSupabaseClient } from '@core/lib/supabase';
import { extractIdFromSlug } from '@shared/utils/formatting';
import { logger } from '@core/lib/logger';

export type VehicleCondition = 'חדש' | '0 ק״מ' | 'משומש';

export type Vehicle = {
  id: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  external_id: string | null;
  crmid: string | null;
  slug: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  km: number | null;
  gear_type: string | null;
  fuel_type: string | null;
  condition: VehicleCondition;
  trim: string | null;
  hand: number | null;
  categories: string[];
  main_image_url: string | null;
  short_description: string | null;
  monthly_payment: number | null;
  images: VehicleImage[] | null;
  raw_data: Record<string, unknown> | null;
};

export type VehicleImage = {
  id: string;
  vehicle_id: string;
  image_url: string;
  position: number;
  alt_text: string | null;
  uploaded_at: string;
};

const VEHICLE_IMAGES_RELATION_MISSING = 'PGRST200';
const NO_ROWS_FOUND = 'PGRST116';

export async function getPublishedVehicles(): Promise<Vehicle[]> {
  try {
    const client = createServerSupabaseClient();

    // Fetch both published vehicles AND recently sold vehicles (is_published = false)
    // so we can show sold items with a ribbon for up to 2 days.
    const response = await client
      .from('vehicles')
      .select(`
        *,
        images:vehicle_images(id, vehicle_id, image_url, position, alt_text, uploaded_at)
      `)
      .order('created_at', { ascending: false });

    let data = response.data;
    let error = response.error;

    if (error && error.code === VEHICLE_IMAGES_RELATION_MISSING) {
      logger.warn(
        '⚠️ vehicle_images relation not found, falling back to basic fetch'
      );
      const fallbackResponse = await client
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });
      data = fallbackResponse.data;
      error = fallbackResponse.error;
    }

    if (error) {
      logger.error('Error fetching vehicles:', error);
      throw new Error(`Failed to fetch vehicles: ${error.message}`);
    }

    return data ?? [];
  } catch (err) {
    logger.error('Unexpected error in getPublishedVehicles:', err);
    throw err;
  }
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const id = extractIdFromSlug(slug);
  return getVehicleById(id);
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  try {
    const client = createServerSupabaseClient();

    const response = await client
      .from('vehicles')
      .select(`
        *,
        images:vehicle_images(id, vehicle_id, image_url, position, alt_text, uploaded_at)
      `)
      .eq('id', id)
      .single();

    let data = response.data;
    let error = response.error;

    if (error && error.code === VEHICLE_IMAGES_RELATION_MISSING) {
      logger.warn(
        '⚠️ vehicle_images relation not found, falling back to basic fetch'
      );
      const fallbackResponse = await client
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single();
      data = fallbackResponse.data;
      error = fallbackResponse.error;
    }

    if (error) {
      logger.error('Error fetching vehicle by id:', error);
      throw new Error(`Failed to fetch vehicle: ${error.message}`);
    }

    return data ?? null;
  } catch (err) {
    logger.error('Unexpected error in getVehicleById:', err);
    throw err;
  }
}

export async function getVehicleByIdSuffix(idSuffix: string): Promise<Vehicle | null> {
  try {
    const client = createServerSupabaseClient();

    const response = await client
      .from('vehicles')
      .select(`
        *,
        images:vehicle_images(id, vehicle_id, image_url, position, alt_text, uploaded_at)
      `);

    let data = response.data;
    let error = response.error;

    if (error && error.code === VEHICLE_IMAGES_RELATION_MISSING) {
      logger.warn(
        '⚠️ vehicle_images relation not found, falling back to basic fetch'
      );
      const fallbackResponse = await client
        .from('vehicles')
        .select('*');
      data = fallbackResponse.data;
      error = fallbackResponse.error;
    }

    if (error) {
      logger.error('Error fetching vehicles:', error);
      throw new Error(`Failed to fetch vehicles: ${error.message}`);
    }

    const vehicle = data?.find((v: Vehicle) => v.id.endsWith(idSuffix));
    return vehicle ?? null;
  } catch (err) {
    logger.error('Unexpected error in getVehicleByIdSuffix:', err);
    throw err;
  }
}

export async function getVehicleByCrmId(crmid: string): Promise<Vehicle | null> {
  try {
    const client = createServerSupabaseClient();

    const response = await client
      .from('vehicles')
      .select(`
        *,
        images:vehicle_images(id, vehicle_id, image_url, position, alt_text, uploaded_at)
      `)
      .eq('crmid', crmid)
      .single();

    let data = response.data;
    let error = response.error;

    if (error && error.code === VEHICLE_IMAGES_RELATION_MISSING) {
      logger.warn(
        '⚠️ vehicle_images relation not found, falling back to basic fetch'
      );
      const fallbackResponse = await client
        .from('vehicles')
        .select('*')
        .eq('crmid', crmid)
        .single();
      data = fallbackResponse.data;
      error = fallbackResponse.error;
    }

    if (error && error.code !== NO_ROWS_FOUND) {
      logger.error('Error fetching vehicle by CRM ID:', error);
      throw new Error(`Failed to fetch vehicle: ${error.message}`);
    }

    return data ?? null;
  } catch (err) {
    logger.error('Unexpected error in getVehicleByCrmId:', err);
    throw err;
  }
}

export type CreateVehicleInput = Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>;

export async function createVehicle(
  vehicleData: CreateVehicleInput
): Promise<Vehicle> {
  try {
    const client = createServerSupabaseClient();

    const { data, error } = await client
      .from('vehicles')
      .insert([vehicleData])
      .select(`
        *,
        images:vehicle_images(id, vehicle_id, image_url, position, alt_text, uploaded_at)
      `)
      .single();

    if (error) {
      logger.error('Error creating vehicle:', error);
      throw new Error(`Failed to create vehicle: ${error.message}`);
    }

    return data;
  } catch (err) {
    logger.error('Unexpected error in createVehicle:', err);
    throw err;
  }
}

export type UpdateVehicleInput = Partial<Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>>;

export async function updateVehicle(
  id: string,
  vehicleData: UpdateVehicleInput
): Promise<Vehicle> {
  try {
    const client = createServerSupabaseClient();

    const { data, error } = await client
      .from('vehicles')
      .update(vehicleData)
      .eq('id', id)
      .select(`
        *,
        images:vehicle_images(id, vehicle_id, image_url, position, alt_text, uploaded_at)
      `)
      .single();

    if (error) {
      logger.error('Error updating vehicle:', error);
      throw new Error(`Failed to update vehicle: ${error.message}`);
    }

    return data;
  } catch (err) {
    logger.error('Unexpected error in updateVehicle:', err);
    throw err;
  }
}

export async function upsertVehicleByCrmId(
  crmid: string,
  vehicleData: CreateVehicleInput
): Promise<{ vehicle: Vehicle; action: 'created' | 'updated' }> {
  try {
    const existingVehicle = await getVehicleByCrmId(crmid);

    if (existingVehicle) {
      const updatedVehicle = await updateVehicle(existingVehicle.id, vehicleData);
      return { vehicle: updatedVehicle, action: 'updated' };
    }

    const newVehicle = await createVehicle(vehicleData);
    return { vehicle: newVehicle, action: 'created' };
  } catch (err) {
    logger.error('Unexpected error in upsertVehicleByCrmId:', err);
    throw err;
  }
}

// ---------- Image Management ----------

export type AddImageInput = Omit<VehicleImage, 'id' | 'uploaded_at'>;

export async function getVehicleImages(
  vehicleId: string
): Promise<VehicleImage[]> {
  try {
    const client = createServerSupabaseClient();

    const { data, error } = await client
      .from('vehicle_images')
      .select('*')
      .eq('vehicle_id', vehicleId)
      .order('position', { ascending: true });

    if (error) {
      logger.error('Error fetching vehicle images:', error);
      throw new Error(`Failed to fetch vehicle images: ${error.message}`);
    }

    return data ?? [];
  } catch (err) {
    logger.error('Unexpected error in getVehicleImages:', err);
    throw err;
  }
}

/**
 * Delete all image records for a vehicle from the database.
 * Storage files are kept for efficiency.
 */
export async function deleteVehicleImages(vehicleId: string): Promise<void> {
  try {
    const client = createServerSupabaseClient();

    const { error } = await client
      .from('vehicle_images')
      .delete()
      .eq('vehicle_id', vehicleId);

    if (error) {
      logger.error('Error deleting vehicle images:', error);
      throw new Error(`Failed to delete images: ${error.message}`);
    }
  } catch (err) {
    logger.error('Unexpected error in deleteVehicleImages:', err);
    throw err;
  }
}

export async function addImagesToVehicle(
  vehicleId: string,
  images: AddImageInput[]
): Promise<VehicleImage[]> {
  try {
    const client = createServerSupabaseClient();

    if (images.length === 0) {
      return [];
    }

    for (const img of images) {
      if (img.position < 1 || img.position > 20) {
        throw new Error(`Image position must be between 1 and 20, got ${img.position}`);
      }
    }

    // vehicleId is referenced via images[].vehicle_id; keep parameter for callsite clarity.
    void vehicleId;

    const { data, error } = await client
      .from('vehicle_images')
      .insert(images)
      .select();

    if (error) {
      logger.error('Error adding images to vehicle:', error);
      throw new Error(`Failed to add images: ${error.message}`);
    }

    return data ?? [];
  } catch (err) {
    logger.error('Unexpected error in addImagesToVehicle:', err);
    throw err;
  }
}

export async function updateVehicleImage(
  imageId: string,
  updates: Partial<Omit<VehicleImage, 'id' | 'vehicle_id' | 'uploaded_at'>>
): Promise<VehicleImage> {
  try {
    const client = createServerSupabaseClient();

    if (updates.position && (updates.position < 1 || updates.position > 20)) {
      throw new Error(
        `Image position must be between 1 and 20, got ${updates.position}`
      );
    }

    const { data, error } = await client
      .from('vehicle_images')
      .update(updates)
      .eq('id', imageId)
      .select()
      .single();

    if (error) {
      logger.error('Error updating image:', error);
      throw new Error(`Failed to update image: ${error.message}`);
    }

    return data;
  } catch (err) {
    logger.error('Unexpected error in updateVehicleImage:', err);
    throw err;
  }
}

/**
 * Mark a vehicle as sold (soft delete) by setting is_published to false.
 * The vehicle will be automatically deleted after 2 days by deleteSoldVehicles().
 */
export async function markVehicleAsSold(crmid: string): Promise<boolean> {
  try {
    const client = createServerSupabaseClient();

    const { data, error } = await client
      .from('vehicles')
      .update({ is_published: false, updated_at: new Date().toISOString() })
      .eq('crmid', crmid)
      .select();

    if (error) {
      logger.error('Error marking vehicle as sold:', error);
      throw new Error(`Failed to mark vehicle as sold: ${error.message}`);
    }

    return Boolean(data && data.length > 0);
  } catch (err) {
    logger.error('Unexpected error in markVehicleAsSold:', err);
    throw err;
  }
}

/**
 * Hard-delete a vehicle by its ID. Cascades to vehicle_images via FK.
 */
export async function deleteVehicleById(vehicleId: string): Promise<void> {
  try {
    const client = createServerSupabaseClient();

    const { error } = await client
      .from('vehicles')
      .delete()
      .eq('id', vehicleId);

    if (error) {
      logger.error('Error deleting vehicle:', error);
      throw new Error(`Failed to delete vehicle: ${error.message}`);
    }
  } catch (err) {
    logger.error('Unexpected error in deleteVehicleById:', err);
    throw err;
  }
}

/**
 * Hard-delete a vehicle by its CRM ID.
 */
export async function deleteVehicleByCrmId(crmid: string): Promise<boolean> {
  try {
    const client = createServerSupabaseClient();

    const { data, error } = await client
      .from('vehicles')
      .delete()
      .eq('crmid', crmid)
      .select();

    if (error) {
      logger.error('Error deleting vehicle:', error);
      throw new Error(`Failed to delete vehicle: ${error.message}`);
    }

    return Boolean(data && data.length > 0);
  } catch (err) {
    logger.error('Unexpected error in deleteVehicleByCrmId:', err);
    throw err;
  }
}

export async function deleteVehicleImage(imageId: string): Promise<void> {
  try {
    const client = createServerSupabaseClient();

    const { error } = await client
      .from('vehicle_images')
      .delete()
      .eq('id', imageId);

    if (error) {
      logger.error('Error deleting image:', error);
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  } catch (err) {
    logger.error('Unexpected error in deleteVehicleImage:', err);
    throw err;
  }
}

export async function reorderVehicleImages(
  vehicleId: string,
  imageOrder: { id: string; position: number }[]
): Promise<VehicleImage[]> {
  try {
    for (const item of imageOrder) {
      if (item.position < 1 || item.position > 10) {
        throw new Error(
          `Image position must be between 1 and 10, got ${item.position}`
        );
      }
    }

    void vehicleId;

    const updates = imageOrder.map((item) =>
      updateVehicleImage(item.id, { position: item.position })
    );

    return await Promise.all(updates);
  } catch (err) {
    logger.error('Unexpected error in reorderVehicleImages:', err);
    throw err;
  }
}

/**
 * Delete vehicles that have been marked as sold (is_published = false)
 * and were updated more than 2 days ago.
 */
export async function deleteSoldVehicles(): Promise<number> {
  try {
    const client = createServerSupabaseClient();

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const twoDaysAgoISO = twoDaysAgo.toISOString();

    const response = await client
      .from('vehicles')
      .delete()
      .eq('is_published', false)
      .lt('updated_at', twoDaysAgoISO);

    if (response.error) {
      logger.error('Error deleting sold vehicles:', response.error);
      throw new Error(`Failed to delete sold vehicles: ${response.error.message}`);
    }

    return response.count ?? 0;
  } catch (err) {
    logger.error('Unexpected error in deleteSoldVehicles:', err);
    throw err;
  }
}

export async function getUniqueBrands(): Promise<string[]> {
  try {
    const vehicles = await getPublishedVehicles();
    const brands = [...new Set(vehicles.map(v => v.brand).filter((b): b is string => Boolean(b)))];
    return brands.sort();
  } catch (err) {
    logger.error('Error fetching unique brands:', err);
    return [];
  }
}

export async function getUniqueModels(brand?: string): Promise<string[]> {
  try {
    const vehicles = await getPublishedVehicles();
    const filteredVehicles = brand
      ? vehicles.filter(v => v.brand === brand)
      : vehicles;
    const models = [...new Set(filteredVehicles.map(v => v.model).filter((m): m is string => Boolean(m)))];
    return models.sort();
  } catch (err) {
    logger.error('Error fetching unique models:', err);
    return [];
  }
}

export async function getUniqueCategories(): Promise<string[]> {
  try {
    const vehicles = await getPublishedVehicles();
    const allCategories = vehicles.flatMap(v => v.categories || []);
    const uniqueCategories = [...new Set(allCategories)];
    return uniqueCategories.sort();
  } catch (err) {
    logger.error('Error fetching unique categories:', err);
    return [];
  }
}
