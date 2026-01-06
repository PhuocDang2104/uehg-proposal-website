# Threat model

## Assets
- Du lieu CLB trong Postgres (events, members, documents)
- API keys (Jina embeddings, admin ingest)

## Threats
- Prompt injection: user co the yeu cau "bo qua guardrails".
- Data exfiltration: leak thong tin khong public.
- Hallucination: tra loi sai ve show/price/venue.
- Abuse / spam: bot bi spam lam tang chi phi.

## Mitigations
- Evidence gate + refusal neu thieu bang chung.
- `visibility` filter trong documents.
- Admin ingest can API key.
- CORS allowlist, rate limit (co the them sau).
- Log intent + score de audit.
