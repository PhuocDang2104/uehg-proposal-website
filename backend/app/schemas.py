from __future__ import annotations

from typing import List, Optional

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class Citation(BaseModel):
    type: str
    id: Optional[str] = None
    title: Optional[str] = None
    url: Optional[str] = None
    score: Optional[float] = None


class ChatDebug(BaseModel):
    intent: Optional[str] = None
    retrieved_chunks: Optional[int] = None
    top_score: Optional[float] = None
    decision: Optional[dict] = None


class ChatResponse(BaseModel):
    answer: str
    citations: List[Citation] = Field(default_factory=list)
    suggested_questions: List[str] = Field(default_factory=list)
    debug: Optional[ChatDebug] = None


class IngestRequest(BaseModel):
    path: Optional[str] = None
