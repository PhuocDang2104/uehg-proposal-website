from __future__ import annotations

from sqlalchemy import JSON, Boolean, Column, DateTime, ForeignKey, Numeric, Text
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import declarative_base, relationship
from pgvector.sqlalchemy import Vector

from app.core.config import get_settings

Base = declarative_base()
settings = get_settings()


class Event(Base):
    __tablename__ = "events"

    id = Column(UUID(as_uuid=True), primary_key=True)
    slug = Column(Text, unique=True, nullable=False)
    title = Column(Text, nullable=False)
    type = Column(Text, nullable=False)
    status = Column(Text, nullable=False)
    start_time = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True))
    venue_name = Column(Text)
    venue_address = Column(Text)
    city = Column(Text)
    ticket_url = Column(Text)
    price_min = Column(Numeric)
    price_max = Column(Numeric)
    description_md = Column(Text)
    poster_image_url = Column(Text)
    tags = Column(ARRAY(Text))
    created_at = Column(DateTime(timezone=True))
    updated_at = Column(DateTime(timezone=True))

    performers = relationship("EventPerformer", back_populates="event")


class Member(Base):
    __tablename__ = "members"

    id = Column(UUID(as_uuid=True), primary_key=True)
    name = Column(Text, nullable=False)
    role = Column(Text)
    bio_md = Column(Text)
    social_links = Column(JSON)
    active = Column(Boolean, default=True)


class EventPerformer(Base):
    __tablename__ = "event_performers"

    id = Column(UUID(as_uuid=True), primary_key=True)
    event_id = Column(UUID(as_uuid=True), ForeignKey("events.id", ondelete="CASCADE"))
    member_id = Column(UUID(as_uuid=True), ForeignKey("members.id", ondelete="SET NULL"))
    guest_name = Column(Text)
    role = Column(Text)

    event = relationship("Event", back_populates="performers")


class Media(Base):
    __tablename__ = "media"

    id = Column(UUID(as_uuid=True), primary_key=True)
    title = Column(Text)
    media_type = Column(Text)
    url = Column(Text, nullable=False)
    event_id = Column(UUID(as_uuid=True), ForeignKey("events.id", ondelete="SET NULL"))
    member_id = Column(UUID(as_uuid=True), ForeignKey("members.id", ondelete="SET NULL"))
    tags = Column(ARRAY(Text))
    created_at = Column(DateTime(timezone=True))


class FAQStructured(Base):
    __tablename__ = "faq_structured"

    id = Column(UUID(as_uuid=True), primary_key=True)
    question = Column(Text, nullable=False)
    answer_md = Column(Text, nullable=False)
    category = Column(Text)
    updated_at = Column(DateTime(timezone=True))


class Document(Base):
    __tablename__ = "documents"

    id = Column(UUID(as_uuid=True), primary_key=True)
    source_type = Column(Text, nullable=False)
    source_id = Column(UUID(as_uuid=True))
    title = Column(Text)
    content = Column(Text, nullable=False)
    language = Column(Text, default="vi")
    tags = Column(ARRAY(Text))
    event_time = Column(DateTime(timezone=True))
    visibility = Column(Text, default="public")
    embedding = Column(Vector(1536))
    embedding_jina = Column(Vector(settings.jina_embed_dim))
    created_at = Column(DateTime(timezone=True))
    updated_at = Column(DateTime(timezone=True))
