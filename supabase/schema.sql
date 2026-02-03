-- Create Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tag_color TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Topics table
CREATE TABLE IF NOT EXISTS topics (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

-- Create Public Read Policies
DROP POLICY IF EXISTS "Allow public read access" ON categories;
CREATE POLICY "Allow public read access" ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON topics;
CREATE POLICY "Allow public read access" ON topics FOR SELECT USING (true);
