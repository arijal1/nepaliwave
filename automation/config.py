"""
Central config — all secrets loaded from /var/www/nepaliwave/.env
Never commit real keys. Copy .env.example to .env and fill in values.
"""
import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from app root
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

# ── Anthropic / Claude ──────────────────────────
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")

# ── Facebook ─────────────────────────────────────
# Get from: developers.facebook.com → your app → Page Access Token
FACEBOOK_PAGE_ID    = os.getenv("FACEBOOK_PAGE_ID", "")
FACEBOOK_PAGE_TOKEN = os.getenv("FACEBOOK_PAGE_TOKEN", "")

# ── X (Twitter) ──────────────────────────────────
# Get from: developer.twitter.com → your app → Keys & Tokens
X_API_KEY            = os.getenv("X_API_KEY", "")
X_API_SECRET         = os.getenv("X_API_SECRET", "")
X_ACCESS_TOKEN       = os.getenv("X_ACCESS_TOKEN", "")
X_ACCESS_TOKEN_SECRET= os.getenv("X_ACCESS_TOKEN_SECRET", "")
X_BEARER_TOKEN       = os.getenv("X_BEARER_TOKEN", "")

# ── Database ──────────────────────────────────────
DB_PATH = Path(__file__).parent.parent / "nepaliwave.db"

# ── Site ─────────────────────────────────────────
SITE_URL = os.getenv("SITE_URL", "https://nepaliwave.anuprijal.com.np")

# ── RSS Sources ───────────────────────────────────
RSS_SOURCES = [
    {"name": "Onlinekhabar",  "url": "https://www.onlinekhabar.com/feed",                    "lang": "ne"},
    {"name": "Setopati",      "url": "https://www.setopati.com/feed",                         "lang": "ne"},
    {"name": "Ratopati",      "url": "https://ratopati.com/feed",                             "lang": "ne"},
    {"name": "Republica",     "url": "https://myrepublica.nagariknetwork.com/feed",           "lang": "en"},
    {"name": "Kantipur",      "url": "https://ekantipur.com/rss",                            "lang": "ne"},
    {"name": "The Himalayan", "url": "https://thehimalayantimes.com/feed",                   "lang": "en"},
]

# How many articles to process per run (keeps Claude API costs low)
MAX_ARTICLES_PER_RUN = 10

# Minimum gap between posts to same social platform (seconds)
SOCIAL_POST_INTERVAL = 300  # 5 minutes
