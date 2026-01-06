from __future__ import annotations

from typing import Any, Dict, List, Optional, TypedDict

from sqlalchemy.orm import Session

from app.core.config import Settings
from app.rag.embeddings import JinaEmbeddingClient


class ChatDeps(TypedDict):
    db: Session
    settings: Settings
    embedder: JinaEmbeddingClient
    logger: Any


class ChatState(TypedDict, total=False):
    query: str
    session_id: Optional[str]
    intent: str
    entities: Dict[str, Any]
    sql_results: Dict[str, Any]
    chunks: List[Any]
    decision: Dict[str, Any]
    answer: str
    citations: List[Dict[str, Any]]
    suggested_questions: List[str]
    debug: Dict[str, Any]
    deps: ChatDeps
