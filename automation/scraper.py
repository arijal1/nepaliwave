"""
RSS scraper — fetches latest articles from Nepali news sources.
Only returns articles not yet processed (checked by URL in DB).
"""
import feedparser
import requests
from bs4 import BeautifulSoup
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from database import is_url_processed, mark_url_processed
from config import RSS_SOURCES

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; NepaliWaveBot/1.0; +https://nepaliwave.anuprijal.com.np)",
}
FETCH_TIMEOUT = 15


def parse_rss_date(entry) -> str:
    """Parse RSS date to ISO string, fall back to now."""
    for attr in ("published_parsed", "updated_parsed"):
        t = getattr(entry, attr, None)
        if t:
            try:
                return datetime(*t[:6], tzinfo=timezone.utc).isoformat()
            except Exception:
                pass
    return datetime.now(timezone.utc).isoformat()


def fetch_article_text(url: str) -> str:
    """Fetch and extract main article text from a URL."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=FETCH_TIMEOUT)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "lxml")

        # Remove noise
        for tag in soup(["script", "style", "nav", "header", "footer",
                          "aside", "form", "iframe", "figure"]):
            tag.decompose()

        # Try common article containers
        for selector in [
            "article", ".article-body", ".post-content",
            ".entry-content", ".story-body", "#article-body",
            ".content-area", "main"
        ]:
            el = soup.select_one(selector)
            if el:
                text = el.get_text(separator="\n", strip=True)
                if len(text) > 200:
                    return text[:8000]  # cap at ~8k chars for API cost control

        # Fallback: all paragraph text
        paras = [p.get_text(strip=True) for p in soup.find_all("p") if len(p.get_text(strip=True)) > 40]
        return "\n\n".join(paras[:30])

    except Exception as e:
        print(f"  [SCRAPER] Failed to fetch {url}: {e}")
        return ""


def fetch_new_articles() -> list[dict]:
    """
    Poll all RSS sources and return unprocessed articles as raw dicts.
    Each dict: {url, title, summary, source_name, lang, published_at, full_text}
    """
    new_articles = []

    for source in RSS_SOURCES:
        print(f"[SCRAPER] Checking {source['name']}...")
        try:
            feed = feedparser.parse(source["url"])
            entries = feed.entries[:15]  # only check latest 15 per source
        except Exception as e:
            print(f"  [SCRAPER] Feed error for {source['name']}: {e}")
            continue

        for entry in entries:
            url = getattr(entry, "link", "")
            if not url or is_url_processed(url):
                continue

            title = getattr(entry, "title", "").strip()
            summary = getattr(entry, "summary", "").strip()
            published_at = parse_rss_date(entry)

            print(f"  → New: {title[:60]}...")

            # Fetch full article text
            full_text = fetch_article_text(url)
            if not full_text and not summary:
                mark_url_processed(url)
                continue

            new_articles.append({
                "url":         url,
                "title":       title,
                "summary":     summary,
                "source_name": source["name"],
                "lang":        source["lang"],
                "published_at": published_at,
                "full_text":   full_text or summary,
            })
            mark_url_processed(url)

    print(f"[SCRAPER] Found {len(new_articles)} new articles")
    return new_articles
