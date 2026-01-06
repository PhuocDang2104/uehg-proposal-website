from __future__ import annotations

from datetime import datetime, timezone
from typing import Any, Dict, List
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from app.core.guardrails import refusal_message
from app.graph.intents import Intent
from app.rag.retriever import ChunkResult


try:
    VN_TZ = ZoneInfo("Asia/Ho_Chi_Minh")
except ZoneInfoNotFoundError:  # pragma: no cover
    VN_TZ = timezone.utc


def _format_dt(value: datetime | None) -> str:
    if not value:
        return ""
    if value.tzinfo is None:
        value = value.replace(tzinfo=timezone.utc)
    local = value.astimezone(VN_TZ)
    return local.strftime("%Y-%m-%d %H:%M")


def _event_line(event) -> str:
    when = _format_dt(event.start_time)
    venue = event.venue_name or ""
    city = event.city or ""
    place = ", ".join([part for part in [venue, city] if part])
    ticket = f"Ve: {event.ticket_url}" if event.ticket_url else ""
    details = " | ".join([part for part in [place, ticket] if part])
    details = f" ({details})" if details else ""
    return f"- {event.title} ({when}){details}"


def _member_line(member) -> str:
    role = f" - {member.role}" if member.role else ""
    return f"- {member.name}{role}"


def build_event_citations(events) -> List[Dict[str, Any]]:
    citations = []
    for event in events:
        citations.append(
            {
                "type": "event",
                "id": str(event.id),
                "title": event.title,
                "url": f"/events/{event.slug}",
            }
        )
    return citations


def build_member_citations(members) -> List[Dict[str, Any]]:
    citations = []
    for member in members:
        citations.append(
            {
                "type": "member",
                "id": str(member.id),
                "title": member.name,
                "url": f"/members#{member.id}",
            }
        )
    return citations


def build_doc_citations(chunks: List[ChunkResult]) -> List[Dict[str, Any]]:
    citations = []
    for chunk in chunks:
        citations.append(
            {
                "type": chunk.source_type,
                "id": str(chunk.source_id) if chunk.source_id else None,
                "title": chunk.title,
                "score": round(chunk.score, 4),
            }
        )
    return citations


def suggested_questions(intent: Intent) -> List[str]:
    suggestions = {
        Intent.UPCOMING_SHOW: [
            "Dia diem o dau?",
            "Co link mua ve khong?",
            "Lineup gom nhung ai?",
        ],
        Intent.PAST_SHOW: [
            "Co recap hay highlight khong?",
            "CLB co album/hinh anh su kien khong?",
            "Show sap toi khi nao?",
        ],
        Intent.MEMBERS: [
            "CLB co dang tuyen thanh vien khong?",
            "Co ai phu trach booking khong?",
            "Cach tham gia workshop?",
        ],
        Intent.CLUB_INFO: [
            "CLB hoat dong nhu the nao?",
            "Cach lien he booking?",
            "Show sap toi khi nao?",
        ],
        Intent.FAQ: [
            "CLB co dang tuyen thanh vien khong?",
            "Cach lien he booking?",
            "Show sap toi khi nao?",
        ],
        Intent.BOOKING_CONTACT: [
            "CLB co nhan booking su kien khong?",
            "CLB co kit truyen thong khong?",
            "Show sap toi khi nao?",
        ],
    }
    return suggestions.get(intent, [])


def compose_answer(state: Dict[str, Any]) -> Dict[str, Any]:
    intent = Intent(state.get("intent")) if state.get("intent") else Intent.OUT_OF_SCOPE
    sql_results = state.get("sql_results") or {}
    chunks = state.get("chunks") or []

    if intent in (Intent.UPCOMING_SHOW, Intent.PAST_SHOW):
        events = sql_results.get("events") or []
        if not events:
            return {
                "answer": refusal_message(),
                "citations": [],
                "suggested_questions": suggested_questions(intent),
            }
        lines = ["Cac show lien quan:"] + [_event_line(event) for event in events]
        return {
            "answer": "\n".join(lines),
            "citations": build_event_citations(events),
            "suggested_questions": suggested_questions(intent),
        }

    if intent == Intent.MEMBERS:
        members = sql_results.get("members") or []
        if not members:
            return {
                "answer": refusal_message(),
                "citations": [],
                "suggested_questions": suggested_questions(intent),
            }
        lines = ["Thanh vien/nhan su noi bat:"] + [_member_line(m) for m in members]
        return {
            "answer": "\n".join(lines),
            "citations": build_member_citations(members),
            "suggested_questions": suggested_questions(intent),
        }

    if not chunks:
        return {
            "answer": refusal_message(),
            "citations": [],
            "suggested_questions": suggested_questions(intent),
        }

    top_chunks = chunks[:3]
    summary_lines = ["Thong tin tu du lieu CLB:"]
    summary_lines.extend([f"- {chunk.content.strip()}" for chunk in top_chunks])
    return {
        "answer": "\n".join(summary_lines),
        "citations": build_doc_citations(top_chunks),
        "suggested_questions": suggested_questions(intent),
    }
