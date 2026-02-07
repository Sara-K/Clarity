-- Create article_summaries table for AI-generated content
create table if not exists article_summaries (
  id text primary key, -- Hash of normalized URL
  url text not null unique,
  title text,
  tldr text,
  key_takeaways jsonb, -- Array of strings
  quotes jsonb, -- Array of objects { quote, context, url }
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for fast lookups by URL and expiration checks
create index if not exists idx_article_summaries_url on article_summaries(url);

-- Enable RLS
ALTER TABLE article_summaries ENABLE ROW LEVEL SECURITY;

-- Allow public read access (authenticated users can read)
DROP POLICY IF EXISTS "Allow public read access" ON article_summaries;
CREATE POLICY "Allow public read access" ON article_summaries FOR SELECT USING (true);

-- Allow service role to insert/update (Edge Function uses service role)
-- No public write policy needed as only the Edge Function should write
