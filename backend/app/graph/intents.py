from __future__ import annotations

import re
from enum import Enum
from typing import Dict, List

from app.core.guardrails import in_domain, normalize_text


class Intent(str, Enum):
    UPCOMING_SHOW = "UPCOMING_SHOW"
    PAST_SHOW = "PAST_SHOW"
    CLUB_INFO = "CLUB_INFO"
    MEMBERS = "MEMBERS"
    BOOKING_CONTACT = "BOOKING_CONTACT"
    FAQ = "FAQ"
    GREETING = "GREETING"
    OUT_OF_SCOPE = "OUT_OF_SCOPE"


PAST_TERMS = [
    "da dien ra",
    "da qua",
    "recap",
    "tong ket",
    "hom truoc",
    "nam ngoai",
]

UPCOMING_TERMS = [
    "sap toi",
    "khi nao",
    "lich",
    "upcoming",
    "sau",
    "ke tiep",
    "to chuc",
    "show",
]

MEMBER_TERMS = [
    "thanh vien",
    "ban nhac",
    "nhan su",
    "lineup",
    "performer",
]

BOOKING_TERMS = [
    "booking",
    "lien he",
    "dat show",
    "hop tac",
    "sponsor",
]

FAQ_TERMS = [
    "faq",
    "cau hoi",
    "bao gia",
    "gia ve",
    "quy dinh",
]

CLUB_TERMS = [
    "uehg la gi",
    "cau lac bo",
    "gioi thieu",
    "su menh",
    "tam nhin",
    "hoat dong",
]

GREETING_TERMS = [
    "chao",
    "xin chao",
    "hello",
    "hi",
    "hey",
]

GREETING_WORDS = {
    "chao",
    "xin",
    "hello",
    "hi",
    "hey",
    "ban",
    "nhe",
    "nha",
    "ne",
    "a",
    "ad",
    "anh",
    "chi",
    "em",
}

STOPWORDS = {
    "la",
    "co",
    "o",
    "va",
    "cua",
    "the",
    "cho",
    "toi",
    "ban",
    "minh",
    "em",
    "anh",
    "chi",
    "mot",
    "nhung",
    "voi",
    "trong",
    "nhu",
    "khi",
}


def _contains_any(norm: str, terms: List[str]) -> bool:
    return any(term in norm for term in terms)


def _is_greeting(norm: str) -> bool:
    tokens = norm.split()
    if not tokens:
        return False
    if _contains_any(norm, GREETING_TERMS) and all(token in GREETING_WORDS for token in tokens):
        return True
    return False


def route_intent(query: str) -> Intent:
    norm = normalize_text(query)

    if _is_greeting(norm):
        return Intent.GREETING

    if not in_domain(query):
        return Intent.OUT_OF_SCOPE

    if _contains_any(norm, PAST_TERMS):
        return Intent.PAST_SHOW
    if _contains_any(norm, UPCOMING_TERMS):
        return Intent.UPCOMING_SHOW
    if _contains_any(norm, MEMBER_TERMS):
        return Intent.MEMBERS
    if _contains_any(norm, BOOKING_TERMS):
        return Intent.BOOKING_CONTACT
    if _contains_any(norm, FAQ_TERMS):
        return Intent.FAQ
    if _contains_any(norm, CLUB_TERMS):
        return Intent.CLUB_INFO

    # Default to in-domain club info when UEHG-related but ambiguous.
    return Intent.CLUB_INFO


def extract_entities(query: str) -> Dict[str, List[str] | str | None]:
    norm = normalize_text(query)
    words = [word for word in norm.split() if word and word not in STOPWORDS]
    keywords = words[:6]
    event_name = None
    quoted = re.search(r"[\"\u201c\u201d](.+?)[\"\u201c\u201d]", query)
    if quoted:
        event_name = quoted.group(1).strip()
    return {
        "keywords": keywords,
        "event_name": event_name,
    }
