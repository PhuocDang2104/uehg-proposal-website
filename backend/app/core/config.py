from __future__ import annotations

from functools import lru_cache
from typing import List, Optional

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = Field("dev", alias="APP_ENV")
    debug: bool = Field(True, alias="DEBUG")
    log_level: str = Field("INFO", alias="LOG_LEVEL")

    database_url: str = Field(
        "postgresql+psycopg://postgres:postgres@localhost:5432/uehg",
        alias="DATABASE_URL",
    )

    groq_api_key: Optional[str] = Field(None, alias="GROQ_API_KEY")
    groq_model: str = Field("llama-3.1-8b-instant", alias="GROQ_MODEL")
    groq_timeout: float = Field(20.0, alias="GROQ_TIMEOUT")
    groq_base_url: str = Field("https://api.groq.com/openai/v1", alias="GROQ_BASE_URL")

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
    cors_allow_origin_regex: Optional[str] = Field(None, alias="CORS_ALLOW_ORIGIN_REGEX")

    metrics_enabled: bool = Field(True, alias="METRICS_ENABLED")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @field_validator("jina_embed_dim", mode="before")
    @classmethod
    def _coerce_jina_embed_dim(cls, value):
        if value in ("", None):
            return 1024
        return value

    @field_validator("jina_embed_model", mode="before")
    @classmethod
    def _coerce_jina_embed_model(cls, value):
        if value in ("", None):
            return "jina-embeddings-v3"
        return value

    @field_validator("groq_model", mode="before")
    @classmethod
    def _coerce_groq_model(cls, value):
        if value in ("", None):
            return "llama-3.1-8b-instant"
        return value

    @field_validator("groq_timeout", mode="before")
    @classmethod
    def _coerce_groq_timeout(cls, value):
        if value in ("", None):
            return 20.0
        return value

    @field_validator("groq_base_url", mode="before")
    @classmethod
    def _coerce_groq_base_url(cls, value):
        if value in ("", None):
            return "https://api.groq.com/openai/v1"
        return value

    @field_validator("database_url", mode="before")
    @classmethod
    def _coerce_database_url(cls, value):
        if not value:
            return value
        if isinstance(value, str):
            if value.startswith("postgres://"):
                return value.replace("postgres://", "postgresql+psycopg://", 1)
            if value.startswith("postgresql://"):
                return value.replace("postgresql://", "postgresql+psycopg://", 1)
        return value

    @field_validator("cors_allow_origin_regex", mode="before")
    @classmethod
    def _coerce_cors_origin_regex(cls, value):
        if value in ("", None):
            return None
        return value

    @property
    def cors_origins(self) -> List[str]:
        origins: List[str] = []
        for raw in self.cors_allow_origins.split(","):
            value = raw.strip()
            if not value:
                continue
            if (value.startswith('"') and value.endswith('"')) or (
                value.startswith("'") and value.endswith("'")
            ):
                value = value[1:-1]
            origins.append(value)
        return origins


@lru_cache
def get_settings() -> Settings:
    return Settings()
