import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "nepaliwave.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH, { readonly: true });
    _db.pragma("journal_mode = WAL");
  }
  return _db;
}

export function dbArticlesExist(): boolean {
  try {
    const db = getDb();
    const row = db.prepare("SELECT COUNT(*) as n FROM articles").get() as { n: number };
    return row.n > 0;
  } catch {
    return false;
  }
}

export interface DbArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author: string;
  published_at: string;
  image_url: string;
  image_alt: string;
  tags: string;
  source_url: string;
  source_name: string;
  featured: number;
  breaking: number;
}

export function getArticles(limit = 20, category?: string): DbArticle[] {
  const db = getDb();
  if (category) {
    return db
      .prepare("SELECT * FROM articles WHERE category = ? ORDER BY published_at DESC LIMIT ?")
      .all(category, limit) as DbArticle[];
  }
  return db
    .prepare("SELECT * FROM articles ORDER BY published_at DESC LIMIT ?")
    .all(limit) as DbArticle[];
}

export function getArticleBySlug(slug: string): DbArticle | null {
  const db = getDb();
  return (
    db.prepare("SELECT * FROM articles WHERE slug = ?").get(slug) as DbArticle | undefined
  ) ?? null;
}

export function getFeatured(): DbArticle | null {
  const db = getDb();
  return (
    db.prepare("SELECT * FROM articles WHERE featured = 1 ORDER BY published_at DESC LIMIT 1").get() as DbArticle | undefined
    ?? db.prepare("SELECT * FROM articles ORDER BY published_at DESC LIMIT 1").get() as DbArticle | undefined
  ) ?? null;
}

export function getBreaking(): DbArticle[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM articles WHERE breaking = 1 ORDER BY published_at DESC LIMIT 5")
    .all() as DbArticle[];
}
