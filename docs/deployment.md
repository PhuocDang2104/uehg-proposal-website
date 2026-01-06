# Deployment (Render + Aiven + Vercel)

This guide assumes:
- Backend on Render
- Postgres + pgvector on Aiven
- Frontend on Vercel

## 1) Aiven Postgres (pgvector)

1. Create a Postgres service (Postgres 16 recommended).
2. Enable pgvector extension:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

3. Copy the connection string (DATABASE_URL).

## 2) Run migrations (once)

From your machine:

```bash
psql "$DATABASE_URL" -f infra/migrations/001_init.sql
psql "$DATABASE_URL" -f infra/migrations/002_seed.sql
```

Note: `JINA_EMBED_DIM` in env must match `documents.embedding_jina` dimension.

If you already have an existing DB with OpenAI embeddings, run the migration:

```bash
psql "$DATABASE_URL" -f infra/migrations/003_add_embedding_jina.sql
```

Then re-ingest content to populate `embedding_jina`.

## 3) Render backend deploy

Option A (recommended): use `render.yaml`

1. In Render, New -> Blueprint.
2. Select this repo and deploy.
3. Set secret env vars:
   - `DATABASE_URL` (Aiven connection string)
   - `JINA_API_KEY` (required)
   - `GROQ_API_KEY` (required for LLM generate)
   - `GROQ_MODEL` (default `llama-3.1-8b-instant`)
   - `GROQ_TIMEOUT` (default `20`)
   - `GROQ_BASE_URL` (default `https://api.groq.com/openai/v1`)
   - `JINA_EMBED_MODEL` (default `jina-embeddings-v3`)
   - `JINA_EMBED_DIM` (default `1024`)
   - `ADMIN_API_KEY`
   - `CORS_ALLOW_ORIGINS` (comma-separated Vercel domains)
   - Optional: `CORS_ALLOW_ORIGIN_REGEX` (e.g. `https://.*\\.vercel\\.app`)

Option B (manual): create Web Service

- Root directory: `backend`
- Build: `pip install -r requirements.txt`
- Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Health check: `/health`

Validate:

```
https://<render-host>/health
```

## 4) Ingest content

Option A: CLI (local)

```bash
DATABASE_URL="$DATABASE_URL" python backend/scripts/ingest.py --path content
```

Option B: API

```
POST https://<render-host>/admin/ingest
Authorization: Bearer <ADMIN_API_KEY>
Body: {"path":"content"}
```

## 5) Vercel frontend deploy

1. Import project in Vercel.
2. Set Root Directory: `frontend`.
3. Environment variable:
   - `NEXT_PUBLIC_API_BASE=https://<render-host>`
4. Deploy.

After deploy, add the Vercel domain to `CORS_ALLOW_ORIGINS` on Render.

## Files

- `render.yaml` for Render blueprint
- `frontend/vercel.json` for Vercel config
