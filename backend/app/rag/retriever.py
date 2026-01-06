from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import Settings
from app.db.models import Document


@dataclass
class ChunkResult:
    id: UUID
    source_type: str
    source_id: Optional[UUID]
    title: Optional[str]
    content: str
    score: float
    event_time: Optional[datetime]
    tags: Optional[list]


def retrieve_chunks(
    db: Session,
    embedding: List[float],
    settings: Settings,
    source_type: Optional[str] = None,
    source_ids: Optional[List[UUID]] = None,
    time_start: Optional[datetime] = None,
    time_end: Optional[datetime] = None,
) -> List[ChunkResult]:
    if not embedding:
        return []

    distance = Document.embedding_jina.cosine_distance(embedding)
    stmt = (
        select(Document, (1 - distance).label("score"))
        .where(Document.visibility == "public")
        .where(Document.embedding_jina.is_not(None))
    )

    if source_type:
        stmt = stmt.where(Document.source_type == source_type)
    if source_ids:
        stmt = stmt.where(Document.source_id.in_(source_ids))
    if time_start:
        stmt = stmt.where(Document.event_time >= time_start)
    if time_end:
        stmt = stmt.where(Document.event_time <= time_end)

    stmt = stmt.order_by(distance).limit(settings.rag_top_k)

    rows = db.execute(stmt).all()
    results = []
    for doc, score in rows:
        results.append(
            ChunkResult(
                id=doc.id,
                source_type=doc.source_type,
                source_id=doc.source_id,
                title=doc.title,
                content=doc.content,
                score=float(score) if score is not None else 0.0,
                event_time=doc.event_time,
                tags=doc.tags,
            )
        )
    return results
