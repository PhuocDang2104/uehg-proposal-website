from __future__ import annotations

import asyncio
from typing import List, Sequence

import httpx

from app.core.config import Settings

JINA_EMBED_URL = "https://api.jina.ai/v1/embeddings"


class JinaEmbeddingClient:
    def __init__(self, settings: Settings):
        self.api_key = settings.jina_api_key
        self.model = settings.jina_embed_model
        self.dim = settings.jina_embed_dim
        self.timeout = 15.0
        self.max_retries = 3

    async def embed_query(self, text: str) -> List[float]:
        vectors = await self.embed_texts([text], task="retrieval.query")
        return vectors[0] if vectors else []

    async def embed_passages(self, texts: Sequence[str]) -> List[List[float]]:
        return await self.embed_texts(list(texts), task="retrieval.passage")

    async def embed_texts(self, texts: List[str], task: str) -> List[List[float]]:
        if not self.api_key:
            raise RuntimeError("JINA_API_KEY is required for embeddings")
        if not texts:
            return []

        payload = {"model": self.model, "input": texts, "task": task}
        response = await self._post(payload)
        data = response.get("data", [])
        if not data:
            return []
        if isinstance(data[0], dict) and "index" in data[0]:
            data = sorted(data, key=lambda item: item.get("index", 0))
        embeddings = [item["embedding"] for item in data]
        if embeddings and len(embeddings[0]) != self.dim:
            raise RuntimeError(
                f"Embedding dimension mismatch: expected {self.dim}, got {len(embeddings[0])}"
            )
        return embeddings

    async def _post(self, payload: dict) -> dict:
        headers = {"Authorization": f"Bearer {self.api_key}"}
        for attempt in range(self.max_retries):
            try:
                async with httpx.AsyncClient(timeout=self.timeout) as client:
                    response = await client.post(JINA_EMBED_URL, json=payload, headers=headers)
                if response.status_code in (429, 500, 502, 503, 504):
                    if attempt < self.max_retries - 1:
                        await asyncio.sleep(0.5 * (2**attempt))
                        continue
                response.raise_for_status()
                return response.json()
            except httpx.RequestError:
                if attempt < self.max_retries - 1:
                    await asyncio.sleep(0.5 * (2**attempt))
                    continue
                raise
        return {}

    def embed_query_sync(self, text: str) -> List[float]:
        return _run(self.embed_query(text))

    def embed_passages_sync(self, texts: Sequence[str]) -> List[List[float]]:
        return _run(self.embed_passages(texts))


def _run(coro):
    try:
        asyncio.get_running_loop()
    except RuntimeError:
        return asyncio.run(coro)
    raise RuntimeError("Cannot call sync embedding methods from an active event loop")
