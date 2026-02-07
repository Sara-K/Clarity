-- schema.sql
-- Supabase/Postgres

create extension if not exists pgcrypto;

-- Term type helps your builder decide quoting and weighting
do $$ begin
  create type topic_term_type as enum ('phrase', 'keyword', 'token');
exception
  when duplicate_object then null;
end $$;

create table if not exists categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  sort_order int not null default 0,
  tag_color text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists topics (
  id text primary key,
  category_id text not null references categories(id) on delete cascade,
  name text not null,
  slug text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (category_id, slug)
);

-- Rich "synonyms"
create table if not exists topic_terms (
  id uuid primary key default gen_random_uuid(),
  topic_id text not null references topics(id) on delete cascade,
  term text not null,
  term_type topic_term_type not null default 'keyword',
  language text not null default 'eng',
  weight int not null default 1,          -- higher = more important
  is_ambiguous boolean not null default false,
  requires_anchor boolean not null default false,
  anchor_terms text[] not null default '{}', -- terms that must be present if requires_anchor
  created_at timestamptz not null default now(),
  unique (topic_id, term, language)
);

-- Sources are normalized domains (no scheme, no path, no www)
create table if not exists sources (
  id uuid primary key default gen_random_uuid(),
  domain text not null unique,
  label text,
  homepage text,
  created_at timestamptz not null default now()
);

create table if not exists category_sources (
  category_id text not null references categories(id) on delete cascade,
  source_id uuid not null references sources(id) on delete cascade,
  weight int not null default 1,
  is_active boolean not null default true,
  primary key (category_id, source_id)
);

-- Optional: topic-specific sources (overrides or additions)
create table if not exists topic_sources (
  topic_id text not null references topics(id) on delete cascade,
  source_id uuid not null references sources(id) on delete cascade,
  weight int not null default 1,
  is_active boolean not null default true,
  primary key (topic_id, source_id)
);

create index if not exists idx_topics_category on topics(category_id);
create index if not exists idx_topic_terms_topic on topic_terms(topic_id);
create index if not exists idx_category_sources_category on category_sources(category_id);
create index if not exists idx_topic_sources_topic on topic_sources(topic_id);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE topic_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE topic_sources ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
DROP POLICY IF EXISTS "Allow public read access" ON categories;
CREATE POLICY "Allow public read access" ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON topics;
CREATE POLICY "Allow public read access" ON topics FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON topic_terms;
CREATE POLICY "Allow public read access" ON topic_terms FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON sources;
CREATE POLICY "Allow public read access" ON sources FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON category_sources;
CREATE POLICY "Allow public read access" ON category_sources FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON topic_sources;
CREATE POLICY "Allow public read access" ON topic_sources FOR SELECT USING (true);
