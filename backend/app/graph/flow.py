from __future__ import annotations

from datetime import datetime, timezone

from langgraph.graph import END, StateGraph

from app.core.guardrails import refusal_message
from app.db import queries
from app.graph.intents import Intent, extract_entities, route_intent
from app.graph.state import ChatState
from app.rag.composer import compose_answer
from app.rag.retriever import retrieve_chunks


def _normalize_node(state: ChatState) -> ChatState:
    query = (state.get("query") or "").strip()
    return {"query": query}


def _route_node(state: ChatState) -> ChatState:
    query = state.get("query", "")
    intent = route_intent(query)
    entities = extract_entities(query)
    deps = state.get("deps") or {}
    logger = deps.get("logger")
    if logger:
        logger.info("intent_routed", extra={"intent": intent.value})
    return {"intent": intent.value, "entities": entities}


def _sql_node(state: ChatState) -> ChatState:
    deps = state["deps"]
    db = deps["db"]
    settings = deps["settings"]
    intent = Intent(state.get("intent"))
    entities = state.get("entities", {})
    keywords = entities.get("keywords") or []
    event_name = entities.get("event_name")
    if event_name:
        keywords = [event_name] + keywords
    elif intent in (Intent.UPCOMING_SHOW, Intent.PAST_SHOW):
        keywords = []

    if intent in (Intent.UPCOMING_SHOW, Intent.PAST_SHOW):
        events = queries.search_events(
            db,
            upcoming=intent == Intent.UPCOMING_SHOW,
            keywords=keywords,
            limit=settings.sql_limit,
        )
        return {"sql_results": {"events": events}}

    if intent == Intent.MEMBERS:
        members = queries.search_members(db, keywords=keywords, limit=settings.sql_limit)
        return {"sql_results": {"members": members}}

    return {}


def _vector_node(state: ChatState) -> ChatState:
    deps = state["deps"]
    db = deps["db"]
    settings = deps["settings"]
    embedder = deps["embedder"]
    logger = deps["logger"]
    intent = Intent(state.get("intent"))
    query = state.get("query", "")
    embedding = embedder.embed_query_sync(query)

    source_type = None
    source_ids = None
    time_start = None
    time_end = None

    now = datetime.now(timezone.utc)

    if intent in (Intent.UPCOMING_SHOW, Intent.PAST_SHOW):
        source_type = "event"
        events = (state.get("sql_results") or {}).get("events") or []
        if events:
            source_ids = [event.id for event in events]
        if intent == Intent.UPCOMING_SHOW:
            time_start = now
        if intent == Intent.PAST_SHOW:
            time_end = now

    if intent == Intent.MEMBERS:
        source_type = "member"
        members = (state.get("sql_results") or {}).get("members") or []
        if members:
            source_ids = [member.id for member in members]

    if intent == Intent.FAQ:
        source_type = "faq"

    if intent == Intent.CLUB_INFO:
        source_type = "page"

    if intent == Intent.BOOKING_CONTACT:
        source_type = "page"

    chunks = retrieve_chunks(
        db,
        embedding,
        settings,
        source_type=source_type,
        source_ids=source_ids,
        time_start=time_start,
        time_end=time_end,
    )

    top_score = max((chunk.score for chunk in chunks), default=0.0)
    logger.info(
        "rag_retrieval",
        extra={"intent": intent.value, "chunks": len(chunks), "top_score": top_score},
    )

    return {
        "chunks": chunks,
        "debug": {"retrieved_chunks": len(chunks), "top_score": top_score},
    }


def _evidence_gate(state: ChatState) -> ChatState:
    deps = state["deps"]
    settings = deps["settings"]
    intent = Intent(state.get("intent"))
    sql_results = state.get("sql_results") or {}
    chunks = state.get("chunks") or []
    top_score = max((chunk.score for chunk in chunks), default=0.0)

    allow = True
    reasons = []

    if intent in (Intent.UPCOMING_SHOW, Intent.PAST_SHOW) and not sql_results.get("events"):
        allow = False
        reasons.append("sql_empty")

    if intent == Intent.MEMBERS and not sql_results.get("members"):
        allow = False
        reasons.append("sql_empty")

    if intent in (Intent.CLUB_INFO, Intent.FAQ, Intent.BOOKING_CONTACT):
        if len(chunks) < settings.rag_min_chunks or top_score < settings.rag_min_score:
            allow = False
            reasons.append("rag_insufficient")

    decision = {
        "allow": allow,
        "reasons": reasons,
        "top_score": top_score,
        "chunk_count": len(chunks),
    }
    return {"decision": decision}


def _compose_node(state: ChatState) -> ChatState:
    response = compose_answer(state)
    return {
        "answer": response["answer"],
        "citations": response.get("citations", []),
        "suggested_questions": response.get("suggested_questions", []),
    }


def _refuse_node(state: ChatState) -> ChatState:
    intent = state.get("intent")
    suggestions = [
        "Show sap toi khi nao?",
        "CLB co tuyen thanh vien khong?",
        "Lien he booking the nao?",
    ]
    return {
        "answer": refusal_message(),
        "citations": [],
        "suggested_questions": suggestions,
        "decision": {"allow": False, "intent": intent},
    }


def _route_by_intent(state: ChatState) -> str:
    intent = Intent(state.get("intent"))
    if intent == Intent.OUT_OF_SCOPE:
        return "refuse"
    if intent in (Intent.UPCOMING_SHOW, Intent.PAST_SHOW, Intent.MEMBERS):
        return "sql_search"
    return "vector_search"


def _route_after_sql(state: ChatState) -> str:
    intent = Intent(state.get("intent"))
    if intent in (Intent.UPCOMING_SHOW, Intent.PAST_SHOW, Intent.MEMBERS):
        return "vector_search"
    return "evidence_gate"


def _route_after_gate(state: ChatState) -> str:
    decision = state.get("decision") or {}
    return "compose" if decision.get("allow") else "refuse"


def build_graph():
    graph = StateGraph(ChatState)
    graph.add_node("normalize", _normalize_node)
    graph.add_node("route_intent", _route_node)
    graph.add_node("sql_search", _sql_node)
    graph.add_node("vector_search", _vector_node)
    graph.add_node("evidence_gate", _evidence_gate)
    graph.add_node("compose", _compose_node)
    graph.add_node("refuse", _refuse_node)

    graph.set_entry_point("normalize")
    graph.add_edge("normalize", "route_intent")
    graph.add_conditional_edges("route_intent", _route_by_intent)
    graph.add_conditional_edges("sql_search", _route_after_sql)
    graph.add_edge("vector_search", "evidence_gate")
    graph.add_conditional_edges("evidence_gate", _route_after_gate)
    graph.add_edge("compose", END)
    graph.add_edge("refuse", END)

    return graph.compile()
