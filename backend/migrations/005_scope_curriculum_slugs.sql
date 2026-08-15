ALTER TABLE units DROP CONSTRAINT IF EXISTS units_slug_key;
ALTER TABLE chapters DROP CONSTRAINT IF EXISTS chapters_slug_key;

ALTER TABLE units DROP CONSTRAINT IF EXISTS units_class_slug_unique;
ALTER TABLE chapters DROP CONSTRAINT IF EXISTS chapters_unit_slug_unique;

ALTER TABLE units ADD CONSTRAINT units_class_slug_unique UNIQUE (class_id, slug);
ALTER TABLE chapters ADD CONSTRAINT chapters_unit_slug_unique UNIQUE (unit_id, slug);
