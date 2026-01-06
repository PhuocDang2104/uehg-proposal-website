# Runbook

## Khi bot tra loi sai
1. Kiem tra logs (intent, chunk_count, top_score).
2. Xac minh data SQL (events/members) co dung khong.
3. Kiem tra `documents` co chunk lien quan, score co du khong.
4. Neu can, chay ingest lai.

## Re-ingest
- CLI: `python backend/scripts/ingest.py --path content`
- Hoac API: `POST /admin/ingest` voi API key.
- Neu doi embedding provider (OpenAI -> Jina), chay migration moi va ingest lai.

## Rotate API keys
1. Cap nhat `.env` / secret store.
2. Restart backend container.
3. Theo doi logs va metrics.

## Debug intent
- Bat `DEBUG=true` de tra ve `debug.intent` trong API.
- Kiem tra `docs/architecture.md` de xem flow.
