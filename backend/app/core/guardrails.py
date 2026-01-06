from __future__ import annotations

import re
import unicodedata
from typing import Iterable


DEFAULT_DOMAIN_TERMS = [
    "uehg",
    "guitar",
    "guitar show",
    "noi bat dau",
    "nguoc dong",
    "clb",
    "cau lac bo",
    "show",
    "workshop",
]


def normalize_text(text: str) -> str:
    text = text.lower()
    text = unicodedata.normalize("NFD", text)
    text = "".join(ch for ch in text if unicodedata.category(ch) != "Mn")
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def in_domain(query: str, extra_terms: Iterable[str] | None = None) -> bool:
    norm = normalize_text(query)
    haystack = set(norm.split())
    terms = list(DEFAULT_DOMAIN_TERMS)
    if extra_terms:
        terms.extend(extra_terms)
    for term in terms:
        term_norm = normalize_text(term)
        if not term_norm:
            continue
        if term_norm in norm:
            return True
        if term_norm in haystack:
            return True
    return False


def refusal_message() -> str:
    return (
        "M\u00ecnh ch\u01b0a c\u00f3 th\u00f4ng tin n\u00e0y trong d\u1eef li\u1ec7u CLB. "
        "B\u1ea1n c\u00f3 th\u1ec3 h\u1ecfi v\u1ec1 show s\u1eafp t\u1edbi, show \u0111\u00e3 qua, "
        "th\u00e0nh vi\u00ean, booking ho\u1eb7c th\u00f4ng tin chung v\u1ec1 UEHG nh\u00e9."
    )
