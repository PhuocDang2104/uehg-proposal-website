from __future__ import annotations

from prometheus_client import Counter, Histogram

CHAT_REQUESTS = Counter("chat_requests_total", "Total chat requests")
CHAT_REFUSALS = Counter("chat_refusals_total", "Total refused chat requests")
INTENT_COUNTER = Counter("chat_intents_total", "Requests by intent", ["intent"])
RAG_CHUNK_HIST = Histogram("rag_chunks_retrieved", "RAG chunks retrieved")
RAG_SCORE_HIST = Histogram("rag_top_score", "Top RAG score")


def record_metrics(intent: str, chunk_count: int, top_score: float, refused: bool) -> None:
    CHAT_REQUESTS.inc()
    INTENT_COUNTER.labels(intent=intent).inc()
    RAG_CHUNK_HIST.observe(chunk_count)
    RAG_SCORE_HIST.observe(top_score)
    if refused:
        CHAT_REFUSALS.inc()
