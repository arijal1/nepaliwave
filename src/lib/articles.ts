/**
 * Unified article data source.
 * Uses SQLite (live data) when available, falls back to mock data.
 */
import { Article, articles as mockArticles } from "@/data/mockNews";
import { dbArticlesExist, getArticles, getArticleBySlug as dbGetBySlug, getFeatured, getBreaking, DbArticle } from "@/lib/db";

function dbToArticle(row: DbArticle): Article {
  return {
    id:          String(row.id),
    slug:        row.slug,
    title:       row.title,
    excerpt:     row.excerpt,
    body:        JSON.parse(row.body || "[]"),
    category:    row.category as Article["category"],
    author:      row.author,
    publishedAt: row.published_at,
    readTime:    Math.max(3, Math.ceil((JSON.parse(row.body || "[]") as string[]).join(" ").split(" ").length / 200)),
    imageUrl:    row.image_url || "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    imageAlt:    row.image_alt || row.title,
    tags:        JSON.parse(row.tags || "[]"),
    featured:    row.featured === 1,
    breaking:    row.breaking === 1,
    source:      row.source_name,
  };
}

function useLive(): boolean {
  try { return dbArticlesExist(); } catch { return false; }
}

export function getAllArticles(limit = 20, category?: string): Article[] {
  if (useLive()) return getArticles(limit, category).map(dbToArticle);
  return category
    ? mockArticles.filter(a => a.category === category).slice(0, limit)
    : mockArticles.slice(0, limit);
}

export function getFeaturedArticle(): Article {
  if (useLive()) {
    const row = getFeatured();
    if (row) return dbToArticle(row);
  }
  return mockArticles.find(a => a.featured) ?? mockArticles[0];
}

export function getArticleBySlug(slug: string): Article | undefined {
  if (useLive()) {
    const row = dbGetBySlug(slug);
    if (row) return dbToArticle(row);
  }
  return mockArticles.find(a => a.slug === slug);
}

export function getBreakingArticles(): Article[] {
  if (useLive()) return getBreaking().map(dbToArticle);
  return mockArticles.filter(a => a.breaking);
}

export function getRecentArticles(excludeId?: string, limit = 6): Article[] {
  return getAllArticles(limit + 1)
    .filter(a => a.id !== excludeId)
    .slice(0, limit);
}
