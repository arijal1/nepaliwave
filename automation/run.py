#!/usr/bin/env python3
"""
NepaliWave automation runner.
Fetches latest Nepali news, rewrites with Claude AI,
saves to database, posts to social media.

Usage:
  python run.py               # run once
  python run.py --daemon      # run every 2 hours continuously
"""
import sys
import time
import argparse
from datetime import datetime

from database import init_db, save_article, get_unposted_articles, mark_posted, log_run, set_featured_article
from scraper import fetch_new_topics
from ai_rewriter import write_article
from social import post_to_facebook, post_to_x
from config import MAX_ARTICLES_PER_RUN, SOCIAL_POST_INTERVAL


def run_once() -> dict:
    stats = {
        "articles_found":  0,
        "articles_saved":  0,
        "facebook_posts":  0,
        "twitter_posts":   0,
        "errors":          "",
    }
    errors = []
    print(f"\n{'='*55}")
    print(f"  NepaliWave Run — {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*55}")

    # ── 1. Scrape RSS feeds ───────────────────────────────
    topics = fetch_new_topics()
    stats["articles_found"] = len(topics)

    if not topics:
        print("[RUN] No new topics found.")
        log_run(stats)
        return stats

    # Limit per run to control API costs
    topics = topics[:MAX_ARTICLES_PER_RUN]
    print(f"[RUN] Writing {len(topics)} original articles (max {MAX_ARTICLES_PER_RUN}/run)")

    # ── 2. Write original articles with Claude AI ─────────
    saved_ids = []
    for i, topic in enumerate(topics, 1):
        print(f"\n[RUN] Article {i}/{len(topics)}: {topic['title'][:60]}...")
        article = write_article(topic)
        if not article:
            errors.append(f"AI failed: {topic['url']}")
            continue

        article_id = save_article(article)
        if article_id:
            print(f"  [DB] Saved: {article['title'][:60]} (id={article_id})")
            stats["articles_saved"] += 1
            saved_ids.append(article_id)
        else:
            print(f"  [DB] Duplicate slug, skipped.")

        # Small delay between Claude calls
        if i < len(topics):
            time.sleep(2)

    # ── 3. Mark one article as featured on homepage ──────
    if saved_ids:
        set_featured_article(saved_ids[0])
        print(f"[RUN] Featured article id={saved_ids[0]}")

    # ── 4. Post to social media ───────────────────────────
    print(f"\n[RUN] Posting to social media...")
    unposted = get_unposted_articles("facebook", limit=5)

    for article in unposted:
        # Facebook
        if post_to_facebook(article):
            mark_posted(article["id"], "facebook")
            stats["facebook_posts"] += 1
            time.sleep(SOCIAL_POST_INTERVAL)

        # X
        if post_to_x(article):
            mark_posted(article["id"], "twitter")
            stats["twitter_posts"] += 1
            time.sleep(5)

    stats["errors"] = "; ".join(errors) if errors else ""
    log_run(stats)

    print(f"\n{'='*55}")
    print(f"  Done. Saved: {stats['articles_saved']} | FB: {stats['facebook_posts']} | X: {stats['twitter_posts']}")
    print(f"{'='*55}\n")
    return stats


def run_daemon(interval_hours: float = 2.0):
    """Run continuously every N hours."""
    print(f"[DAEMON] Starting — will run every {interval_hours}h")
    while True:
        try:
            run_once()
        except Exception as e:
            print(f"[DAEMON] Unexpected error: {e}")
        print(f"[DAEMON] Sleeping {interval_hours}h...")
        time.sleep(interval_hours * 3600)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="NepaliWave automation runner")
    parser.add_argument("--daemon", action="store_true", help="Run continuously every 2 hours")
    parser.add_argument("--interval", type=float, default=2.0, help="Daemon interval in hours (default: 2)")
    args = parser.parse_args()

    init_db()

    if args.daemon:
        run_daemon(args.interval)
    else:
        run_once()
