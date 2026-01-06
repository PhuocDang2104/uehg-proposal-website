from __future__ import annotations

import time
from typing import Dict, List

import httpx

from app.core.config import Settings

DEFAULT_GROQ_BASE_URL = "https://api.groq.com/openai/v1"


class GroqClient:
    def __init__(self, settings: Settings):
        self.api_key = settings.groq_api_key
        self.model = settings.groq_model
        self.timeout = settings.groq_timeout
        self.base_url = settings.groq_base_url or DEFAULT_GROQ_BASE_URL
        self.chat_url = f"{self.base_url.rstrip('/')}/chat/completions"
        self.max_retries = 3

    def chat(self, messages: List[Dict[str, str]], temperature: float = 0.2, max_tokens: int = 500) -> str:
        if not self.api_key:
            raise RuntimeError("GROQ_API_KEY is required for LLM responses")

        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        }

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

        for attempt in range(self.max_retries):
            try:
                response = httpx.post(
                    self.chat_url, json=payload, headers=headers, timeout=self.timeout
                )
                if response.status_code in (429, 500, 502, 503, 504):
                    if attempt < self.max_retries - 1:
                        time.sleep(0.5 * (2**attempt))
                        continue
                response.raise_for_status()
                data = response.json()
                content = data["choices"][0]["message"]["content"]
                return content.strip()
            except httpx.RequestError:
                if attempt < self.max_retries - 1:
                    time.sleep(0.5 * (2**attempt))
                    continue
                raise

        raise RuntimeError("Groq request failed after retries")
