"""
Claude AI rewriter — transforms raw scraped articles into
NepaliWave-style articles with editorial angle.
"""
import json
import re
import anthropic
from config import ANTHROPIC_API_KEY

client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

CATEGORY_LIST = ["politics", "business", "sports", "technology", "entertainment", "world", "health"]

SYSTEM_PROMPT = """You are NepaliWave's editorial AI. NepaliWave is Nepal's independent,
AI-powered news portal. Your voice is sharp, clear, and trustworthy — like a smart friend
who actually explains what the news means for ordinary Nepalis.

Your editorial style:
- Lead with what actually matters, not the official framing
- Add the "NepaliWave Angle" — what does this mean for real people on the ground?
- Be factual but don't be neutral when facts point clearly in one direction
- Write in accessible English. Not academic, not tabloid.
- Short punchy paragraphs. No jargon without explanation."""

USER_PROMPT_TEMPLATE = """Source article from {source_name}:

TITLE: {title}

CONTENT:
{content}

---

Rewrite this as a NepaliWave article. Return ONLY valid JSON, no markdown, no extra text:

{{
  "title": "compelling NepaliWave headline (max 100 chars)",
  "excerpt": "2-3 sentence summary that hooks the reader (max 200 chars)",
  "body": [
    "paragraph 1 — set the scene with the key facts",
    "paragraph 2 — the NepaliWave angle: what does this really mean?",
    "paragraph 3 — context, background, or expert perspective",
    "paragraph 4 — what happens next / what to watch",
    "paragraph 5 — closing thought"
  ],
  "category": "one of: politics|business|sports|technology|entertainment|world|health",
  "tags": ["tag1", "tag2", "tag3"],
  "breaking": false
}}"""


def slugify(title: str) -> str:
    """Convert title to URL slug."""
    slug = title.lower()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[\s_]+", "-", slug)
    slug = re.sub(r"-+", "-", slug).strip("-")
    return slug[:80]


def rewrite_article(raw: dict) -> dict | None:
    """
    Send raw article to Claude and get back a structured NepaliWave article.
    Returns dict ready to save to DB, or None on failure.
    """
    content = raw.get("full_text") or raw.get("summary") or ""
    if not content:
        return None

    prompt = USER_PROMPT_TEMPLATE.format(
        source_name=raw["source_name"],
        title=raw["title"],
        content=content[:6000],
    )

    try:
        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1500,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}],
        )
        text = message.content[0].text.strip()

        # Strip any accidental markdown fences
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)

        data = json.loads(text)

        # Validate category
        if data.get("category") not in CATEGORY_LIST:
            data["category"] = "world"

        return {
            "slug":         slugify(data["title"]),
            "title":        data["title"],
            "excerpt":      data.get("excerpt", ""),
            "body":         data.get("body", []),
            "category":     data["category"],
            "author":       "NepaliWave AI",
            "published_at": raw["published_at"],
            "image_url":    "",
            "image_alt":    data["title"],
            "tags":         data.get("tags", []),
            "source_url":   raw["url"],
            "source_name":  raw["source_name"],
            "featured":     0,
            "breaking":     1 if data.get("breaking") else 0,
        }

    except json.JSONDecodeError as e:
        print(f"  [AI] JSON parse error: {e}")
        return None
    except anthropic.APIError as e:
        print(f"  [AI] Claude API error: {e}")
        return None
    except Exception as e:
        print(f"  [AI] Unexpected error: {e}")
        return None
