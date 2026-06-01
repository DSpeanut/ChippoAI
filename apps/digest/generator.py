import os
import re
import httpx

OPENROUTER_API_KEY = os.environ["OPENROUTER_API_KEY"]
MODEL = "google/gemini-2.5-flash"


def _slug_to_title(slug: str) -> str:
    return slug.replace("-", " ").title()


def _strip_citations(text: str) -> str:
    return re.sub(r"\[\d+\]", "", text).strip()


def generate_digest(entry: dict) -> str:
    slug = entry.get("_slug", "unknown")
    title = _slug_to_title(slug)
    concept = entry.get("eli3", [""])[0]
    takeaways = [_strip_citations(t) for t in entry.get("takeaways", [])[:2]]

    prompt = f"""You write a daily WhatsApp knowledge digest for someone studying ML and finance.

Topic: {title}
Concept: {concept}
Key points: {"; ".join(takeaways)}

Rules:
- Write exactly 2 lines
- Max 25 words per line
- No fluff, no "did you know", no hashtags
- Sound like a sharp senior engineer sharing insight, not a textbook
- Line 1: the core idea in plain language
- Line 2: why it matters or when it breaks

Reply with only the 2 lines, nothing else."""

    response = httpx.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "HTTP-Referer": "https://uncle-nick.app",
            "X-Title": "FinAI Morning Digest",
        },
        json={
            "model": MODEL,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 80,
        },
        timeout=30,
    )
    response.raise_for_status()
    lines = response.json()["choices"][0]["message"]["content"].strip()
    return f"📌 *{title}*\n{lines}"
