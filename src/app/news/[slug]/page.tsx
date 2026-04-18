import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  articles,
  getArticleBySlug,
  getRecentArticles,
  formatDate,
} from "@/data/mockNews";
import NewsCard from "@/components/NewsCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | NepaliWave`,
    description: article.excerpt,
  };
}

const categoryColors: Record<string, string> = {
  politics: "bg-red-700",
  business: "bg-blue-800",
  sports: "bg-green-700",
  technology: "bg-purple-700",
  entertainment: "bg-pink-700",
  world: "bg-teal-700",
  health: "bg-orange-700",
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const related = getRecentArticles(article.id, 3);
  const catColor = categoryColors[article.category] ?? "bg-gray-700";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ── Article main ── */}
        <article className="lg:col-span-2">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-500 mb-4 flex items-center gap-2" style={{ fontFamily: "Arial, sans-serif" }}>
            <Link href="/" className="hover:text-[#c41230] transition-colors">Home</Link>
            <span>›</span>
            <Link href={`/category/${article.category}`} className="hover:text-[#c41230] transition-colors capitalize">
              {article.category}
            </Link>
            <span>›</span>
            <span className="text-gray-400 line-clamp-1">{article.title.substring(0, 50)}…</span>
          </nav>

          {/* Category badge */}
          <div className="mb-3">
            <Link href={`/category/${article.category}`}>
              <span className={`text-xs font-bold uppercase tracking-widest text-white px-2 py-1 rounded ${catColor}`} style={{ fontFamily: "Arial, sans-serif" }}>
                {article.category}
              </span>
            </Link>
            {article.breaking && (
              <span className="ml-3 text-xs font-bold uppercase tracking-wider text-[#c41230] flex items-center gap-1 inline-flex" style={{ fontFamily: "Arial, sans-serif" }}>
                <span className="w-2 h-2 rounded-full bg-[#c41230] animate-pulse inline-block" />
                Breaking
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold leading-tight text-gray-900 mb-4">
            {article.title}
          </h1>

          {/* Nepali title */}
          {article.nepaliTitle && (
            <p className="text-gray-600 text-lg mb-4 font-medium">{article.nepaliTitle}</p>
          )}

          {/* Excerpt / lead */}
          <p className="text-gray-600 text-lg leading-relaxed mb-5 border-l-4 border-[#c41230] pl-4 italic">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-200" style={{ fontFamily: "Arial, sans-serif" }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#c41230] flex items-center justify-center text-white text-sm font-bold">
                {article.author.charAt(0)}
              </div>
              <span className="font-semibold text-gray-800">{article.author}</span>
            </div>
            <span>·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span>·</span>
            <span>{article.readTime} min read</span>
            {article.source && (
              <>
                <span>·</span>
                <span className="text-[#c41230] font-semibold">{article.source}</span>
              </>
            )}
          </div>

          {/* Share bar */}
          <div className="flex items-center gap-3 mb-6" style={{ fontFamily: "Arial, sans-serif" }}>
            <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Share:</span>
            {["Facebook", "Twitter / X", "WhatsApp", "Copy Link"].map((platform) => (
              <button
                key={platform}
                className="text-xs font-semibold text-gray-600 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-[#c41230] hover:text-white hover:border-[#c41230] transition-colors"
              >
                {platform}
              </button>
            ))}
          </div>

          {/* Hero image */}
          <div className="rounded-lg overflow-hidden mb-6">
            <Image
              src={article.imageUrl}
              alt={article.imageAlt}
              width={800}
              height={450}
              className="w-full object-cover"
              priority
            />
            <p className="text-xs text-gray-500 mt-2 px-1" style={{ fontFamily: "Arial, sans-serif" }}>
              {article.imageAlt}
            </p>
          </div>

          {/* Article body */}
          <div className="article-body">
            {article.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* NepaliWave Twist callout */}
          <div className="my-8 bg-[#fff4f4] border-l-4 border-[#c41230] rounded-r-lg p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#c41230] mb-2" style={{ fontFamily: "Arial, sans-serif" }}>
              The NepaliWave Angle
            </p>
            <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "Arial, sans-serif" }}>
              NepaliWave brings you this story with independent editorial analysis — cutting through the headlines to tell you what it actually means for Nepal and Nepalis. Our AI sources, summarises, and our editors add the NepaliWave twist.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside className="lg:col-span-1">
          <div className="sticky top-4 space-y-8">
            {/* Newsletter CTA */}
            <div className="bg-[#003893] text-white rounded-lg p-5">
              <h3 className="font-bold text-base mb-2" style={{ fontFamily: "Georgia, serif" }}>
                Stay informed
              </h3>
              <p className="text-blue-200 text-xs leading-relaxed mb-3" style={{ fontFamily: "Arial, sans-serif" }}>
                Get the NepaliWave daily digest — Nepal's top stories, independently told.
              </p>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-blue-900 text-white text-xs px-3 py-2 rounded border border-blue-700 focus:outline-none focus:border-white mb-2 placeholder-blue-400"
                style={{ fontFamily: "Arial, sans-serif" }}
              />
              <button className="w-full bg-[#c41230] hover:bg-[#9a0e24] text-white text-xs font-bold py-2 rounded transition-colors" style={{ fontFamily: "Arial, sans-serif" }}>
                Subscribe Free
              </button>
            </div>

            {/* Related articles */}
            <div>
              <div className="section-rule mb-4">
                <h3 className="text-base font-bold uppercase tracking-wide mt-3" style={{ fontFamily: "Arial, sans-serif" }}>
                  Related Stories
                </h3>
              </div>
              <div className="space-y-3">
                {related.map((a) => (
                  <NewsCard key={a.id} article={a} variant="horizontal" />
                ))}
              </div>
            </div>

            {/* Category quick links */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3" style={{ fontFamily: "Arial, sans-serif" }}>
                More in {article.category}
              </h3>
              <Link
                href={`/category/${article.category}`}
                className="block text-sm font-bold text-[#c41230] hover:underline capitalize"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                View all {article.category} stories →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
