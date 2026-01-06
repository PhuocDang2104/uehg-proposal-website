from app.core.config import Settings
from app.graph.flow import _evidence_gate
from app.graph.intents import Intent


class _Chunk:
    def __init__(self, score: float):
        self.score = score


def test_evidence_gate_rejects_missing_sql():
    settings = Settings()
    state = {
        "intent": Intent.UPCOMING_SHOW.value,
        "sql_results": {"events": []},
        "chunks": [],
        "deps": {"settings": settings},
    }
    result = _evidence_gate(state)
    assert result["decision"]["allow"] is False


def test_evidence_gate_accepts_rag():
    settings = Settings()
    state = {
        "intent": Intent.CLUB_INFO.value,
        "sql_results": {},
        "chunks": [_Chunk(settings.rag_min_score + 0.1)],
        "deps": {"settings": settings},
    }
    result = _evidence_gate(state)
    assert result["decision"]["allow"] is True
