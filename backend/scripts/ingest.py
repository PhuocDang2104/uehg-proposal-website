from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

from app.core.config import get_settings  # noqa: E402
from app.db.connection import get_db  # noqa: E402
from app.ingest.pipeline import ingest_directory  # noqa: E402


def main() -> None:
    parser = argparse.ArgumentParser(description="Ingest markdown content into Postgres")
    parser.add_argument("--path", default="content", help="Path to content directory")
    args = parser.parse_args()

    settings = get_settings()
    with get_db() as db:
        result = ingest_directory(Path(args.path), db, settings)

    print(f"documents={result.documents} events_created={result.events_created}")


if __name__ == "__main__":
    main()
