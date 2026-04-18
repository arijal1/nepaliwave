"""
Social media posting — Facebook Page and X (Twitter).
"""
import requests
import tweepy
from config import (
    FACEBOOK_PAGE_ID, FACEBOOK_PAGE_TOKEN,
    X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET,
    SITE_URL,
)


# ── Facebook ─────────────────────────────────────────────────────────────────

def post_to_facebook(article: dict) -> bool:
    """Post article link to Facebook Page."""
    if not FACEBOOK_PAGE_ID or not FACEBOOK_PAGE_TOKEN:
        print("  [FB] Skipped — no credentials configured")
        return False

    article_url = f"{SITE_URL}/news/{article['slug']}"
    message = (
        f"{article['title']}\n\n"
        f"{article['excerpt']}\n\n"
        f"Read more: {article_url}\n\n"
        f"#{' #'.join(article.get('tags', [])[:3])}"
    )

    try:
        resp = requests.post(
            f"https://graph.facebook.com/v19.0/{FACEBOOK_PAGE_ID}/feed",
            data={
                "message": message,
                "link":    article_url,
                "access_token": FACEBOOK_PAGE_TOKEN,
            },
            timeout=15,
        )
        resp.raise_for_status()
        post_id = resp.json().get("id", "unknown")
        print(f"  [FB] Posted: {post_id}")
        return True
    except requests.HTTPError as e:
        print(f"  [FB] Error: {e.response.text}")
        return False
    except Exception as e:
        print(f"  [FB] Error: {e}")
        return False


# ── X (Twitter) ──────────────────────────────────────────────────────────────

def _get_x_client():
    if not all([X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET]):
        return None
    return tweepy.Client(
        consumer_key=X_API_KEY,
        consumer_secret=X_API_SECRET,
        access_token=X_ACCESS_TOKEN,
        access_token_secret=X_ACCESS_TOKEN_SECRET,
    )


def post_to_x(article: dict) -> bool:
    """Post article to X (Twitter)."""
    client = _get_x_client()
    if not client:
        print("  [X] Skipped — no credentials configured")
        return False

    article_url = f"{SITE_URL}/news/{article['slug']}"

    # Build tweet — max 280 chars
    tags = " ".join(f"#{t.replace(' ', '')}" for t in article.get("tags", [])[:3])
    tweet = f"{article['title']}\n\n{article_url}\n\n{tags}"
    if len(tweet) > 280:
        # Trim title to fit
        max_title = 280 - len(f"\n\n{article_url}\n\n{tags}") - 3
        tweet = f"{article['title'][:max_title]}...\n\n{article_url}\n\n{tags}"

    try:
        response = client.create_tweet(text=tweet)
        tweet_id = response.data["id"]
        print(f"  [X] Posted: {tweet_id}")
        return True
    except tweepy.TweepyException as e:
        print(f"  [X] Error: {e}")
        return False
    except Exception as e:
        print(f"  [X] Error: {e}")
        return False
