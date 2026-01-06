from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List

import frontmatter


@dataclass
class ContentItem:
    path: Path
    metadata: Dict[str, object]
    content: str


def load_markdown(path: Path) -> ContentItem:
    post = frontmatter.load(path)
    return ContentItem(path=path, metadata=post.metadata, content=post.content.strip())


def iter_markdown_files(root: Path) -> Iterable[Path]:
    return root.rglob("*.md")


def load_content(root: Path) -> List[ContentItem]:
    items = []
    for path in iter_markdown_files(root):
        items.append(load_markdown(path))
    return items
