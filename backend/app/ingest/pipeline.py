from __future__ import annotations

import uuid
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.orm import Session

from app.core.config import Settings
from app.ingest.loader import load_content
from app.rag.chunking import chunk_text
from app.rag.embeddings import JinaEmbeddingClient
from app.db.models import Document, Event


@dataclass
class IngestResult:
    documents: int
    events_created: int


def _slugify(text: str) -> str:
    return "-".join(text.lower().strip().split())


def _parse_datetime(value: Optional[str]) -> Optional[datetime]:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value)
    except ValueError:
        return None


def ingest_directory(root: Path, db: Session, settings: Settings) -> IngestResult:
    items = load_content(root)
    embedder = JinaEmbeddingClient(settings)
    documents_inserted = 0
    events_created = 0

    for item in items:
        metadata = item.metadata or {}
        source_type = str(metadata.get("source_type") or "page")
        source_id_raw = metadata.get("source_id")
        title = metadata.get("title") or item.path.stem.replace("-", " ")
        tags = metadata.get("tags") or []
        visibility = metadata.get("visibility") or "public"
        event_time = _parse_datetime(metadata.get("event_time"))

        source_id = None
        if source_id_raw:
            source_id = uuid.UUID(str(source_id_raw))
        else:
            source_id = uuid.uuid4()
            if source_type == "event":
                existing = db.get(Event, source_id)
                if not existing:
                    event = Event(
                        id=source_id,
                        slug=metadata.get("slug") or _slugify(title),
                        title=title,
                        type=metadata.get("event_type") or "show",
                        status=metadata.get("status")
                        or ("upcoming" if event_time and event_time >= datetime.now(timezone.utc) else "past"),
                        start_time=event_time or datetime.now(timezone.utc),
                        description_md=item.content,
                        tags=tags,
                        created_at=datetime.now(timezone.utc),
                        updated_at=datetime.now(timezone.utc),
                    )
                    db.add(event)
                    events_created += 1

        chunks = chunk_text(item.content, chunk_size=500, overlap=80)
        if not chunks:
            continue

        embeddings = embedder.embed_passages_sync(chunks)

        for idx, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            doc_id = uuid.uuid5(
                uuid.NAMESPACE_URL, f"{source_type}:{source_id}:{item.path.as_posix()}:{idx}"
            )
            stmt = insert(Document).values(
                id=doc_id,
                source_type=source_type,
                source_id=source_id,
                title=title,
                content=chunk,
                tags=tags,
                event_time=event_time,
                visibility=visibility,
                embedding_jina=embedding,
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc),
            )
            stmt = stmt.on_conflict_do_update(
                index_elements=[Document.id],
                set_={
                    "content": chunk,
                    "tags": tags,
                    "event_time": event_time,
                    "visibility": visibility,
                    "embedding_jina": embedding,
                    "updated_at": datetime.now(timezone.utc),
                },
            )
            db.execute(stmt)
            documents_inserted += 1

    db.commit()
    return IngestResult(documents=documents_inserted, events_created=events_created)
