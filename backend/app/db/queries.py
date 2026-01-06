from __future__ import annotations

from datetime import datetime, timezone
from typing import Iterable, List

from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from .models import Event, FAQStructured, Member


def _apply_keyword_filter(query, fields: Iterable, keywords: List[str]):
    if not keywords:
        return query
    clauses = []
    for kw in keywords:
        like = f"%{kw}%"
        clauses.extend([field.ilike(like) for field in fields])
    if clauses:
        query = query.where(or_(*clauses))
    return query


def search_events(db: Session, upcoming: bool, keywords: List[str], limit: int):
    now = datetime.now(timezone.utc)
    stmt = select(Event)
    if upcoming:
        stmt = stmt.where(Event.start_time >= now).order_by(Event.start_time.asc())
    else:
        stmt = stmt.where(Event.start_time < now).order_by(Event.start_time.desc())
    stmt = _apply_keyword_filter(stmt, [Event.title, Event.description_md, Event.venue_name], keywords)
    stmt = stmt.limit(limit)
    return db.execute(stmt).scalars().all()


def search_members(db: Session, keywords: List[str], limit: int):
    stmt = select(Member).where(Member.active.is_(True))
    stmt = _apply_keyword_filter(stmt, [Member.name, Member.role, Member.bio_md], keywords)
    stmt = stmt.limit(limit)
    return db.execute(stmt).scalars().all()


def search_faq(db: Session, keywords: List[str], limit: int):
    stmt = select(FAQStructured)
    stmt = _apply_keyword_filter(stmt, [FAQStructured.question, FAQStructured.answer_md], keywords)
    stmt = stmt.limit(limit)
    return db.execute(stmt).scalars().all()
