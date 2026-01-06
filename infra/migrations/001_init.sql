CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  venue_name TEXT,
  venue_address TEXT,
  city TEXT,
  ticket_url TEXT,
  price_min NUMERIC,
  price_max NUMERIC,
  description_md TEXT,
  poster_image_url TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  bio_md TEXT,
  social_links JSONB,
  active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS event_performers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  member_id UUID REFERENCES members(id) ON DELETE SET NULL,
  guest_name TEXT,
  role TEXT,
  UNIQUE (event_id, member_id, guest_name)
);

CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  media_type TEXT,
  url TEXT NOT NULL,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  member_id UUID REFERENCES members(id) ON DELETE SET NULL,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faq_structured (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer_md TEXT NOT NULL,
  category TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type TEXT NOT NULL,
  source_id UUID,
  title TEXT,
  content TEXT NOT NULL,
  language TEXT DEFAULT 'vi',
  tags TEXT[],
  event_time TIMESTAMPTZ,
  visibility TEXT DEFAULT 'public',
  embedding vector(1536),
  embedding_jina vector(1024),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS documents_embedding_jina_ivfflat
ON documents USING ivfflat (embedding_jina vector_cosine_ops)
WITH (lists = 100);

CREATE INDEX IF NOT EXISTS documents_source_filter
ON documents (source_type, source_id, visibility);

CREATE INDEX IF NOT EXISTS documents_event_time_idx
ON documents (event_time);
