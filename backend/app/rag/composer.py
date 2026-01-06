from __future__ import annotations

from datetime import datetime, timezone
from typing import Any, Dict, List
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from app.core.guardrails import refusal_message
from app.graph.intents import Intent
from app.llm.groq_client import GroqClient
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
    ticket = f"V\u00e9: {event.ticket_url}" if event.ticket_url else ""
    details = " | ".join([part for part in [place, ticket] if part])
    details = f" ({details})" if details else ""
    return f"- {event.title} ({when}){details}"


def _member_line(member) -> str:
    role = f" - {member.role}" if member.role else ""
    return f"- {member.name}{role}"


def _event_evidence(event) -> str:
    parts = [
        f"title={event.title}",
        f"status={event.status}",
        f"start={_format_dt(event.start_time)}",
    ]
    if event.venue_name:
        parts.append(f"venue={event.venue_name}")
    if event.city:
        parts.append(f"city={event.city}")
    if event.ticket_url:
        parts.append(f"ticket_url={event.ticket_url}")
    if event.description_md:
        parts.append(f"description={event.description_md.strip()}")
    return " | ".join(parts)


def _member_evidence(member) -> str:
    parts = [f"name={member.name}"]
    if member.role:
        parts.append(f"role={member.role}")
    if member.bio_md:
        parts.append(f"bio={member.bio_md.strip()}")
    return " | ".join(parts)


def _chunks_evidence(chunks: List[ChunkResult], limit: int = 4) -> str:
    lines = []
    for idx, chunk in enumerate(chunks[:limit], start=1):
        title = chunk.title or ""
        header = f"{idx}. source={chunk.source_type} title={title} score={chunk.score:.3f}"
        lines.append(f"{header}\n{chunk.content.strip()}")
    return "\n\n".join(lines) if lines else "none"


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
            "\u0110\u1ecba \u0111i\u1ec3m \u1edf \u0111\u00e2u?",
            "C\u00f3 link mua v\u00e9 kh\u00f4ng?",
            "Lineup g\u1ed3m nh\u1eefng ai?",
        ],
        Intent.PAST_SHOW: [
            "C\u00f3 recap hay highlight kh\u00f4ng?",
            "CLB c\u00f3 album/h\u00ecnh \u1ea3nh s\u1ef1 ki\u1ec7n kh\u00f4ng?",
            "Show s\u1eafp t\u1edbi khi n\u00e0o?",
        ],
        Intent.MEMBERS: [
            "CLB c\u00f3 \u0111ang tuy\u1ec3n th\u00e0nh vi\u00ean kh\u00f4ng?",
            "C\u00f3 ai ph\u1ee5 tr\u00e1ch booking kh\u00f4ng?",
            "C\u00e1ch tham gia workshop?",
        ],
        Intent.CLUB_INFO: [
            "CLB ho\u1ea1t \u0111\u1ed9ng nh\u01b0 th\u1ebf n\u00e0o?",
            "C\u00e1ch li\u00ean h\u1ec7 booking?",
            "Show s\u1eafp t\u1edbi khi n\u00e0o?",
        ],
        Intent.FAQ: [
            "CLB c\u00f3 \u0111ang tuy\u1ec3n th\u00e0nh vi\u00ean kh\u00f4ng?",
            "C\u00e1ch li\u00ean h\u1ec7 booking?",
            "Show s\u1eafp t\u1edbi khi n\u00e0o?",
        ],
        Intent.BOOKING_CONTACT: [
            "CLB c\u00f3 nh\u1eadn booking s\u1ef1 ki\u1ec7n kh\u00f4ng?",
            "CLB c\u00f3 kit truy\u1ec1n th\u00f4ng kh\u00f4ng?",
            "Show s\u1eafp t\u1edbi khi n\u00e0o?",
        ],
        Intent.GREETING: [
            "Show s\u1eafp t\u1edbi khi n\u00e0o?",
            "CLB ho\u1ea1t \u0111\u1ed9ng nh\u01b0 th\u1ebf n\u00e0o?",
            "C\u00e1ch li\u00ean h\u1ec7 booking?",
        ],
    }
    return suggestions.get(intent, [])


def _build_prompt(state: Dict[str, Any]) -> List[Dict[str, str]]:
    intent = Intent(state.get("intent")) if state.get("intent") else Intent.OUT_OF_SCOPE
    sql_results = state.get("sql_results") or {}
    chunks = state.get("chunks") or []
    query = state.get("query") or ""

    events = sql_results.get("events") or []
    members = sql_results.get("members") or []

    events_block = "none"
    if events:
        events_block = "\n".join(_event_evidence(event) for event in events)

    members_block = "none"
    if members:
        members_block = "\n".join(_member_evidence(member) for member in members)

    chunks_block = _chunks_evidence(chunks)

    if intent == Intent.GREETING:
        system = (
            "You are a friendly assistant for the UEHG music club landing page. "
            "For GREETING intent, respond with a short greeting and invite the user "
            "to ask about upcoming shows, past shows, members, booking, or club info. "
            "Use full Vietnamese diacritics."
        )
    else:
        system = (
            "You are a friendly assistant for the UEHG music club landing page. "
            "Answer in Vietnamese using only the evidence provided. "
            "If evidence is missing or the question is out of scope, reply exactly: "
            f"\"{refusal_message()}\". "
            "Do not invent ticket prices, links, or names. "
            "If the question is ambiguous, ask one short clarifying question. "
            "Use full Vietnamese diacritics."
        )

    user = (
        f"Intent: {intent.value}\n"
        f"User question: {query}\n\n"
        "SQL Evidence - Events:\n"
        f"{events_block}\n\n"
        "SQL Evidence - Members:\n"
        f"{members_block}\n\n"
        "RAG Evidence:\n"
        f"{chunks_block}\n\n"
        "Answer in Vietnamese:"
    )

    return [
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ]


def _compose_deterministic(intent: Intent, sql_results: Dict[str, Any], chunks: List[ChunkResult]):
    if intent == Intent.GREETING:
        return {
            "answer": (
                "Ch\u00e0o b\u1ea1n! M\u00ecnh l\u00e0 tr\u1ee3 l\u00fd c\u1ee7a CLB UEHG. "
                "B\u1ea1n mu\u1ed1n h\u1ecfi v\u1ec1 show s\u1eafp t\u1edbi, "
                "th\u00e0nh vi\u00ean, booking hay th\u00f4ng tin chung v\u1ec1 CLB kh\u00f4ng?"
            ),
            "citations": [],
            "suggested_questions": suggested_questions(intent),
        }

    if intent in (Intent.UPCOMING_SHOW, Intent.PAST_SHOW):
        events = sql_results.get("events") or []
        if not events:
            return {
                "answer": refusal_message(),
                "citations": [],
                "suggested_questions": suggested_questions(intent),
            }
        lines = ["C\u00e1c show li\u00ean quan:"] + [_event_line(event) for event in events]
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
        lines = ["Th\u00e0nh vi\u00ean/nh\u00e2n s\u1ef1 n\u1ed5i b\u1eadt:"] + [
            _member_line(m) for m in members
        ]
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
    summary_lines = ["Th\u00f4ng tin t\u1eeb d\u1eef li\u1ec7u CLB:"]
    summary_lines.extend([f"- {chunk.content.strip()}" for chunk in top_chunks])
    return {
        "answer": "\n".join(summary_lines),
        "citations": build_doc_citations(top_chunks),
        "suggested_questions": suggested_questions(intent),
    }


def compose_answer(state: Dict[str, Any], groq_client: GroqClient | None = None) -> Dict[str, Any]:
    intent = Intent(state.get("intent")) if state.get("intent") else Intent.OUT_OF_SCOPE
    sql_results = state.get("sql_results") or {}
    chunks = state.get("chunks") or []
    deps = state.get("deps") or {}
    groq = groq_client or deps.get("groq")

    if not groq or not getattr(groq, "api_key", None):
        return _compose_deterministic(intent, sql_results, chunks)

    prompt = _build_prompt(state)
    answer = groq.chat(prompt)

    if intent in (Intent.UPCOMING_SHOW, Intent.PAST_SHOW):
        events = sql_results.get("events") or []
        citations = build_event_citations(events)
    elif intent == Intent.MEMBERS:
        members = sql_results.get("members") or []
        citations = build_member_citations(members)
    else:
        citations = build_doc_citations(chunks[:3]) if chunks else []

    return {
        "answer": answer,
        "citations": citations,
        "suggested_questions": suggested_questions(intent),
    }
