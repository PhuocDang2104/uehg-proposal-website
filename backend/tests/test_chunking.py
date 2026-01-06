from app.rag.chunking import chunk_text


def test_chunk_text():
    text = "one two three four five six seven eight nine ten"
    chunks = chunk_text(text, chunk_size=4, overlap=1)
    assert len(chunks) >= 2
    assert chunks[0].startswith("one")
