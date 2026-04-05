-- Smart & Drive - Seed Data (20 vehicles + images)
-- Generated from existing database
-- Run AFTER 01_schema.sql

BEGIN;

-- =====================================================
-- VEHICLES (20 records)
-- =====================================================

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '6e55c1c6-9d9e-4393-8763-7e0c4b835335',
  '2026-04-05T13:19:59.236774+00:00',
  '2026-04-05T13:19:59.236774+00:00',
  true,
  '5502295000261234103',
  '5502295000261234103',
  'צ''רי FX חשמלי נובל',
  'צ''רי FX חשמלי נובל',
  'צ''רי',
  'FX חשמלי',
  2025,
  137900,
  8297,
  'אוטומט',
  'חשמל',
  'משומש',
  'נובל',
  5,
  ARRAY['רכבים חשמליים', 'פנאי - 5 מושבים SUV']::text[],
  'https://workdrive.zohoexternal.com/external/b4d2d29d4b0fa1fbcb36a3c41299df485f584e6dd92ef517321790536ec84fae/download',
  'צ''רי FX חשמלי נובל 2025',
  '{"color":"אפור מטל","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '7f1efa4a-fd6b-435d-807a-6e8813f13682',
  '2026-04-05T10:22:58.504585+00:00',
  '2026-04-05T10:22:58.504585+00:00',
  true,
  '5502295000261903155',
  '5502295000261903155',
  'סוזוקי S קרוס GLX',
  'סוזוקי S קרוס GLX',
  'סוזוקי',
  'S קרוס',
  2022,
  99000,
  70304,
  'אוטומט',
  'בנזין',
  'משומש',
  'GLX',
  5,
  ARRAY['רכב משפחתי', 'קטן SUV']::text[],
  'https://workdrive.zohoexternal.com/external/458a3978d369b2102bd03b744085da7da7c97bc5f33374ff1db3a7f6b54c6366/download',
  'סוזוקי S קרוס GLX 2022',
  '{"color":"כסף מטלי","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '3c221c07-015f-403e-8e19-b373f481a16c',
  '2026-04-05T09:10:30.602902+00:00',
  '2026-04-05T09:10:30.602902+00:00',
  true,
  '5502295000245239800',
  '5502295000245239800',
  'סיאט איביזה רפרנס 1.0',
  'סיאט איביזה רפרנס 1.0',
  'סיאט',
  'איביזה',
  2020,
  42900,
  197863,
  'אוטומט',
  'בנזין',
  'משומש',
  'רפרנס 1.0',
  5,
  ARRAY['רכב מיני']::text[],
  'https://workdrive.zohoexternal.com/external/816a5017eb4ecfa2316fbf24fecb632204ca8b40c49ec21b36ed0664101f3647/download',
  'סיאט איביזה רפרנס 1.0 2020',
  '{"color":"שנהב לבן","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '403d745e-1978-4e2b-a993-df64795bad43',
  '2026-04-05T08:32:12.7967+00:00',
  '2026-04-05T08:32:12.7967+00:00',
  true,
  '5502295000257558190',
  '5502295000257558190',
  'פיג''ו 2008 GT',
  'פיג''ו 2008 GT',
  'פיג''ו',
  '2008',
  2023,
  99900,
  24178,
  'אוטומט',
  'בנזין',
  'משומש',
  'GT',
  5,
  ARRAY['קטן SUV']::text[],
  'https://workdrive.zohoexternal.com/external/7b04ab74239e640e60c42e3055efdf4aa8b12c5e193cdf28ea3eb6a1e0567dfb/download',
  'פיג''ו 2008 GT 2023',
  '{"color":"שנהב לבן","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '95cb7ab7-f942-475d-87eb-b5fe3349d900',
  '2026-04-01T08:58:07.171101+00:00',
  '2026-04-01T08:58:07.171101+00:00',
  true,
  '5502295000260353138',
  '5502295000260353138',
  'צ''רי FX חשמלי נובל 2 צבעים',
  'צ''רי FX חשמלי נובל 2 צבעים',
  'צ''רי',
  'FX חשמלי',
  2024,
  122900,
  37000,
  'אוטומט',
  'חשמל',
  'משומש',
  'נובל 2 צבעים',
  5,
  ARRAY['רכבים חשמליים', 'פנאי - 5 מושבים SUV']::text[],
  'https://workdrive.zohoexternal.com/external/ceff72f0746e8865d47cbf68d205d598d21d182aee445ba6dedc650e3f578c32/download',
  'צ''רי FX חשמלי נובל 2 צבעים 2024',
  '{"color":"שנהב לבן","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '61c72969-6eb1-47a0-b72b-5e988e1f0ff6',
  '2026-04-01T06:38:13.289118+00:00',
  '2026-04-01T06:38:13.289118+00:00',
  true,
  '5502295000254587076',
  '5502295000254587076',
  'מקסוס מיפה_7 פרימיום',
  'מקסוס מיפה_7 פרימיום',
  'מקסוס',
  'מיפה_7',
  2025,
  220000,
  150,
  'תמסורת ישירה',
  'חשמלי',
  '0 ק״מ',
  'פרימיום',
  5,
  ARRAY['מיניוואן', 'חשמלי']::text[],
  'https://workdrive.zohoexternal.com/external/f5cef82e3f825838f9c7aea3266bfddf290d06d39a53681f79437c60311b9337/download',
  'מקסוס מיפה_7 פרימיום 2025',
  '{"color":"אפור בטון עם גג שחור","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  'ca567242-dd64-4a25-a453-83d4a68577ff',
  '2026-03-31T13:57:13.796469+00:00',
  '2026-03-31T13:57:13.796469+00:00',
  true,
  '5502295000261308392',
  '5502295000261308392',
  'מקסוס e-דליבר 5 1H1L קצר נמוך',
  'מקסוס e-דליבר 5 1H1L קצר נמוך',
  'מקסוס',
  'e-דליבר 5',
  2025,
  224990,
  150,
  '',
  'חשמלי',
  '0 ק״מ',
  '1H1L קצר נמוך',
  5,
  ARRAY['מסחרית עד 3.5 טון', 'חשמלי']::text[],
  'https://workdrive.zohoexternal.com/external/ab13b852635b46437277316d18cea39231fe487d0fca1c036105c246dbf2f4f1/download',
  'מקסוס e-דליבר 5 1H1L קצר נמוך 2025',
  '{"color":"לבן","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '984a2858-f6f7-4b5b-a665-51920e213e83',
  '2026-03-29T13:01:15.767167+00:00',
  '2026-03-29T13:01:15.767167+00:00',
  true,
  '5502295000260378433',
  '5502295000260378433',
  'טויוטה קורולה הייבריד סאן',
  'טויוטה קורולה הייבריד סאן',
  'טויוטה',
  'קורולה הייבריד',
  2021,
  94990,
  111000,
  'אוטומט',
  'היברידי',
  'משומש',
  'סאן',
  5,
  ARRAY['רכב משפחתי']::text[],
  'https://workdrive.zohoexternal.com/external/0ffa1d718362991d900e683faf393937aba2e168f37bfd3845c3a3bd682d62d1/download',
  'טויוטה קורולה הייבריד סאן 2021',
  '{"color":"תכלת מטאלי","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '01a02722-1ffd-4c86-9702-d80bb0bee37d',
  '2026-03-29T10:24:58.359055+00:00',
  '2026-03-29T10:24:58.359055+00:00',
  true,
  '5502295000260439348',
  '5502295000260439348',
  'פיאט סקודו לארג''',
  'פיאט סקודו לארג''',
  'פיאט',
  'סקודו',
  2025,
  204900,
  19800,
  'אוטומט',
  'דיזל',
  'משומש',
  'לארג''',
  5,
  ARRAY['מסחרית עד 3.5 טון']::text[],
  'https://workdrive.zohoexternal.com/external/aa5f7cec25b67b107e5ad5383176a4fe229ce39b50a97c609b5afe92f340f2f6/download',
  'פיאט סקודו לארג'' 2025',
  '{"color":"שנהב לבן","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '839d8902-b72d-49cd-bec7-e6c4b36cb68d',
  '2026-03-22T10:11:12.921255+00:00',
  '2026-03-22T10:11:12.921255+00:00',
  true,
  '5502295000258645382',
  '5502295000258645382',
  'קיה ספורטג'' דיזל אורבן',
  'קיה ספורטג'' דיזל אורבן',
  'קיה',
  'ספורטג'' דיזל',
  2019,
  74990,
  135000,
  'אוטומט',
  'דיזל',
  'משומש',
  'אורבן',
  5,
  ARRAY['פנאי - 5 מושבים SUV']::text[],
  'https://workdrive.zohoexternal.com/external/d83cf78f164ef7c57a96fa2270ebf120cb4bbf4f37aeb4f41971c3beb834c172/download',
  'קיה ספורטג'' דיזל אורבן 2019',
  '{"color":"אפור כהה","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '9e83df6f-68a4-4fc6-9d19-95e5a294dc16',
  '2026-03-19T14:31:02.480298+00:00',
  '2026-03-19T14:31:02.480298+00:00',
  true,
  '5502295000258204246',
  '5502295000258204246',
  'יונדאי אלנטרה היברידי סופרים',
  'יונדאי אלנטרה היברידי סופרים',
  'יונדאי',
  'אלנטרה היברידי',
  2022,
  129900,
  57861,
  'אוטומט',
  'היברידי',
  'משומש',
  'סופרים',
  5,
  ARRAY['רכב היברידי', 'רכב מנהלים', 'רכב משפחתי']::text[],
  'https://workdrive.zohoexternal.com/external/716933c4daf0c925c9cad414e1e6c1121d2d91d6ce2e2d40c04643bcf5587590/download',
  'יונדאי אלנטרה היברידי סופרים 2022',
  '{"color":"שנהב לבן","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  'd68d9193-7dbf-427a-808d-ce2a13973634',
  '2026-03-19T12:43:11.578641+00:00',
  '2026-03-19T12:43:11.578641+00:00',
  true,
  '5502295000242643040',
  '5502295000242643040',
  'ניסאן קשקאי אסנטה',
  'ניסאן קשקאי אסנטה',
  'ניסאן',
  'קשקאי',
  2016,
  35990,
  91000,
  'אוטומט',
  'בנזין',
  'משומש',
  'אסנטה',
  5,
  ARRAY['פנאי - 5 מושבים SUV']::text[],
  'https://workdrive.zohoexternal.com/external/2641c8b37cd35968805dd7f51e693a2587b9e01657f9963e6eef090bb3693178/download',
  'ניסאן קשקאי אסנטה 2016',
  '{"color":"שנהב לבן","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '33ad27df-0243-4682-b7d5-5b762da87095',
  '2026-03-17T09:28:03.240012+00:00',
  '2026-03-17T09:28:03.240012+00:00',
  true,
  '5502295000254806409',
  '5502295000254806409',
  'טויוטה קורולה היברידי סאן',
  'טויוטה קורולה היברידי סאן',
  'טויוטה',
  'קורולה היברידי',
  2021,
  91900,
  105553,
  'אוטומט',
  'היברידי',
  'משומש',
  'סאן',
  5,
  ARRAY['רכב היברידי', 'רכב משפחתי']::text[],
  'https://workdrive.zohoexternal.com/external/aec61e19a9b5f00d4ad230626487b45cf3e745dadad170e91f750b311aabfd14/download',
  'טויוטה קורולה היברידי סאן 2021',
  '{"color":"כסף מטלי","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '6d16f6d7-49a8-467c-be60-1948b8aa85e0',
  '2026-03-15T13:35:16.125779+00:00',
  '2026-03-15T13:35:16.125779+00:00',
  true,
  '5502295000251586100',
  '5502295000251586100',
  'מקסוס איוניק 5 פלוס 6 מושבים לקצורי',
  'מקסוס איוניק 5 פלוס 6 מושבים לקצורי',
  'מקסוס',
  'איוניק 5 פלוס 6 מושבים',
  2022,
  99900,
  79388,
  'אוטומט',
  'חשמל',
  'משומש',
  'לקצורי',
  5,
  ARRAY['רכב מיניוואן']::text[],
  'https://workdrive.zohoexternal.com/external/4870c3c33770d7a5e34fad6e8abd025e8f01acee04807c51f6b379f63f08f104/download',
  'מקסוס איוניק 5 פלוס 6 מושבים לקצורי 2022',
  '{"color":"שנהב לבן","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '5a7963b4-9b87-4e9c-9c81-c2ccb1b9f469',
  '2026-03-15T12:54:49.204791+00:00',
  '2026-03-15T12:54:49.204791+00:00',
  true,
  '5502295000217002417',
  '5502295000217002417',
  'מקסוס e-טרון 9 לקצורי',
  'מקסוס e-טרון 9 לקצורי',
  'מקסוס',
  'e-טרון 9',
  2025,
  299990,
  150,
  'תמסורת ישירה',
  'חשמלי',
  '0 ק״מ',
  'לקצורי',
  5,
  ARRAY['טנדר', 'מסחרית עד 3.5 טון', 'חשמלי']::text[],
  'https://workdrive.zohoexternal.com/external/df497f91393000d245304d030eae09b687e6232e4df4f485274ec03b3a51f5ab/download',
  'מקסוס e-טרון 9 לקצורי 2025',
  '{"color":"אפור בטון","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  '2026-03-12T15:27:32.559436+00:00',
  '2026-03-12T15:27:32.559436+00:00',
  true,
  '5502295000252321163',
  '5502295000252321163',
  'בי ווי די טאנג פרימיום',
  'בי ווי די טאנג פרימיום',
  'בי ווי די',
  'טאנג',
  2023,
  179990,
  67800,
  'אוטומט',
  'חשמל',
  'משומש',
  'פרימיום',
  5,
  ARRAY['פנאי - 7 מושבים SUV', 'יוקרה', 'רכבים חשמליים']::text[],
  'https://workdrive.zohoexternal.com/external/56685e68f091d3d95d471c5c6f3d6e2e32ab4a5328e9838b85c9564998075067/download',
  'בי ווי די טאנג פרימיום 2023',
  '{"color":"שחור מטלי","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '52e4c57c-7dfb-4a7c-91c8-82b18f53c3d9',
  '2026-03-12T15:18:00.252841+00:00',
  '2026-03-12T15:18:00.252841+00:00',
  true,
  '5502295000255406167',
  '5502295000255406167',
  'צ''רי טיגו 8 פרו נובל',
  'צ''רי טיגו 8 פרו נובל',
  'צ''רי',
  'טיגו 8 פרו',
  2023,
  139900,
  53076,
  'אוטומט',
  'בנזין',
  'משומש',
  'נובל',
  5,
  ARRAY['רכב 7 מקומות']::text[],
  'https://workdrive.zohoexternal.com/external/094f4e63bb0dceffe65f162fbc3ef10e38978b895dcb93d9dd01f6a70148c874/download',
  'צ''רי טיגו 8 פרו נובל 2023',
  '{"color":"שחור מטלי","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '42aaaa8d-371a-4152-9681-fe0ecc07270d',
  '2026-03-12T10:07:47.345153+00:00',
  '2026-03-12T10:07:47.345153+00:00',
  true,
  '5502295000249844770',
  '5502295000249844770',
  'סוזוקי גימיני GLX',
  'סוזוקי גימיני GLX',
  'סוזוקי',
  'גימיני',
  2022,
  134900,
  50909,
  'אוטומט',
  'בנזין',
  'משומש',
  'GLX',
  5,
  ARRAY['קטן SUV', 'רכב פנאי שטח']::text[],
  'https://workdrive.zohoexternal.com/external/cca84843486e4e8c5c928c39c26212142aa5d2c2470a48f42d065b73e001ebcc/download',
  'סוזוקי גימיני GLX 2022',
  '{"color":"קרם","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  'ebf4c825-070f-462d-9092-ec9670a258af',
  '2026-03-11T15:21:04.181631+00:00',
  '2026-03-11T15:21:04.181631+00:00',
  true,
  '5502295000241529476',
  '5502295000241529476',
  'פולקסווגן קראפטר 5 טון רישיון ג',
  'פולקסווגן קראפטר 5 טון רישיון ג',
  'פולקסווגן',
  'קראפטר 5 טון',
  2022,
  154900,
  197741,
  'אוטומט',
  'דיזל',
  'משומש',
  'רישיון ג',
  5,
  ARRAY['מסחרית מעל 3.5 טון']::text[],
  'https://workdrive.zohoexternal.com/external/41a7d5c1be12b8877c3299a1a9c81bd147ca43d76263616354dec2406cd15af4/download',
  'פולקסווגן קראפטר 5 טון רישיון ג 2022',
  '{"color":"לבן","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

INSERT INTO vehicles (id, created_at, updated_at, is_published, external_id, crmid, slug, title, brand, model, year, price, km, gear_type, fuel_type, condition, trim, hand, categories, main_image_url, short_description, raw_data) VALUES (
  '7507c8e1-bdfe-47e9-8bc4-2b486799d453',
  '2026-03-11T14:42:57.059098+00:00',
  '2026-03-11T14:42:57.059098+00:00',
  true,
  '5502295000250573201',
  '5502295000250573201',
  'פולקסווגן קאדי מקסי 7 מקומות סטארליין',
  'פולקסווגן קאדי מקסי 7 מקומות סטארליין',
  'פולקסווגן',
  'קאדי מקסי 7 מקומות',
  2016,
  32900,
  217081,
  'אוטומט',
  'דיזל',
  'משומש',
  'סטארליין',
  5,
  ARRAY['מסחרית עד 3.5 טון']::text[],
  'https://workdrive.zohoexternal.com/external/3eb9c13f3b5f16ede18e9a90f75ceb1d1ba6d9a09870c243c97296fd4cc264ec/download',
  'פולקסווגן קאדי מקסי 7 מקומות סטארליין 2016',
  '{"color":"שנהב לבן","features":[],"interior":"Fabric","condition":"Excellent","transmission":"CVT","service_history":"Complete"}'::jsonb
);

-- =====================================================
-- VEHICLE IMAGES (146 records)
-- =====================================================

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '1b71eb7d-c415-430e-96c6-b27a4e0d33f6',
  '01a02722-1ffd-4c86-9702-d80bb0bee37d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b0bee37d/1-1774779900371.jpg',
  1,
  'פיאט סקודו לארג'' - Main Image',
  '2026-03-29T10:25:02.047028+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '69686666-6fa2-4630-9448-f16cd3453898',
  '01a02722-1ffd-4c86-9702-d80bb0bee37d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b0bee37d/2-1774779900436.jpg',
  2,
  'פיאט סקודו לארג'' 1',
  '2026-03-29T10:25:02.047028+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '153fde75-d97c-4e7b-9c3c-19fd8b2b3a4c',
  '01a02722-1ffd-4c86-9702-d80bb0bee37d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b0bee37d/3-1774779900180.jpg',
  3,
  'פיאט סקודו לארג'' 2',
  '2026-03-29T10:25:02.047028+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '8824b9bb-b477-4156-8121-c1511bff1cda',
  '01a02722-1ffd-4c86-9702-d80bb0bee37d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b0bee37d/4-1774779900433.jpg',
  4,
  'פיאט סקודו לארג'' 3',
  '2026-03-29T10:25:02.047028+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'bd8e965d-0db8-4c2e-8859-953e6dfa3494',
  '01a02722-1ffd-4c86-9702-d80bb0bee37d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b0bee37d/5-1774779900405.jpg',
  5,
  'פיאט סקודו לארג'' 4',
  '2026-03-29T10:25:02.047028+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '1eee48a8-c100-447a-93de-8aa972ae6d3b',
  '01a02722-1ffd-4c86-9702-d80bb0bee37d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b0bee37d/6-1774779900238.jpg',
  6,
  'פיאט סקודו לארג'' 5',
  '2026-03-29T10:25:02.047028+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '6808bbb7-b487-443c-87de-e2ebdafa1b77',
  '01a02722-1ffd-4c86-9702-d80bb0bee37d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b0bee37d/7-1774779900154.jpg',
  7,
  'פיאט סקודו לארג'' 6',
  '2026-03-29T10:25:02.047028+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '4c81ce45-1057-41fd-81b8-ff7be52239b2',
  '01a02722-1ffd-4c86-9702-d80bb0bee37d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b0bee37d/8-1774779900225.jpg',
  8,
  'פיאט סקודו לארג'' 7',
  '2026-03-29T10:25:02.047028+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '24da5da5-4235-4c5b-81b4-488ff75bea72',
  '01a02722-1ffd-4c86-9702-d80bb0bee37d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b0bee37d/9-1774779900443.jpeg',
  9,
  'פיאט סקודו לארג'' 8',
  '2026-03-29T10:25:02.047028+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '80e649f2-c89e-49b3-9383-a2a32ce9b2b8',
  '33ad27df-0243-4682-b7d5-5b762da87095',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/2da87095/1-1773739684696.jpg',
  1,
  'טויוטה קורולה היברידי סאן - Main Image',
  '2026-03-17T09:28:06.578364+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'ddbe449a-8e64-4cfb-9ed1-3e1bb9ea9663',
  '33ad27df-0243-4682-b7d5-5b762da87095',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/2da87095/2-1773739684968.jpg',
  2,
  'טויוטה קורולה היברידי סאן 1',
  '2026-03-17T09:28:06.578364+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '96e43cf9-42a2-4df9-890d-c7335ba5a022',
  '33ad27df-0243-4682-b7d5-5b762da87095',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/2da87095/3-1773739684701.jpg',
  3,
  'טויוטה קורולה היברידי סאן 2',
  '2026-03-17T09:28:06.578364+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '7773b775-e087-4e43-8ae9-bba5a704e983',
  '33ad27df-0243-4682-b7d5-5b762da87095',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/2da87095/4-1773739684839.jpg',
  4,
  'טויוטה קורולה היברידי סאן 3',
  '2026-03-17T09:28:06.578364+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'ddecda51-8cac-4267-8c7f-a8567eb3c1a1',
  '33ad27df-0243-4682-b7d5-5b762da87095',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/2da87095/5-1773739684655.jpg',
  5,
  'טויוטה קורולה היברידי סאן 4',
  '2026-03-17T09:28:06.578364+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'a7b9363d-7f52-4af4-98e6-f39fa79a22b9',
  '33ad27df-0243-4682-b7d5-5b762da87095',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/2da87095/6-1773739684786.jpg',
  6,
  'טויוטה קורולה היברידי סאן 5',
  '2026-03-17T09:28:06.578364+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '33de1228-d468-4fb4-a658-e482876eb59a',
  '33ad27df-0243-4682-b7d5-5b762da87095',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/2da87095/7-1773739684699.jpg',
  7,
  'טויוטה קורולה היברידי סאן 6',
  '2026-03-17T09:28:06.578364+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '2f66d58d-ac8e-4dcd-b4d1-ca749c729b20',
  '33ad27df-0243-4682-b7d5-5b762da87095',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/2da87095/8-1773739684810.jpg',
  8,
  'טויוטה קורולה היברידי סאן 7',
  '2026-03-17T09:28:06.578364+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '2551fccf-8de2-4041-875d-c73aefccdb1f',
  '33ad27df-0243-4682-b7d5-5b762da87095',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/2da87095/9-1773739684826.jpg',
  9,
  'טויוטה קורולה היברידי סאן 8',
  '2026-03-17T09:28:06.578364+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'eca9bfa4-97d0-42d6-b886-eaecb07675b0',
  '3c221c07-015f-403e-8e19-b373f481a16c',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/f481a16c/1-1775380232570.jpg',
  1,
  'סיאט איביזה רפרנס 1.0 - Main Image',
  '2026-04-05T09:10:34.498302+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '4aeb5aaa-7cbc-425b-9368-952caeb85327',
  '3c221c07-015f-403e-8e19-b373f481a16c',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/f481a16c/2-1775380232624.jpg',
  2,
  'סיאט איביזה רפרנס 1.0 1',
  '2026-04-05T09:10:34.498302+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'e248c818-45bd-48dd-a2c3-6170b3e72721',
  '3c221c07-015f-403e-8e19-b373f481a16c',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/f481a16c/3-1775380232633.jpg',
  3,
  'סיאט איביזה רפרנס 1.0 2',
  '2026-04-05T09:10:34.498302+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '10be520a-0f95-4700-9ac5-96cd73515df4',
  '3c221c07-015f-403e-8e19-b373f481a16c',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/f481a16c/4-1775380232470.jpg',
  4,
  'סיאט איביזה רפרנס 1.0 3',
  '2026-04-05T09:10:34.498302+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '6800bcec-8d9d-49c0-bd35-f9939a7d2f97',
  '3c221c07-015f-403e-8e19-b373f481a16c',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/f481a16c/5-1775380232684.jpg',
  5,
  'סיאט איביזה רפרנס 1.0 4',
  '2026-04-05T09:10:34.498302+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '35af7ed1-c0e9-4c27-aaff-e7ae0a714974',
  '3c221c07-015f-403e-8e19-b373f481a16c',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/f481a16c/6-1775380232585.jpg',
  6,
  'סיאט איביזה רפרנס 1.0 5',
  '2026-04-05T09:10:34.498302+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'b5870ed6-6dc2-4d10-9393-25f0860beb38',
  '3c221c07-015f-403e-8e19-b373f481a16c',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/f481a16c/7-1775380232582.jpg',
  7,
  'סיאט איביזה רפרנס 1.0 6',
  '2026-04-05T09:10:34.498302+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '615b7422-fc82-4caf-86c4-2dafee250eb1',
  '403d745e-1978-4e2b-a993-df64795bad43',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/795bad43/1-1775377934633.jpg',
  1,
  'פיג''ו 2008 GT - Main Image',
  '2026-04-05T08:32:16.565574+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '5aff1b85-d7ee-4a1c-aaa3-379bcd8902b3',
  '403d745e-1978-4e2b-a993-df64795bad43',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/795bad43/2-1775377934851.jpg',
  2,
  'פיג''ו 2008 GT 1',
  '2026-04-05T08:32:16.565574+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '58d8d150-9370-4cc7-817f-e35c3cf47a0c',
  '403d745e-1978-4e2b-a993-df64795bad43',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/795bad43/3-1775377934733.jpg',
  3,
  'פיג''ו 2008 GT 2',
  '2026-04-05T08:32:16.565574+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'c30b6b6f-e216-4c0f-8932-48b10e549e4c',
  '403d745e-1978-4e2b-a993-df64795bad43',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/795bad43/4-1775377934822.jpg',
  4,
  'פיג''ו 2008 GT 3',
  '2026-04-05T08:32:16.565574+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'e1d79d73-cca5-4e7a-b55e-9aef597ebbb7',
  '42aaaa8d-371a-4152-9681-fe0ecc07270d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/cc07270d/1-1773310068935.jpg',
  1,
  'סוזוקי גימיני GLX - Main Image',
  '2026-03-12T10:07:50.364303+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '8686ac21-7265-4041-a694-8b67611727d9',
  '52e4c57c-7dfb-4a7c-91c8-82b18f53c3d9',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/8f53c3d9/1-1773328681800.jpg',
  1,
  'צ''רי טיגו 8 פרו נובל - Main Image',
  '2026-03-12T15:18:04.108002+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'a6032f93-30ae-4d28-8164-35d43fa49349',
  '52e4c57c-7dfb-4a7c-91c8-82b18f53c3d9',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/8f53c3d9/2-1773328681849.jpg',
  2,
  'צ''רי טיגו 8 פרו נובל 1',
  '2026-03-12T15:18:04.108002+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'b9f0be6c-5586-4eab-be43-1633245deff7',
  '52e4c57c-7dfb-4a7c-91c8-82b18f53c3d9',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/8f53c3d9/3-1773328681797.jpg',
  3,
  'צ''רי טיגו 8 פרו נובל 2',
  '2026-03-12T15:18:04.108002+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '6609da81-5eb1-4a3f-a41c-1f2066236fa0',
  '52e4c57c-7dfb-4a7c-91c8-82b18f53c3d9',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/8f53c3d9/4-1773328682116.jpg',
  4,
  'צ''רי טיגו 8 פרו נובל 3',
  '2026-03-12T15:18:04.108002+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '7f176900-39eb-4f1f-a020-d125df5fd038',
  '52e4c57c-7dfb-4a7c-91c8-82b18f53c3d9',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/8f53c3d9/5-1773328681835.jpg',
  5,
  'צ''רי טיגו 8 פרו נובל 4',
  '2026-03-12T15:18:04.108002+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'ba67396b-eb55-404c-a5f8-02d6725c2890',
  '52e4c57c-7dfb-4a7c-91c8-82b18f53c3d9',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/8f53c3d9/6-1773328681941.jpg',
  6,
  'צ''רי טיגו 8 פרו נובל 5',
  '2026-03-12T15:18:04.108002+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '602c6a04-398b-4208-a4e3-64cd7a9dce0c',
  '52e4c57c-7dfb-4a7c-91c8-82b18f53c3d9',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/8f53c3d9/7-1773328681659.jpg',
  7,
  'צ''רי טיגו 8 פרו נובל 6',
  '2026-03-12T15:18:04.108002+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '2c74b21b-d14c-4e9c-9104-a7633c86fab5',
  '52e4c57c-7dfb-4a7c-91c8-82b18f53c3d9',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/8f53c3d9/8-1773328681905.jpg',
  8,
  'צ''רי טיגו 8 פרו נובל 7',
  '2026-03-12T15:18:04.108002+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'e9729705-78df-4729-9ab5-0fc6ad44531f',
  '5a7963b4-9b87-4e9c-9c81-c2ccb1b9f469',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b1b9f469/1-1773579290787.jpg',
  1,
  'מקסוס e-טרון 9 לקצורי - Main Image',
  '2026-03-15T12:54:52.433219+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'eedb02a9-25ed-4d42-9175-0a0d909d028a',
  '5a7963b4-9b87-4e9c-9c81-c2ccb1b9f469',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b1b9f469/2-1773579290693.jpg',
  2,
  'מקסוס e-טרון 9 לקצורי 1',
  '2026-03-15T12:54:52.433219+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'be304c9d-6e71-4caf-b0bb-2dd256b67b30',
  '5a7963b4-9b87-4e9c-9c81-c2ccb1b9f469',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b1b9f469/3-1773579290810.jpg',
  3,
  'מקסוס e-טרון 9 לקצורי 2',
  '2026-03-15T12:54:52.433219+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'a51e76e5-b8c7-426a-80f9-a304cb2fc9b0',
  '5a7963b4-9b87-4e9c-9c81-c2ccb1b9f469',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b1b9f469/4-1773579290743.jpg',
  4,
  'מקסוס e-טרון 9 לקצורי 3',
  '2026-03-15T12:54:52.433219+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '61be50c7-a2ec-4d02-a13d-5c006a834a78',
  '5a7963b4-9b87-4e9c-9c81-c2ccb1b9f469',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b1b9f469/5-1773579290689.jpg',
  5,
  'מקסוס e-טרון 9 לקצורי 4',
  '2026-03-15T12:54:52.433219+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '25dc3dd0-b520-4895-a20a-421fd3f369a3',
  '5a7963b4-9b87-4e9c-9c81-c2ccb1b9f469',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b1b9f469/6-1773579290748.jpg',
  6,
  'מקסוס e-טרון 9 לקצורי 5',
  '2026-03-15T12:54:52.433219+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '2f441146-9448-41bf-834e-7d252962383c',
  '5a7963b4-9b87-4e9c-9c81-c2ccb1b9f469',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b1b9f469/7-1773579290725.jpg',
  7,
  'מקסוס e-טרון 9 לקצורי 6',
  '2026-03-15T12:54:52.433219+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '8cfce971-39d8-40ba-92b1-3de298c20a1b',
  '5a7963b4-9b87-4e9c-9c81-c2ccb1b9f469',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b1b9f469/8-1773579290756.jpg',
  8,
  'מקסוס e-טרון 9 לקצורי 7',
  '2026-03-15T12:54:52.433219+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'b29dc35c-97f5-466a-9a80-a7162e20d7a1',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/1-1773847017565.jpg',
  1,
  'בי ווי די טאנג פרימיום - Main Image',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '6aaa932d-117f-4620-906a-e78a8887c32f',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/2-1773847017824.jpg',
  2,
  'בי ווי די טאנג פרימיום 1',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '20c5e366-6c50-465b-875d-5331a8dcd5e7',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/3-1773847017529.jpg',
  3,
  'בי ווי די טאנג פרימיום 2',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'e6fbc771-a2ff-496f-9741-032160871f41',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/4-1773847017465.jpg',
  4,
  'בי ווי די טאנג פרימיום 3',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '42fddc56-52f6-4535-b230-c7f110bdda8d',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/5-1773847017610.jpg',
  5,
  'בי ווי די טאנג פרימיום 4',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'a19ff24b-7d5f-4925-b0b5-e099b12581ae',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/6-1773847017793.jpg',
  6,
  'בי ווי די טאנג פרימיום 5',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '15370f02-e607-47eb-8463-5113e4001f0a',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/7-1773847017661.jpg',
  7,
  'בי ווי די טאנג פרימיום 6',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '1c7fd63c-8812-461d-b26e-d35e0900dd8e',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/8-1773847017774.jpg',
  8,
  'בי ווי די טאנג פרימיום 7',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'e1cedc84-d4e2-405c-b4e2-43120a5e2b19',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/9-1773847017700.jpg',
  9,
  'בי ווי די טאנג פרימיום 8',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '2e8b5062-bb43-41f7-a75c-c9debbffd1a9',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/10-1773847017814.jpg',
  10,
  'בי ווי די טאנג פרימיום 9',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '4d4ded6e-d964-4731-8cd1-7ad88cdf7108',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/11-1773847017811.jpg',
  11,
  'בי ווי די טאנג פרימיום 10',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'c2a5304a-6ee9-40de-9615-840240fd75e0',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/12-1773847017804.jpg',
  12,
  'בי ווי די טאנג פרימיום 11',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '5fb9f568-1a0c-4790-8545-39717742d4e6',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/13-1773847017845.jpg',
  13,
  'בי ווי די טאנג פרימיום 12',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '794d9e33-6d2e-4d76-8404-23dac943533f',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/14-1773847017912.jpg',
  14,
  'בי ווי די טאנג פרימיום 13',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '5bd3ef30-5810-4aed-b1a2-a9dec6432ccc',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/15-1773847017577.jpg',
  15,
  'בי ווי די טאנג פרימיום 14',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '7b4f5de6-a796-4bee-8f97-2f40952491c9',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/16-1773847017864.jpg',
  16,
  'בי ווי די טאנג פרימיום 15',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '58e9f2a6-39f9-4613-9027-5dd7d35cc7c6',
  '602cbff3-c93c-44d3-89d5-4cbcd1920b30',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/d1920b30/17-1773847017908.jpg',
  17,
  'בי ווי די טאנג פרימיום 16',
  '2026-03-18T15:17:00.733367+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '0322c670-7ae2-4cda-adf1-9a3396a74c78',
  '61c72969-6eb1-47a0-b72b-5e988e1f0ff6',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/8e1f0ff6/1-1775025494863.jpg',
  1,
  'מקסוס מיפה_7 פרימיום - Main Image',
  '2026-04-01T06:38:16.178557+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '05fbfe3f-88a0-414d-adf7-86a365d64df4',
  '61c72969-6eb1-47a0-b72b-5e988e1f0ff6',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/8e1f0ff6/2-1775025494888.jpg',
  2,
  'מקסוס מיפה_7 פרימיום 1',
  '2026-04-01T06:38:16.178557+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'c2e37fbe-7030-42e8-8561-085998fc7fbe',
  '61c72969-6eb1-47a0-b72b-5e988e1f0ff6',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/8e1f0ff6/3-1775025494837.jpg',
  3,
  'מקסוס מיפה_7 פרימיום 2',
  '2026-04-01T06:38:16.178557+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '7c32e72c-113d-4c70-8dff-cc6c8e8b4b8d',
  '61c72969-6eb1-47a0-b72b-5e988e1f0ff6',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/8e1f0ff6/4-1775025494908.jpg',
  4,
  'מקסוס מיפה_7 פרימיום 3',
  '2026-04-01T06:38:16.178557+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '34c77af0-920a-484e-91f3-ad184379d52c',
  '61c72969-6eb1-47a0-b72b-5e988e1f0ff6',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/8e1f0ff6/5-1775025494905.jpg',
  5,
  'מקסוס מיפה_7 פרימיום 4',
  '2026-04-01T06:38:16.178557+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '47b63c63-f18f-405c-8238-5ac0aba24a46',
  '6d16f6d7-49a8-467c-be60-1948b8aa85e0',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b8aa85e0/1-1773581717640.jpg',
  1,
  'מקסוס איוניק 5 פלוס 6 מושבים לקצורי - Main Image',
  '2026-03-15T13:35:19.399073+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'b6404d7b-d451-4804-a852-3b1a3c62d102',
  '6d16f6d7-49a8-467c-be60-1948b8aa85e0',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b8aa85e0/2-1773581717689.jpg',
  2,
  'מקסוס איוניק 5 פלוס 6 מושבים לקצורי 1',
  '2026-03-15T13:35:19.399073+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '14e85c72-dbb3-4e0f-9f34-c3892eceb401',
  '6e55c1c6-9d9e-4393-8763-7e0c4b835335',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/4b835335/1-1775395201154.jpg',
  1,
  'צ''רי FX חשמלי נובל - Main Image',
  '2026-04-05T13:20:02.693465+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '0fd9e872-acbb-4e1b-a01b-098fc48944e5',
  '6e55c1c6-9d9e-4393-8763-7e0c4b835335',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/4b835335/2-1775395201163.jpg',
  2,
  'צ''רי FX חשמלי נובל 1',
  '2026-04-05T13:20:02.693465+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'd8c8e5aa-0e22-4cbf-91cd-c099e879506c',
  '6e55c1c6-9d9e-4393-8763-7e0c4b835335',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/4b835335/3-1775395201273.jpg',
  3,
  'צ''רי FX חשמלי נובל 2',
  '2026-04-05T13:20:02.693465+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '40dae0f8-0af7-4961-b38e-8a3243f657c7',
  '6e55c1c6-9d9e-4393-8763-7e0c4b835335',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/4b835335/4-1775395201312.jpg',
  4,
  'צ''רי FX חשמלי נובל 3',
  '2026-04-05T13:20:02.693465+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '84eb50bd-83c0-45c5-9af5-924aa7d969f5',
  '6e55c1c6-9d9e-4393-8763-7e0c4b835335',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/4b835335/5-1775395201170.jpg',
  5,
  'צ''רי FX חשמלי נובל 4',
  '2026-04-05T13:20:02.693465+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'e93eda48-7223-42ea-8d1f-d764152286b0',
  '6e55c1c6-9d9e-4393-8763-7e0c4b835335',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/4b835335/6-1775395201050.jpg',
  6,
  'צ''רי FX חשמלי נובל 5',
  '2026-04-05T13:20:02.693465+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '9b18fb22-ebdf-4b10-8d2f-5d0ee326df73',
  '6e55c1c6-9d9e-4393-8763-7e0c4b835335',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/4b835335/7-1775395201168.jpg',
  7,
  'צ''רי FX חשמלי נובל 6',
  '2026-04-05T13:20:02.693465+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '2d2e9362-9c12-4289-9332-9ed9bca53623',
  '6e55c1c6-9d9e-4393-8763-7e0c4b835335',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/4b835335/8-1775395201083.jpg',
  8,
  'צ''רי FX חשמלי נובל 7',
  '2026-04-05T13:20:02.693465+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '5276df6d-26cf-41ce-b33e-c47405b889c7',
  '6e55c1c6-9d9e-4393-8763-7e0c4b835335',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/4b835335/9-1775395201243.jpg',
  9,
  'צ''רי FX חשמלי נובל 8',
  '2026-04-05T13:20:02.693465+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '695fd84e-49bc-4e5b-93c2-97f0af14d876',
  '7507c8e1-bdfe-47e9-8bc4-2b486799d453',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/6799d453/1-1773240178684.jpg',
  1,
  'פולקסווגן קאדי מקסי 7 מקומות סטארליין - Main Image',
  '2026-03-11T14:43:00.066409+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '7bfcad59-903e-49fb-be8d-3be4054591c9',
  '7f1efa4a-fd6b-435d-807a-6e8813f13682',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/13f13682/1-1775384580714.jpg',
  1,
  'סוזוקי S קרוס GLX - Main Image',
  '2026-04-05T10:23:02.116713+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '5e1aa8bc-dc7c-440c-8bb4-5e5a058295f6',
  '7f1efa4a-fd6b-435d-807a-6e8813f13682',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/13f13682/2-1775384580473.jpg',
  2,
  'סוזוקי S קרוס GLX 1',
  '2026-04-05T10:23:02.116713+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'd5621b69-300a-4504-b1fa-0dca371b1b6c',
  '7f1efa4a-fd6b-435d-807a-6e8813f13682',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/13f13682/3-1775384580522.jpg',
  3,
  'סוזוקי S קרוס GLX 2',
  '2026-04-05T10:23:02.116713+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '6ea091a7-dcf4-4849-ae04-dde32581eeeb',
  '7f1efa4a-fd6b-435d-807a-6e8813f13682',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/13f13682/4-1775384580366.jpg',
  4,
  'סוזוקי S קרוס GLX 3',
  '2026-04-05T10:23:02.116713+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'acd6e05f-ab09-49d0-81cf-0f75840198d0',
  '7f1efa4a-fd6b-435d-807a-6e8813f13682',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/13f13682/5-1775384580580.jpg',
  5,
  'סוזוקי S קרוס GLX 4',
  '2026-04-05T10:23:02.116713+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '9de96498-4137-44ff-9290-64ded32d3bef',
  '7f1efa4a-fd6b-435d-807a-6e8813f13682',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/13f13682/6-1775384580478.jpg',
  6,
  'סוזוקי S קרוס GLX 5',
  '2026-04-05T10:23:02.116713+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '1fea1faf-f85b-4895-a682-8926e2213517',
  '7f1efa4a-fd6b-435d-807a-6e8813f13682',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/13f13682/7-1775384580484.jpg',
  7,
  'סוזוקי S קרוס GLX 6',
  '2026-04-05T10:23:02.116713+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '09c5de52-ffaa-43fd-abdb-5ed8424fb8d6',
  '7f1efa4a-fd6b-435d-807a-6e8813f13682',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/13f13682/8-1775384580336.jpg',
  8,
  'סוזוקי S קרוס GLX 7',
  '2026-04-05T10:23:02.116713+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '02ade01c-dfee-4805-8319-92e4ad559330',
  '839d8902-b72d-49cd-bec7-e6c4b36cb68d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b36cb68d/1-1774174274509.jpg',
  1,
  'קיה ספורטג'' דיזל אורבן - Main Image',
  '2026-03-22T10:11:16.053728+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'cbeb1132-49cf-44ef-8737-a45751e451ee',
  '839d8902-b72d-49cd-bec7-e6c4b36cb68d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b36cb68d/2-1774174274475.jpg',
  2,
  'קיה ספורטג'' דיזל אורבן 1',
  '2026-03-22T10:11:16.053728+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '8747e7d3-7aa6-4f66-8dd8-7a1e7a9c8d84',
  '839d8902-b72d-49cd-bec7-e6c4b36cb68d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b36cb68d/3-1774174274387.jpg',
  3,
  'קיה ספורטג'' דיזל אורבן 2',
  '2026-03-22T10:11:16.053728+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '032cf09c-894d-4b43-a2c5-78bf14014171',
  '839d8902-b72d-49cd-bec7-e6c4b36cb68d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b36cb68d/4-1774174274327.jpg',
  4,
  'קיה ספורטג'' דיזל אורבן 3',
  '2026-03-22T10:11:16.053728+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '01930d9b-4a44-452d-bd57-57f19b401b8d',
  '839d8902-b72d-49cd-bec7-e6c4b36cb68d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b36cb68d/5-1774174274505.jpg',
  5,
  'קיה ספורטג'' דיזל אורבן 4',
  '2026-03-22T10:11:16.053728+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '3a1b56f5-f0a4-4f89-abe6-1376af56d42d',
  '839d8902-b72d-49cd-bec7-e6c4b36cb68d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b36cb68d/6-1774174274406.jpg',
  6,
  'קיה ספורטג'' דיזל אורבן 5',
  '2026-03-22T10:11:16.053728+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '74667758-e917-437e-b8fa-d47f322b3110',
  '839d8902-b72d-49cd-bec7-e6c4b36cb68d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b36cb68d/7-1774174274370.jpg',
  7,
  'קיה ספורטג'' דיזל אורבן 6',
  '2026-03-22T10:11:16.053728+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'e29731f1-91da-4a88-9d8a-fe3a62dd04ed',
  '839d8902-b72d-49cd-bec7-e6c4b36cb68d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b36cb68d/8-1774174274421.jpg',
  8,
  'קיה ספורטג'' דיזל אורבן 7',
  '2026-03-22T10:11:16.053728+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '11298294-24b9-4fbf-8599-301af112211c',
  '839d8902-b72d-49cd-bec7-e6c4b36cb68d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b36cb68d/9-1774174274488.jpg',
  9,
  'קיה ספורטג'' דיזל אורבן 8',
  '2026-03-22T10:11:16.053728+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '05de104c-2a4a-4940-82e1-75d4ca163624',
  '839d8902-b72d-49cd-bec7-e6c4b36cb68d',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/b36cb68d/10-1774174274530.jpg',
  10,
  'קיה ספורטג'' דיזל אורבן 9',
  '2026-03-22T10:11:16.053728+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '9e51fcd2-0177-425b-8150-8f0b6dbff589',
  '95cb7ab7-f942-475d-87eb-b5fe3349d900',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/3349d900/1-1775033888512.jpg',
  1,
  'צ''רי FX חשמלי נובל 2 צבעים - Main Image',
  '2026-04-01T08:58:10.00789+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '058917a7-22fe-4f8b-a2bd-18a67cb47b37',
  '95cb7ab7-f942-475d-87eb-b5fe3349d900',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/3349d900/2-1775033888639.jpg',
  2,
  'צ''רי FX חשמלי נובל 2 צבעים 1',
  '2026-04-01T08:58:10.00789+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '823f4ac6-2188-4e91-9d0a-53966c155ccd',
  '95cb7ab7-f942-475d-87eb-b5fe3349d900',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/3349d900/3-1775033888701.jpg',
  3,
  'צ''רי FX חשמלי נובל 2 צבעים 2',
  '2026-04-01T08:58:10.00789+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '73a27ac2-4427-4425-9a2e-c634af598776',
  '95cb7ab7-f942-475d-87eb-b5fe3349d900',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/3349d900/4-1775033888780.jpg',
  4,
  'צ''רי FX חשמלי נובל 2 צבעים 3',
  '2026-04-01T08:58:10.00789+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'ca859712-d83d-43a3-b4de-2d1f23c771c3',
  '95cb7ab7-f942-475d-87eb-b5fe3349d900',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/3349d900/5-1775033888429.jpg',
  5,
  'צ''רי FX חשמלי נובל 2 צבעים 4',
  '2026-04-01T08:58:10.00789+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '22aff153-02d9-43b3-bdf8-1ed3ee20dfc4',
  '95cb7ab7-f942-475d-87eb-b5fe3349d900',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/3349d900/6-1775033888541.jpg',
  6,
  'צ''רי FX חשמלי נובל 2 צבעים 5',
  '2026-04-01T08:58:10.00789+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'aa88c495-a43e-4427-8359-6cc760da9a3f',
  '95cb7ab7-f942-475d-87eb-b5fe3349d900',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/3349d900/7-1775033888462.jpg',
  7,
  'צ''רי FX חשמלי נובל 2 צבעים 6',
  '2026-04-01T08:58:10.00789+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '46dfab21-a2e1-4764-b1d4-fed6d11fda65',
  '984a2858-f6f7-4b5b-a665-51920e213e83',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/0e213e83/1-1774938356705.jpg',
  1,
  'טויוטה קורולה הייבריד סאן - Main Image',
  '2026-03-31T06:25:59.379481+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '37b30d12-7c29-4b03-9bc4-c4d6b8a850f0',
  '984a2858-f6f7-4b5b-a665-51920e213e83',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/0e213e83/2-1774938356708.jpg',
  2,
  'טויוטה קורולה הייבריד סאן 1',
  '2026-03-31T06:25:59.379481+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '8b200f18-fab2-41c0-80a1-7a51ef61c322',
  '984a2858-f6f7-4b5b-a665-51920e213e83',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/0e213e83/3-1774938356715.jpg',
  3,
  'טויוטה קורולה הייבריד סאן 2',
  '2026-03-31T06:25:59.379481+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '3374bd70-ab3a-4d57-b2b9-a71cf5940231',
  '984a2858-f6f7-4b5b-a665-51920e213e83',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/0e213e83/4-1774938356712.jpg',
  4,
  'טויוטה קורולה הייבריד סאן 3',
  '2026-03-31T06:25:59.379481+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '16d31fac-2a9f-4449-a435-002ee4b6da55',
  '984a2858-f6f7-4b5b-a665-51920e213e83',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/0e213e83/5-1774938356807.jpg',
  5,
  'טויוטה קורולה הייבריד סאן 4',
  '2026-03-31T06:25:59.379481+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '3caf8e40-b472-4c48-9146-c288c89e2d52',
  '984a2858-f6f7-4b5b-a665-51920e213e83',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/0e213e83/6-1774938356599.jpg',
  6,
  'טויוטה קורולה הייבריד סאן 5',
  '2026-03-31T06:25:59.379481+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '7d54bfaa-e47d-45df-9d48-1b004f60b6ab',
  '984a2858-f6f7-4b5b-a665-51920e213e83',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/0e213e83/7-1774938356744.jpg',
  7,
  'טויוטה קורולה הייבריד סאן 6',
  '2026-03-31T06:25:59.379481+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '2b11b79f-e61d-42b6-91d5-c0acf551aa89',
  '984a2858-f6f7-4b5b-a665-51920e213e83',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/0e213e83/8-1774938356803.jpg',
  8,
  'טויוטה קורולה הייבריד סאן 7',
  '2026-03-31T06:25:59.379481+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '1ec50975-5895-4b69-a168-94125d204016',
  '984a2858-f6f7-4b5b-a665-51920e213e83',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/0e213e83/9-1774938356630.jpg',
  9,
  'טויוטה קורולה הייבריד סאן 8',
  '2026-03-31T06:25:59.379481+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'a7cd7936-62ea-42f1-8308-77e181966a3b',
  '9e83df6f-68a4-4fc6-9d19-95e5a294dc16',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a294dc16/1-1773930664124.jpg',
  1,
  'יונדאי אלנטרה היברידי סופרים - Main Image',
  '2026-03-19T14:31:05.942286+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '093f5b78-ea49-42a4-b959-360b7999e6f8',
  '9e83df6f-68a4-4fc6-9d19-95e5a294dc16',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a294dc16/2-1773930664053.jpg',
  2,
  'יונדאי אלנטרה היברידי סופרים 1',
  '2026-03-19T14:31:05.942286+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'd63bbfd7-fb40-4366-899c-1b4b3d3f6703',
  '9e83df6f-68a4-4fc6-9d19-95e5a294dc16',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a294dc16/3-1773930664116.jpg',
  3,
  'יונדאי אלנטרה היברידי סופרים 2',
  '2026-03-19T14:31:05.942286+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '540710fb-3008-4e1f-9375-85fc30b0a3cc',
  '9e83df6f-68a4-4fc6-9d19-95e5a294dc16',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a294dc16/4-1773930664058.jpg',
  4,
  'יונדאי אלנטרה היברידי סופרים 3',
  '2026-03-19T14:31:05.942286+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '4684972f-fc35-4743-8fbc-a2a5820d332e',
  '9e83df6f-68a4-4fc6-9d19-95e5a294dc16',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a294dc16/5-1773930664080.jpg',
  5,
  'יונדאי אלנטרה היברידי סופרים 4',
  '2026-03-19T14:31:05.942286+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '84ca11dc-747a-4a0f-af08-a63dc268ced2',
  '9e83df6f-68a4-4fc6-9d19-95e5a294dc16',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a294dc16/6-1773930663877.jpg',
  6,
  'יונדאי אלנטרה היברידי סופרים 5',
  '2026-03-19T14:31:05.942286+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '4a916481-ffdf-438d-893a-e6574be2fd77',
  '9e83df6f-68a4-4fc6-9d19-95e5a294dc16',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a294dc16/7-1773930664071.jpg',
  7,
  'יונדאי אלנטרה היברידי סופרים 6',
  '2026-03-19T14:31:05.942286+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '721a0ebd-93b4-423d-b0a9-820e6c586444',
  '9e83df6f-68a4-4fc6-9d19-95e5a294dc16',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a294dc16/8-1773930664022.jpg',
  8,
  'יונדאי אלנטרה היברידי סופרים 7',
  '2026-03-19T14:31:05.942286+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '00ff73a8-6893-44eb-81b3-624c382d6345',
  '9e83df6f-68a4-4fc6-9d19-95e5a294dc16',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a294dc16/9-1773930664015.jpg',
  9,
  'יונדאי אלנטרה היברידי סופרים 8',
  '2026-03-19T14:31:05.942286+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '39d4341c-f472-44c5-b51e-dcbafd9626bc',
  'ca567242-dd64-4a25-a453-83d4a68577ff',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a68577ff/1-1774965435352.jpg',
  1,
  'מקסוס e-דליבר 5 1H1L קצר נמוך - Main Image',
  '2026-03-31T13:57:17.212556+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '2e66ee94-3004-4106-ad54-9398d252c6ae',
  'ca567242-dd64-4a25-a453-83d4a68577ff',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a68577ff/2-1774965435496.jpg',
  2,
  'מקסוס e-דליבר 5 1H1L קצר נמוך 1',
  '2026-03-31T13:57:17.212556+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '80695bbb-4187-443d-b1e0-76f4bdb30c50',
  'ca567242-dd64-4a25-a453-83d4a68577ff',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a68577ff/3-1774965435346.jpg',
  3,
  'מקסוס e-דליבר 5 1H1L קצר נמוך 2',
  '2026-03-31T13:57:17.212556+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '4e789046-6752-4a63-b225-3a71b3d7e490',
  'ca567242-dd64-4a25-a453-83d4a68577ff',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a68577ff/4-1774965435394.jpg',
  4,
  'מקסוס e-דליבר 5 1H1L קצר נמוך 3',
  '2026-03-31T13:57:17.212556+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '622ef281-7464-4e04-8798-b4b398b604e1',
  'ca567242-dd64-4a25-a453-83d4a68577ff',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a68577ff/5-1774965435476.jpg',
  5,
  'מקסוס e-דליבר 5 1H1L קצר נמוך 4',
  '2026-03-31T13:57:17.212556+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'fd0e38f4-d8ca-4d3e-80b6-55623fa6e0c6',
  'ca567242-dd64-4a25-a453-83d4a68577ff',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a68577ff/6-1774965435417.jpg',
  6,
  'מקסוס e-דליבר 5 1H1L קצר נמוך 5',
  '2026-03-31T13:57:17.212556+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '3d95f7c2-7386-460f-a511-f189f1658b2e',
  'ca567242-dd64-4a25-a453-83d4a68577ff',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a68577ff/7-1774965435498.jpg',
  7,
  'מקסוס e-דליבר 5 1H1L קצר נמוך 6',
  '2026-03-31T13:57:17.212556+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'd29e0dbc-9dfe-48c3-98ec-051d45967c29',
  'ca567242-dd64-4a25-a453-83d4a68577ff',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a68577ff/8-1774965435514.jpg',
  8,
  'מקסוס e-דליבר 5 1H1L קצר נמוך 7',
  '2026-03-31T13:57:17.212556+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '8fd9737e-a4a5-4816-b96f-8394f61273e2',
  'ca567242-dd64-4a25-a453-83d4a68577ff',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a68577ff/9-1774965435447.jpg',
  9,
  'מקסוס e-דליבר 5 1H1L קצר נמוך 8',
  '2026-03-31T13:57:17.212556+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '58a4900d-5498-468a-af9b-a5bea96f742e',
  'ca567242-dd64-4a25-a453-83d4a68577ff',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/a68577ff/10-1774965435413.jpg',
  10,
  'מקסוס e-דליבר 5 1H1L קצר נמוך 9',
  '2026-03-31T13:57:17.212556+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'ce23c1d5-f098-4c19-a44b-7bbd73390294',
  'd68d9193-7dbf-427a-808d-ce2a13973634',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/13973634/1-1773924193111.jpg',
  1,
  'ניסאן קשקאי אסנטה - Main Image',
  '2026-03-19T12:43:14.58647+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '116256f4-83a6-41cc-8162-7c5d77abb3d0',
  'd68d9193-7dbf-427a-808d-ce2a13973634',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/13973634/2-1773924193175.jpg',
  2,
  'ניסאן קשקאי אסנטה 1',
  '2026-03-19T12:43:14.58647+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '9e275b3d-988a-4d42-81d6-fac9306e75a3',
  'd68d9193-7dbf-427a-808d-ce2a13973634',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/13973634/3-1773924193185.jpg',
  3,
  'ניסאן קשקאי אסנטה 2',
  '2026-03-19T12:43:14.58647+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'fc698807-43f5-4227-af1c-3f63a5d7554a',
  'd68d9193-7dbf-427a-808d-ce2a13973634',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/13973634/4-1773924193007.jpg',
  4,
  'ניסאן קשקאי אסנטה 3',
  '2026-03-19T12:43:14.58647+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'a8453d6d-b908-4561-86ba-6f99b3483772',
  'd68d9193-7dbf-427a-808d-ce2a13973634',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/13973634/5-1773924193309.jpg',
  5,
  'ניסאן קשקאי אסנטה 4',
  '2026-03-19T12:43:14.58647+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'a224016a-1cbf-4352-9285-47b0c14083b4',
  'ebf4c825-070f-462d-9092-ec9670a258af',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/70a258af/1-1773650637835.jpg',
  1,
  'פולקסווגן קראפטר 5 טון רישיון ג - Main Image',
  '2026-03-16T08:43:59.866204+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '877802be-7b9c-4980-8faa-7aa41fe4c677',
  'ebf4c825-070f-462d-9092-ec9670a258af',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/70a258af/2-1773650637840.jpg',
  2,
  'פולקסווגן קראפטר 5 טון רישיון ג 1',
  '2026-03-16T08:43:59.866204+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '2329ce61-bfa9-42aa-a3b4-60ae57bc11da',
  'ebf4c825-070f-462d-9092-ec9670a258af',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/70a258af/3-1773650637837.jpg',
  3,
  'פולקסווגן קראפטר 5 טון רישיון ג 2',
  '2026-03-16T08:43:59.866204+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'c04674ce-8fd2-42de-b4f7-5f6811195f7d',
  'ebf4c825-070f-462d-9092-ec9670a258af',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/70a258af/4-1773650637795.jpg',
  4,
  'פולקסווגן קראפטר 5 טון רישיון ג 3',
  '2026-03-16T08:43:59.866204+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  'e276684c-d8a6-4a3e-942b-a2397d461165',
  'ebf4c825-070f-462d-9092-ec9670a258af',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/70a258af/5-1773650637823.jpg',
  5,
  'פולקסווגן קראפטר 5 טון רישיון ג 4',
  '2026-03-16T08:43:59.866204+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '9b1cb901-438e-4ed8-b95b-5bd1b74a9385',
  'ebf4c825-070f-462d-9092-ec9670a258af',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/70a258af/6-1773650637723.jpg',
  6,
  'פולקסווגן קראפטר 5 טון רישיון ג 5',
  '2026-03-16T08:43:59.866204+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '867cfb29-be52-4d46-8599-01fe20debb9a',
  'ebf4c825-070f-462d-9092-ec9670a258af',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/70a258af/7-1773650637697.jpg',
  7,
  'פולקסווגן קראפטר 5 טון רישיון ג 6',
  '2026-03-16T08:43:59.866204+00:00'
);

INSERT INTO vehicle_images (id, vehicle_id, image_url, position, alt_text, uploaded_at) VALUES (
  '637df691-ed19-4345-9567-70b6f02a30ec',
  'ebf4c825-070f-462d-9092-ec9670a258af',
  'https://nngrqlfpvrugtitptnhb.supabase.co/storage/v1/object/public/vehicle-images/vehicles/70a258af/8-1773650637912.jpg',
  8,
  'פולקסווגן קראפטר 5 טון רישיון ג 7',
  '2026-03-16T08:43:59.866204+00:00'
);

COMMIT;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
SELECT 'Vehicles: ' || COUNT(*) as info FROM vehicles;
SELECT 'Images: ' || COUNT(*) as info FROM vehicle_images;
SELECT v.title, COUNT(vi.id) as image_count FROM vehicles v LEFT JOIN vehicle_images vi ON v.id = vi.vehicle_id GROUP BY v.title, v.created_at ORDER BY v.created_at DESC;
