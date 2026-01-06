from __future__ import annotations

from typing import Iterable, List


def chunk_text(text: str, chunk_size: int = 500, overlap: int = 80) -> List[str]:
    words = text.split()
    if not words:
        return []
    step = max(1, chunk_size - overlap)
    chunks = []
    for start in range(0, len(words), step):
        end = start + chunk_size
        chunk = " ".join(words[start:end]).strip()
        if chunk:
            chunks.append(chunk)
    return chunks


def iter_chunks(texts: Iterable[str], chunk_size: int = 500, overlap: int = 80):
    for text in texts:
        for chunk in chunk_text(text, chunk_size=chunk_size, overlap=overlap):
            yield chunk
