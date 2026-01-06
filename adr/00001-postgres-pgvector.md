# ADR 00001: Postgres + pgvector for RAG

## Status
Accepted

## Context
Can 1 DB duy nhat cho relational data (events, members, FAQ) va vector search cho RAG. He thong can de demo, quan sat, va de deploy.

## Decision
Chon Postgres + pgvector.

## Rationale
- 1 DB cho ca SQL va vector -> don gian ops.
- Phu hop demo nhanh, chi phi thap.
- Tich hop de voi FastAPI/SQLAlchemy.

## Consequences
- Can quan ly embedding dimension trong schema.
- ANN index can re-analyze khi du lieu tang.

## Alternatives
- Pinecone/Qdrant: manh cho vector, nhung tang do phuc tap va chi phi.
