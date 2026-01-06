from __future__ import annotations

import logging
from functools import lru_cache
from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
from prometheus_client import CONTENT_TYPE_LATEST, generate_latest
from sqlalchemy import text

from app.core.config import get_settings
from app.core.logging import configure_logging
from app.db.connection import get_db
from app.graph.flow import build_graph
from app.observability.metrics import record_metrics
from app.rag.embeddings import JinaEmbeddingClient
from app.schemas import ChatDebug, ChatRequest, ChatResponse, IngestRequest
from app.ingest.pipeline import ingest_directory

settings = get_settings()
configure_logging(settings)
logger = logging.getLogger("uehg.backend")

app = FastAPI(title="UEHG Music Club Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@lru_cache
def get_graph():
    return build_graph()


def build_deps(db):
    return {
        "db": db,
        "settings": settings,
        "embedder": JinaEmbeddingClient(settings),
        "logger": logger,
    }


@app.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest, db=Depends(get_db)):
    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="Message is required")
    graph = get_graph()
    state = {
        "query": payload.message,
        "session_id": payload.session_id,
        "deps": build_deps(db),
    }

    try:
        result = graph.invoke(state)
    except Exception as exc:  # pragma: no cover
        logger.exception("chat_failed")
        raise HTTPException(status_code=500, detail="Chat processing failed") from exc

    intent = result.get("intent") or state.get("intent") or "UNKNOWN"
    debug_state = result.get("debug") or {}
    decision = result.get("decision") or {}

    debug = None
    if settings.debug:
        debug = ChatDebug(
            intent=intent,
            retrieved_chunks=debug_state.get("retrieved_chunks"),
            top_score=debug_state.get("top_score"),
            decision=decision,
        )

    record_metrics(
        intent=str(intent),
        chunk_count=debug_state.get("retrieved_chunks") or 0,
        top_score=debug_state.get("top_score") or 0.0,
        refused=not decision.get("allow", True),
    )

    return ChatResponse(
        answer=result.get("answer", ""),
        citations=result.get("citations", []),
        suggested_questions=result.get("suggested_questions", []),
        debug=debug,
    )


@app.get("/health")
def health(db=Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    return {"status": "ok"}


@app.post("/admin/ingest")
def ingest(payload: IngestRequest, request: Request, db=Depends(get_db)):
    auth = request.headers.get("authorization") or request.headers.get("x-api-key")
    if not auth:
        raise HTTPException(status_code=401, detail="Missing API key")

    token = auth.replace("Bearer ", "")
    if not settings.admin_api_key or token != settings.admin_api_key:
        raise HTTPException(status_code=403, detail="Invalid API key")

    root = Path(payload.path) if payload.path else Path("content")
    result = ingest_directory(root, db, settings)
    return {"documents": result.documents, "events_created": result.events_created}


@app.get("/metrics")
def metrics():
    if not settings.metrics_enabled:
        raise HTTPException(status_code=404, detail="Metrics disabled")
    return PlainTextResponse(generate_latest(), media_type=CONTENT_TYPE_LATEST)
