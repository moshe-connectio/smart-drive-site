-- =====================================================================
-- Smart & Drive - Complete Database Setup
-- Run this ONCE in a fresh Supabase project SQL Editor
-- =====================================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================================
-- 1. VEHICLES TABLE (Used vehicles from CRM)
-- =====================================================================
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_published BOOLEAN DEFAULT false,
  external_id TEXT,
  crmid TEXT UNIQUE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  km INTEGER,
  gear_type TEXT,
  fuel_type TEXT,
  condition TEXT DEFAULT 'משומש',
  trim TEXT,
  hand INTEGER,
  categories TEXT[] DEFAULT '{}',
  main_image_url TEXT,
  short_description TEXT,
  raw_data JSONB
);

CREATE INDEX idx_vehicles_is_published ON vehicles(is_published);
CREATE INDEX idx_vehicles_slug ON vehicles(slug);
CREATE INDEX idx_vehicles_crmid ON vehicles(crmid);
CREATE INDEX idx_vehicles_created_at ON vehicles(created_at DESC);
CREATE INDEX idx_vehicles_brand ON vehicles(brand);
CREATE INDEX idx_vehicles_year ON vehicles(year);
CREATE INDEX idx_vehicles_price ON vehicles(price);

-- =====================================================================
-- 2. VEHICLE IMAGES TABLE (1-20 images per vehicle)
-- =====================================================================
CREATE TABLE vehicle_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  position INTEGER NOT NULL CHECK (position >= 1 AND position <= 20),
  alt_text TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (vehicle_id, position)
);

CREATE INDEX idx_vehicle_images_vehicle_id ON vehicle_images(vehicle_id);
CREATE INDEX idx_vehicle_images_position ON vehicle_images(vehicle_id, position);

-- =====================================================================
-- 3. NEW VEHICLES - MANUFACTURERS
-- =====================================================================
CREATE TABLE new_vehicles_manufacturers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  logo_url TEXT,
  banner_url TEXT,
  description TEXT,
  country VARCHAR(100),
  website_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_manufacturers_slug ON new_vehicles_manufacturers(slug);
CREATE INDEX idx_manufacturers_active ON new_vehicles_manufacturers(is_active);

-- =====================================================================
-- 4. NEW VEHICLES - MODELS
-- =====================================================================
CREATE TABLE new_vehicles_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manufacturer_id UUID NOT NULL REFERENCES new_vehicles_manufacturers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  body_type VARCHAR(100),
  segment VARCHAR(100),
  year_from INTEGER,
  year_to INTEGER,
  base_price DECIMAL(10, 2),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(manufacturer_id, name)
);

CREATE INDEX idx_models_manufacturer_id ON new_vehicles_models(manufacturer_id);
CREATE INDEX idx_models_slug ON new_vehicles_models(slug);
CREATE INDEX idx_models_active ON new_vehicles_models(is_active);

-- =====================================================================
-- 5. NEW VEHICLES - TRIM LEVELS
-- =====================================================================
CREATE TABLE new_vehicles_trim_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES new_vehicles_models(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  transmission VARCHAR(100),
  engine_type VARCHAR(100),
  fuel_type VARCHAR(100),
  power_hp INTEGER,
  torque_nm INTEGER,
  acceleration_0_100 DECIMAL(4, 2),
  top_speed INTEGER,
  fuel_consumption DECIMAL(5, 2),
  co2_emissions DECIMAL(6, 2),
  body_dimensions JSONB,
  weight INTEGER,
  seats INTEGER,
  doors INTEGER,
  trunk_volume INTEGER,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(model_id, name)
);

CREATE INDEX idx_trim_levels_model_id ON new_vehicles_trim_levels(model_id);
CREATE INDEX idx_trim_levels_slug ON new_vehicles_trim_levels(slug);
CREATE INDEX idx_trim_levels_price ON new_vehicles_trim_levels(price);
CREATE INDEX idx_trim_levels_active ON new_vehicles_trim_levels(is_active);

-- =====================================================================
-- 6. NEW VEHICLES - SPECIFICATIONS
-- =====================================================================
CREATE TABLE new_vehicles_specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trim_id UUID NOT NULL REFERENCES new_vehicles_trim_levels(id) ON DELETE CASCADE,
  spec_key VARCHAR(255) NOT NULL,
  spec_value TEXT,
  category VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(trim_id, spec_key)
);

CREATE INDEX idx_specifications_trim_id ON new_vehicles_specifications(trim_id);
CREATE INDEX idx_specifications_category ON new_vehicles_specifications(category);

-- =====================================================================
-- 7. NEW VEHICLES - MODEL IMAGES
-- =====================================================================
CREATE TABLE new_vehicles_model_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES new_vehicles_models(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  position INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(model_id, position)
);

CREATE INDEX idx_model_images_model_id ON new_vehicles_model_images(model_id);

-- =====================================================================
-- 8. DATABASE VIEWS
-- =====================================================================

-- Manufacturers with model/trim counts
CREATE VIEW manufacturers_with_counts AS
SELECT 
  m.id, m.name, m.slug, m.logo_url, m.banner_url, m.description,
  m.country, m.website_url,
  COUNT(DISTINCT mo.id) as models_count,
  COUNT(DISTINCT tl.id) as total_trim_levels,
  m.is_active, m.display_order, m.created_at, m.updated_at
FROM new_vehicles_manufacturers m
LEFT JOIN new_vehicles_models mo ON m.id = mo.manufacturer_id AND mo.is_active = true
LEFT JOIN new_vehicles_trim_levels tl ON mo.id = tl.model_id AND tl.is_active = true
WHERE m.is_active = true
GROUP BY m.id, m.name, m.slug, m.logo_url, m.banner_url, m.description,
         m.country, m.website_url, m.is_active, m.display_order, m.created_at, m.updated_at
ORDER BY m.display_order, m.name;

-- Models with manufacturer info and price ranges
CREATE VIEW models_with_manufacturer AS
SELECT 
  mo.id, mo.name, mo.slug, mo.image_url, mo.description,
  mo.body_type, mo.segment, mo.base_price,
  m.id as manufacturer_id, m.name as manufacturer_name,
  m.slug as manufacturer_slug, m.logo_url as manufacturer_logo,
  COUNT(DISTINCT tl.id) as trim_levels_count,
  MIN(tl.price) as min_price, MAX(tl.price) as max_price,
  mo.is_active, mo.display_order, mo.created_at, mo.updated_at
FROM new_vehicles_models mo
JOIN new_vehicles_manufacturers m ON mo.manufacturer_id = m.id
LEFT JOIN new_vehicles_trim_levels tl ON mo.id = tl.model_id AND tl.is_active = true
WHERE mo.is_active = true AND m.is_active = true
GROUP BY mo.id, mo.name, mo.slug, mo.image_url, mo.description,
         mo.body_type, mo.segment, mo.base_price,
         m.id, m.name, m.slug, m.logo_url,
         mo.is_active, mo.display_order, mo.created_at, mo.updated_at
ORDER BY m.display_order, mo.display_order, mo.name;

-- Trim levels with full manufacturer/model info
CREATE VIEW trim_levels_full_info AS
SELECT 
  tl.id, tl.name, tl.slug, tl.description, tl.price,
  tl.transmission, tl.engine_type, tl.fuel_type,
  tl.power_hp, tl.torque_nm, tl.acceleration_0_100, tl.top_speed,
  tl.fuel_consumption, tl.co2_emissions, tl.body_dimensions,
  tl.weight, tl.seats, tl.doors, tl.trunk_volume,
  mo.id as model_id, mo.name as model_name, mo.slug as model_slug, mo.image_url as model_image,
  m.id as manufacturer_id, m.name as manufacturer_name, m.slug as manufacturer_slug, m.logo_url as manufacturer_logo,
  tl.is_active, tl.display_order, tl.created_at, tl.updated_at
FROM new_vehicles_trim_levels tl
JOIN new_vehicles_models mo ON tl.model_id = mo.id
JOIN new_vehicles_manufacturers m ON mo.manufacturer_id = m.id
WHERE tl.is_active = true AND mo.is_active = true AND m.is_active = true
ORDER BY m.display_order, mo.display_order, tl.display_order;

-- =====================================================================
-- 9. ROW LEVEL SECURITY (RLS)
-- =====================================================================

-- Enable RLS on all tables
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE new_vehicles_manufacturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE new_vehicles_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE new_vehicles_trim_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE new_vehicles_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE new_vehicles_model_images ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public read vehicles" ON vehicles FOR SELECT USING (true);
CREATE POLICY "Public read vehicle_images" ON vehicle_images FOR SELECT USING (true);
CREATE POLICY "Public read manufacturers" ON new_vehicles_manufacturers FOR SELECT USING (true);
CREATE POLICY "Public read models" ON new_vehicles_models FOR SELECT USING (true);
CREATE POLICY "Public read trim_levels" ON new_vehicles_trim_levels FOR SELECT USING (true);
CREATE POLICY "Public read specifications" ON new_vehicles_specifications FOR SELECT USING (true);
CREATE POLICY "Public read model_images" ON new_vehicles_model_images FOR SELECT USING (true);

-- Service role (webhook/API) write access
CREATE POLICY "Service write vehicles" ON vehicles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write vehicle_images" ON vehicle_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write manufacturers" ON new_vehicles_manufacturers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write models" ON new_vehicles_models FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write trim_levels" ON new_vehicles_trim_levels FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write specifications" ON new_vehicles_specifications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write model_images" ON new_vehicles_model_images FOR ALL USING (true) WITH CHECK (true);

-- =====================================================================
-- 10. STORAGE BUCKET for vehicle images
-- =====================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'vehicle-images',
  'vehicle-images',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: public read
CREATE POLICY "Public read vehicle images" ON storage.objects
  FOR SELECT USING (bucket_id = 'vehicle-images');

-- Storage policy: service role upload
CREATE POLICY "Service upload vehicle images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'vehicle-images');

-- Storage policy: service role delete
CREATE POLICY "Service delete vehicle images" ON storage.objects
  FOR DELETE USING (bucket_id = 'vehicle-images');

-- =====================================================================
-- 11. UPDATED_AT TRIGGER
-- =====================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vehicles_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER manufacturers_updated_at
  BEFORE UPDATE ON new_vehicles_manufacturers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER models_updated_at
  BEFORE UPDATE ON new_vehicles_models
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trim_levels_updated_at
  BEFORE UPDATE ON new_vehicles_trim_levels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================================
-- DONE! Database is ready.
-- Next: Insert seed data from SEED_DATA.sql
-- =====================================================================
