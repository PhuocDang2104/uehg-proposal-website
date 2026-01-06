from __future__ import annotations

import json
import os
import sys
import urllib.request
import re


def load_testset(path: str):
    with open(path, "r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            yield json.loads(line)


def call_chat(api_base: str, message: str):
    url = f"{api_base.rstrip('/')}/chat"
    payload = json.dumps({"message": message, "session_id": "eval"}).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def detect_refusal(answer: str) -> bool:
    return "chua co thong tin" in answer.lower()


def has_expected_ids(citations, expected_ids):
    if not expected_ids:
        return True
    found = {c.get("id") for c in citations}
    return any(eid in found for eid in expected_ids)


def no_hallucination(answer: str, citations) -> bool:
    urls = re.findall(r"https?://\\S+", answer)
    if not urls:
        return True
    cited = {c.get("url") for c in citations if c.get("url")}
    return all(url in cited for url in urls)


def run_eval(api_base: str, testset_path: str):
    rows = []
    for item in load_testset(testset_path):
        response = call_chat(api_base, item["query"])
        answer = response.get("answer", "")
        citations = response.get("citations", [])
        debug = response.get("debug") or {}

        refused = detect_refusal(answer)
        expected = item.get("expect", {})

        grounded = (not refused) and len(citations) > 0
        refusal_ok = bool(expected.get("refuse")) == refused
        event_ok = has_expected_ids(citations, expected.get("event_ids"))
        member_ok = has_expected_ids(citations, expected.get("member_ids"))
        intent_ok = True
        if expected.get("intent"):
            intent_ok = debug.get("intent") == expected.get("intent")
        hallucination_ok = no_hallucination(answer, citations)

        rows.append(
            {
                "id": item["id"],
                "refusal_ok": refusal_ok,
                "grounded": grounded,
                "event_ok": event_ok,
                "member_ok": member_ok,
                "intent_ok": intent_ok,
                "no_hallucination": hallucination_ok,
            }
        )

    totals = {
        key: 0
        for key in [
            "refusal_ok",
            "grounded",
            "event_ok",
            "member_ok",
            "intent_ok",
            "no_hallucination",
        ]
    }
    for row in rows:
        for key in totals:
            totals[key] += 1 if row[key] else 0

    print("Eval results")
    print("------------")
    for row in rows:
        print(
            f"{row['id']}: refusal_ok={row['refusal_ok']} grounded={row['grounded']} "
            f"event_ok={row['event_ok']} member_ok={row['member_ok']} intent_ok={row['intent_ok']} "
            f"no_hallucination={row['no_hallucination']}"
        )

    total = len(rows) or 1
    print("\nSummary")
    for key, value in totals.items():
        print(f"{key}: {value}/{total}")


if __name__ == "__main__":
    api_base = os.environ.get("API_BASE", "http://localhost:8000")
    testset_path = sys.argv[1] if len(sys.argv) > 1 else "eval/testset.jsonl"
    run_eval(api_base, testset_path)
