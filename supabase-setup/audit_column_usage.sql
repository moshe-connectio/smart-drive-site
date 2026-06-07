-- ============================================================================
-- DB AUDIT: column fill report (which columns are empty / barely used)
-- ----------------------------------------------------------------------------
-- READ-ONLY. Safe to run any number of times. Drops nothing.
--
-- For every column in the audited tables it reports:
--   total_rows    – how many rows the table has
--   non_null      – how many rows have a value in this column
--   fill_pct      – non_null / total_rows (%)
--   verdict       – EMPTY (0%), SPARSE (<5%), or USED
--
-- Run this in the Supabase SQL Editor and sort by fill_pct ASC to see the
-- empty / sparse columns first. Use it to decide what is safe to drop.
-- ============================================================================

DO $$
DECLARE
  r            RECORD;
  v_total      BIGINT;
  v_non_null   BIGINT;
  audited_tables TEXT[] := ARRAY[
    'new_vehicles_manufacturers',
    'new_vehicles_models',
    'new_vehicles_trim_levels',
    'new_vehicles_specifications',
    'new_vehicles_model_images',
    'vehicles'
  ];
BEGIN
  DROP TABLE IF EXISTS _column_audit;
  CREATE TEMP TABLE _column_audit (
    table_name TEXT,
    column_name TEXT,
    data_type TEXT,
    total_rows BIGINT,
    non_null BIGINT,
    fill_pct NUMERIC(5,1)
  );

  FOR r IN
    SELECT c.table_name, c.column_name, c.data_type, c.ordinal_position
    FROM information_schema.columns c
    WHERE c.table_schema = 'public'
      AND c.table_name = ANY (audited_tables)
    ORDER BY c.table_name, c.ordinal_position
  LOOP
    EXECUTE format('SELECT count(*), count(%I) FROM public.%I', r.column_name, r.table_name)
      INTO v_total, v_non_null;

    INSERT INTO _column_audit
    VALUES (
      r.table_name,
      r.column_name,
      r.data_type,
      v_total,
      v_non_null,
      CASE WHEN v_total = 0 THEN 0 ELSE round(100.0 * v_non_null / v_total, 1) END
    );
  END LOOP;
END $$;

SELECT
  table_name,
  column_name,
  data_type,
  total_rows,
  non_null,
  fill_pct,
  CASE
    WHEN non_null = 0          THEN '🗑️ EMPTY'
    WHEN fill_pct < 5          THEN '⚠️ SPARSE'
    ELSE                            '✅ USED'
  END AS verdict
FROM _column_audit
ORDER BY
  CASE WHEN non_null = 0 THEN 0 WHEN fill_pct < 5 THEN 1 ELSE 2 END,
  table_name,
  fill_pct;
