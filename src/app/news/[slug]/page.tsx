import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllArticles, getArticleBySlug, getRecentArticles } from "@/lib/articles";
import { formatDate } from "@/data/mockNews";
import NewsCard from "@/components/NewsCard";

export const revalidate = 300;

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllArticles(50).map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: `${article.title} | NepaliWave`, description: article.excerpt };
}

const catClass: Record<string, string> = {
  politics: "cat-politics", business: "cat-business", sports: "cat-sports",
  technology: "cat-technology", entertainment: "cat-entertainment",
  world: "cat-world", health: "cat-health",
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRecentArticles(article.id, 3);
  const cc = catClass[article.category] ?? "bg-gray-700";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" style={{ background: "var(--nw-bg)" }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── Article ── */}
        <article className="lg:col-span-2">
          {/* Breadcrumb */}
          <nav className="text-xs mb-4 flex items-center gap-2" style={{ color: "var(--nw-text-muted)", fontFamily: "Arial, sans-serif" }}>
            <Link href="/" className="hover:text-[#0D7377] transition-colors">Home</Link>
            <span>›</span>
            <Link href={`/category/${article.category}`} className="hover:text-[#0D7377] transition-colors capitalize">{article.category}</Link>
            <span>›</span>
            <span className="line-clamp-1">{article.title.substring(0, 50)}…</span>
          </nav>

          {/* Category + breaking */}
          <div className="flex items-center gap-3 mb-3">
            <Link href={`/category/${article.category}`}>
              <span className={`text-xs font-bold uppercase tracking-widest text-white px-2.5 py-1 rounded-full ${cc}`} style={{ fontFamily: "Arial, sans-serif" }}>
                {article.category}
              </span>
            </Link>
            {article.breaking && (
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1" style={{ color: "var(--nw-crimson)", fontFamily: "Arial, sans-serif" }}>
                <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ background: "var(--nw-crimson)" }} /> Breaking
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4" style={{ color: "var(--nw-text)" }}>
            {article.title}
          </h1>

          {/* Lead */}
          <p className="text-lg leading-relaxed mb-5 pl-4 italic" style={{ color: "var(--nw-text-muted)", borderLeft: "4px solid var(--nw-gold)" }}>
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm pb-4 mb-4" style={{ color: "var(--nw-text-muted)", borderBottom: "1px solid var(--nw-border)", fontFamily: "Arial, sans-serif" }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: "var(--nw-navy)" }}>
                {article.author.charAt(0)}
              </div>
              <span className="font-semibold" style={{ color: "var(--nw-text)" }}>{article.author}</span>
            </div>
            <span>·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span>·</span>
            <span>{article.readTime} min read</span>
            {article.source && <><span>·</span><span style={{ color: "var(--nw-teal)", fontWeight: 600 }}>{article.source}</span></>}
          </div>

          {/* Share */}
          <div className="flex items-center gap-3 mb-6" style={{ fontFamily: "Arial, sans-serif" }}>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--nw-text-muted)" }}>Share:</span>
            {["Facebook", "Twitter / X", "WhatsApp", "Copy Link"].map(p => (
              <button key={p} className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:shadow-md"
                style={{ border: "1px solid var(--nw-border)", color: "var(--nw-text-muted)", background: "white" }}>
                {p}
              </button>
            ))}
          </div>

          {/* Image */}
          {article.imageUrl && (
            <div className="rounded-xl overflow-hidden mb-6 shadow-md">
              <Image src={article.imageUrl} alt={article.imageAlt} width={800} height={450} className="w-full object-cover" priority />
              <p className="text-xs px-1 mt-2" style={{ color: "var(--nw-text-muted)", fontFamily: "Arial, sans-serif" }}>{article.imageAlt}</p>
            </div>
          )}

          {/* Body */}
          <div className="article-body">
            {article.body.map((para, i) => <p key={i}>{para}</p>)}
          </div>

          {/* NepaliWave Angle */}
          <div className="my-8 rounded-r-xl p-5" style={{ background: "#FFF8E8", borderLeft: "4px solid var(--nw-gold)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--nw-gold)", fontFamily: "Arial, sans-serif" }}>
              The NepaliWave Angle
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--nw-text)", fontFamily: "Arial, sans-serif" }}>
              NepaliWave brings you this story with independent editorial analysis — cutting through the headlines to tell you what it actually means for Nepal and Nepalis.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6" style={{ borderTop: "1px solid var(--nw-border)" }}>
            {article.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full cursor-pointer transition-colors hover:bg-gray-200"
                style={{ background: "var(--nw-bg)", color: "var(--nw-text-muted)", border: "1px solid var(--nw-border)", fontFamily: "Arial, sans-serif" }}>
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside className="lg:col-span-1">
          <div className="sticky top-4 space-y-8">
            {/* Newsletter */}
            <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #0F2044, #1A3A6E)", borderTop: "3px solid #E8A020" }}>
              <h3 className="font-bold text-base mb-2" style={{ fontFamily: "Georgia, serif" }}>Stay informed</h3>
              <p className="text-blue-200 text-xs leading-relaxed mb-3" style={{ fontFamily: "Arial, sans-serif" }}>
                Nepal's top stories in your inbox daily.
              </p>
              <input type="email" placeholder="your@email.com"
                className="w-full text-white text-xs px-3 py-2 rounded-lg border mb-2 focus:outline-none placeholder-blue-500"
                style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", fontFamily: "Arial, sans-serif" }} />
              <button className="w-full font-bold text-xs py-2 rounded-lg transition-all hover:opacity-90"
                style={{ background: "#E8A020", color: "#0F2044", fontFamily: "Arial, sans-serif" }}>
                Subscribe Free
              </button>
            </div>

            {/* Related */}
            <div>
              <div className="section-rule mb-4 pt-3">
                <h3 className="text-base font-bold uppercase tracking-wide heading-gold" style={{ fontFamily: "Arial, sans-serif" }}>Related Stories</h3>
              </div>
              <div className="space-y-3">
                {related.map(a => <NewsCard key={a.id} article={a} variant="horizontal" />)}
              </div>
            </div>

            {/* More in category */}
            <div className="rounded-xl p-4" style={{ background: "#EEF2F8" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--nw-navy)", fontFamily: "Arial, sans-serif" }}>
                More in {article.category}
              </p>
              <Link href={`/category/${article.category}`} className="text-sm font-bold hover:underline capitalize"
                style={{ color: "var(--nw-teal)", fontFamily: "Arial, sans-serif" }}>
                View all {article.category} stories →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
