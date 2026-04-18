"""
RSS headline monitor — collects news topics from Nepali sources.
Only fetches RSS headlines and brief excerpts (published to be shared).
Does NOT fetch or copy full article text from any source.
The topic/headline is used only as a signal of what is happening.
"""
import feedparser
from datetime import datetime, timezone
from database import is_url_processed, mark_url_processed
from config import RSS_SOURCES


def parse_rss_date(entry) -> str:
    for attr in ("published_parsed", "updated_parsed"):
        t = getattr(entry, attr, None)
        if t:
            try:
                return datetime(*t[:6], tzinfo=timezone.utc).isoformat()
            except Exception:
                pass
    return datetime.now(timezone.utc).isoformat()


def clean_text(text: str) -> str:
    """Strip HTML tags from RSS excerpts."""
    import re
    text = re.sub(r"<[^>]+>", "", text)
    return text.strip()[:500]  # brief excerpt only


def fetch_new_topics() -> list[dict]:
    """
    Poll RSS feeds and return unprocessed news topics.
    Returns only: headline, brief RSS excerpt, source name, date.
    No full article text is fetched or copied.
    """
    new_topics = []

    for source in RSS_SOURCES:
        print(f"[SCRAPER] Checking {source['name']}...")
        try:
            feed = feedparser.parse(source["url"])
            entries = feed.entries[:15]
        except Exception as e:
            print(f"  [SCRAPER] Feed error for {source['name']}: {e}")
            continue

        for entry in entries:
            url = getattr(entry, "link", "")
            if not url or is_url_processed(url):
                continue

            title   = clean_text(getattr(entry, "title",   ""))
            excerpt = clean_text(getattr(entry, "summary", ""))

            if not title:
                mark_url_processed(url)
                continue

            print(f"  → New topic: {title[:70]}...")

            new_topics.append({
                "url":          url,
                "title":        title,
                "excerpt":      excerpt,        # RSS excerpt only — not full article
                "source_name":  source["name"],
                "lang":         source["lang"],
                "published_at": parse_rss_date(entry),
            })
            mark_url_processed(url)

    print(f"[SCRAPER] Found {len(new_topics)} new topics")
    return new_topics
