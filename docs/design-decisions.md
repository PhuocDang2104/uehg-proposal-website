# Design decisions

## Router
- Rule-based intent routing for deterministic demo. Co the bat LLM router khi co API key.
- Intent set gon phu hop landing page: show, members, club info, booking, FAQ.

## Orchestration
- LangGraph de the hien ro graph routing va de mo rong sau nay.

## Evidence gate
- SQL la source of truth cho events/members.
- RAG chi dung de bo sung noi dung dai, phai dat threshold moi duoc tra loi.

## Embeddings
- Default model: `jina-embeddings-v3` (dim=1024).
- Neu doi model, can doi ca `JINA_EMBED_DIM` va migration documents.

## Ingestion
- Markdown + frontmatter de versioning du lieu.
- Chunk 500 tokens (approx) + overlap 80 de tang recall.

## Observability
- Log intent + retrieved chunks + top_score.
- Prometheus metrics `/metrics`.
