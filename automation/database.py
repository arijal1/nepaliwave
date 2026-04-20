"""SQLite database operations for NepaliWave automation."""
import sqlite3
import json
from datetime import datetime
from pathlib import Path
from config import DB_PATH


def get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    """Create tables if they don't exist."""
    with get_conn() as conn:
        conn.executescript("""
        CREATE TABLE IF NOT EXISTS articles (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            slug            TEXT    UNIQUE NOT NULL,
            title           TEXT    NOT NULL,
            excerpt         TEXT,
            body            TEXT,           -- JSON array of paragraphs
            category        TEXT,
            author          TEXT    DEFAULT 'NepaliWave AI',
            published_at    TEXT    NOT NULL,
            image_url       TEXT,
            image_alt       TEXT,
            tags            TEXT    DEFAULT '[]',
            source_url      TEXT    UNIQUE,
            source_name     TEXT,
            featured        INTEGER DEFAULT 0,
            breaking        INTEGER DEFAULT 0,
            facebook_posted INTEGER DEFAULT 0,
            twitter_posted  INTEGER DEFAULT 0,
            created_at      TEXT    DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS processed_urls (
            url         TEXT PRIMARY KEY,
            processed_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS run_log (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            ran_at      TEXT DEFAULT (datetime('now')),
            articles_found    INTEGER DEFAULT 0,
            articles_saved    INTEGER DEFAULT 0,
            facebook_posts    INTEGER DEFAULT 0,
            twitter_posts     INTEGER DEFAULT 0,
            errors            TEXT
        );
        """)
    print(f"[DB] Initialised at {DB_PATH}")


def is_url_processed(url: str) -> bool:
    with get_conn() as conn:
        row = conn.execute("SELECT 1 FROM processed_urls WHERE url = ?", (url,)).fetchone()
        return row is not None


def mark_url_processed(url: str):
    with get_conn() as conn:
        conn.execute(
            "INSERT OR IGNORE INTO processed_urls (url) VALUES (?)", (url,)
        )


def save_article(article: dict) -> int | None:
    """Insert article. Returns new row id or None if duplicate slug."""
    try:
        with get_conn() as conn:
            cur = conn.execute("""
                INSERT INTO articles
                    (slug, title, excerpt, body, category, author,
                     published_at, image_url, image_alt, tags,
                     source_url, source_name, featured, breaking)
                VALUES
                    (:slug, :title, :excerpt, :body, :category, :author,
                     :published_at, :image_url, :image_alt, :tags,
                     :source_url, :source_name, :featured, :breaking)
            """, {
                **article,
                "body": json.dumps(article.get("body", [])),
                "tags": json.dumps(article.get("tags", [])),
            })
            return cur.lastrowid
    except sqlite3.IntegrityError:
        return None


def get_unposted_articles(platform: str, limit: int = 5) -> list[dict]:
    col = f"{platform}_posted"
    with get_conn() as conn:
        rows = conn.execute(
            f"SELECT * FROM articles WHERE {col} = 0 ORDER BY published_at DESC LIMIT ?",
            (limit,)
        ).fetchall()
    return [dict(r) for r in rows]


def mark_posted(article_id: int, platform: str):
    col = f"{platform}_posted"
    with get_conn() as conn:
        conn.execute(f"UPDATE articles SET {col} = 1 WHERE id = ?", (article_id,))


def get_recent_articles(limit: int = 20, category: str | None = None) -> list[dict]:
    with get_conn() as conn:
        if category:
            rows = conn.execute(
                "SELECT * FROM articles WHERE category = ? ORDER BY published_at DESC LIMIT ?",
                (category, limit)
            ).fetchall()
        else:
            rows = conn.execute(
                "SELECT * FROM articles ORDER BY published_at DESC LIMIT ?",
                (limit,)
            ).fetchall()
    result = []
    for r in rows:
        d = dict(r)
        d["body"] = json.loads(d.get("body") or "[]")
        d["tags"] = json.loads(d.get("tags") or "[]")
        result.append(d)
    return result


def set_featured_article(article_id: int):
    """Mark one article as featured, clear featured flag on all others."""
    with get_conn() as conn:
        conn.execute("UPDATE articles SET featured = 0")
        conn.execute("UPDATE articles SET featured = 1 WHERE id = ?", (article_id,))


def log_run(stats: dict):
    with get_conn() as conn:
        conn.execute("""
            INSERT INTO run_log (articles_found, articles_saved, facebook_posts, twitter_posts, errors)
            VALUES (:articles_found, :articles_saved, :facebook_posts, :twitter_posts, :errors)
        """, stats)
