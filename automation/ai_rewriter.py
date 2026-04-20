"""
Claude AI article writer.
Takes only a news headline + brief RSS excerpt as a topic signal.
Writes a 100% original NepaliWave article from scratch.
No source text is copied or paraphrased — entirely original journalism.
"""
import json
import re
import requests
import anthropic
from config import ANTHROPIC_API_KEY, UNSPLASH_ACCESS_KEY

client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

CATEGORY_LIST = ["politics", "business", "sports", "technology",
                 "entertainment", "world", "health"]

SYSTEM_PROMPT = """You are NepaliWave's senior journalist and editorial AI.

NepaliWave is Nepal's independent news portal. Your job is to write original,
fully independent articles on current Nepali and world news topics.

Your writing style:
- Original, confident journalism — not a summary of anyone else's work
- Lead with what actually matters to ordinary Nepalis
- Add the "NepaliWave Angle": what does this event really mean on the ground?
- Clear, accessible English — no jargon, no fluff
- Short punchy paragraphs. Active voice.
- Draw on your broad knowledge of Nepal — politics, geography, economy, culture, history
- Every article must be entirely your own original writing
- If the news topic headline is in Nepali/Devanagari, translate it and write the article in English"""

USER_PROMPT_TEMPLATE = """News topic to cover: {title}

Brief context from {source_name}: {excerpt}

Write a complete, original NepaliWave article on this topic.
Do NOT copy or closely paraphrase the context above — use it only to understand what the news event is.
Research this topic from your knowledge and write as an independent journalist would.

Return ONLY valid JSON, no markdown, no extra text:

{{
  "title": "Your original NepaliWave headline (compelling, max 110 chars)",
  "excerpt": "Your original 2-3 sentence intro that hooks the reader (max 220 chars)",
  "body": [
    "Paragraph 1 — original scene-setting with key facts",
    "Paragraph 2 — NepaliWave Angle: what does this really mean for Nepalis?",
    "Paragraph 3 — background context from your knowledge",
    "Paragraph 4 — expert perspective or data point",
    "Paragraph 5 — what to watch next / closing thought"
  ],
  "category": "one of: politics|business|sports|technology|entertainment|world|health",
  "tags": ["tag1", "tag2", "tag3"],
  "breaking": false
}}"""

# Unsplash search terms per category (used when no specific tag works)
CATEGORY_UNSPLASH_QUERIES = {
    "politics":      "nepal parliament government",
    "business":      "nepal economy business",
    "sports":        "nepal sports cricket",
    "technology":    "technology digital nepal",
    "entertainment": "nepal culture festival",
    "world":         "himalaya nepal landscape",
    "health":        "healthcare medical nepal",
}


def slugify(title: str) -> str:
    slug = title.lower()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[\s_]+", "-", slug)
    slug = re.sub(r"-+", "-", slug).strip("-")
    return slug[:80]


def fetch_unsplash_image(category: str, tags: list[str]) -> tuple[str, str]:
    """Return (image_url, alt_text) from Unsplash, or ('', '') if unavailable."""
    if not UNSPLASH_ACCESS_KEY:
        return "", ""

    # Build search query from tags first, fall back to category defaults
    tag_query = " ".join(tags[:2]) if tags else ""
    query = f"{tag_query} nepal" if tag_query else CATEGORY_UNSPLASH_QUERIES.get(category, "nepal")

    try:
        resp = requests.get(
            "https://api.unsplash.com/photos/random",
            params={"query": query, "orientation": "landscape", "content_filter": "high"},
            headers={"Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"},
            timeout=8,
        )
        if resp.status_code == 200:
            data = resp.json()
            url = data["urls"]["regular"]
            alt = data.get("alt_description") or data.get("description") or query
            credit = data.get("user", {}).get("name", "Unsplash")
            return url, f"{alt.capitalize()} (Photo: {credit} / Unsplash)"
    except Exception as e:
        print(f"  [IMG] Unsplash error: {e}")
    return "", ""


def write_article(topic: dict) -> dict | None:
    """
    Write an original NepaliWave article on a news topic.
    Input: {title, excerpt, source_name, published_at, url, lang}
    Output: article dict ready to save to DB, or None on failure.
    """
    prompt = USER_PROMPT_TEMPLATE.format(
        title=topic["title"],
        source_name=topic["source_name"],
        excerpt=topic.get("excerpt", "No additional context available.")[:300],
    )

    try:
        # System prompt uses cache_control so it's only billed once per cache TTL (~5 min)
        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1800,
            system=[{
                "type": "text",
                "text": SYSTEM_PROMPT,
                "cache_control": {"type": "ephemeral"},
            }],
            messages=[{"role": "user", "content": prompt}],
        )
        text = message.content[0].text.strip()
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)

        data = json.loads(text)

        if data.get("category") not in CATEGORY_LIST:
            data["category"] = "world"

        tags = data.get("tags", [])
        image_url, image_alt = fetch_unsplash_image(data["category"], tags)

        return {
            "slug":         slugify(data["title"]),
            "title":        data["title"],
            "excerpt":      data.get("excerpt", ""),
            "body":         data.get("body", []),
            "category":     data["category"],
            "author":       "NepaliWave",
            "published_at": topic["published_at"],
            "image_url":    image_url,
            "image_alt":    image_alt or data["title"],
            "tags":         tags,
            "source_url":   topic["url"],
            "source_name":  None,
            "featured":     0,
            "breaking":     1 if data.get("breaking") else 0,
        }

    except json.JSONDecodeError as e:
        print(f"  [AI] JSON parse error: {e}")
        return None
    except anthropic.APIError as e:
        print(f"  [AI] API error: {e}")
        return None
    except Exception as e:
        print(f"  [AI] Unexpected error: {e}")
        return None
