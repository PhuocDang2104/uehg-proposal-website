CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents
ADD COLUMN IF NOT EXISTS embedding_jina vector(1024);

CREATE INDEX IF NOT EXISTS documents_embedding_jina_ivfflat
ON documents USING ivfflat (embedding_jina vector_cosine_ops)
WITH (lists = 100);
