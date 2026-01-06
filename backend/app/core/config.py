from __future__ import annotations

from functools import lru_cache
from typing import List, Optional

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = Field("dev", alias="APP_ENV")
    debug: bool = Field(True, alias="DEBUG")
    log_level: str = Field("INFO", alias="LOG_LEVEL")

    database_url: str = Field(
        "postgresql+psycopg://postgres:postgres@localhost:5432/uehg",
        alias="DATABASE_URL",
    )

    jina_api_key: Optional[str] = Field(None, alias="JINA_API_KEY")
    jina_embed_model: str = Field("jina-embeddings-v3", alias="JINA_EMBED_MODEL")
    jina_embed_dim: int = Field(1024, alias="JINA_EMBED_DIM")

    rag_top_k: int = Field(6, alias="RAG_TOP_K")
    rag_min_score: float = Field(0.76, alias="RAG_MIN_SCORE")
    rag_min_chunks: int = Field(2, alias="RAG_MIN_CHUNKS")
    sql_limit: int = Field(6, alias="SQL_LIMIT")

    admin_api_key: Optional[str] = Field(None, alias="ADMIN_API_KEY")
    allow_llm_router: bool = Field(False, alias="ALLOW_LLM_ROUTER")
    allow_llm_answer: bool = Field(False, alias="ALLOW_LLM_ANSWER")

    cors_allow_origins: str = Field("http://localhost:3000", alias="CORS_ALLOW_ORIGINS")

    metrics_enabled: bool = Field(True, alias="METRICS_ENABLED")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def cors_origins(self) -> List[str]:
        return [item.strip() for item in self.cors_allow_origins.split(",") if item.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
