import Link from "next/link";
import FeaturedArticle from "@/components/FeaturedArticle";
import NewsCard from "@/components/NewsCard";
import { categories } from "@/data/mockNews";
import {
  getAllArticles,
  getFeaturedArticle,
  getRecentArticles,
} from "@/lib/articles";

export const revalidate = 300; // ISR — revalidate every 5 minutes

export default function HomePage() {
  const featured  = getFeaturedArticle();
  const recent    = getRecentArticles(featured.id, 6);
  const topStories  = recent.slice(0, 3);
  const moreStories = recent.slice(3, 6);

  const politics  = getAllArticles(3, "politics").filter(a => a.id !== featured.id);
  const business  = getAllArticles(3, "business");
  const sports    = getAllArticles(3, "sports");
  const tech      = getAllArticles(3, "technology");
  const allRecent = getAllArticles(8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6" style={{ background: "var(--nw-bg)" }}>

      {/* ── Hero ── */}
      <section className="mb-8">
        <FeaturedArticle article={featured} />
      </section>

      {/* ── Top Stories + Most Read ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2">
          <div className="section-rule mb-4 pt-3">
            <h2 className="text-lg font-bold uppercase tracking-wide heading-gold" style={{ fontFamily: "Arial, sans-serif" }}>
              Top Stories
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topStories.map(a => <NewsCard key={a.id} article={a} variant="default" />)}
          </div>
        </div>

        <div>
          <div className="section-rule mb-4 pt-3">
            <h2 className="text-lg font-bold uppercase tracking-wide heading-gold" style={{ fontFamily: "Arial, sans-serif" }}>
              Most Read
            </h2>
          </div>
          {allRecent.map((a, i) => (
            <div key={a.id} className="flex gap-3 items-start py-3 border-b last:border-0" style={{ borderColor: "var(--nw-border)" }}>
              <span className="text-3xl font-bold leading-none w-8 shrink-0" style={{ color: "var(--nw-gold)", fontFamily: "Georgia, serif", opacity: 0.5 }}>
                {i + 1}
              </span>
              <div>
                <Link href={`/news/${a.slug}`} className="text-sm font-semibold leading-snug line-clamp-3 hover:text-[#0D7377] transition-colors" style={{ color: "var(--nw-text)" }}>
                  {a.title}
                </Link>
                <p className="text-[11px] mt-1" style={{ color: "var(--nw-text-muted)", fontFamily: "Arial, sans-serif" }}>
                  {a.readTime} min read
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── More Stories ── */}
      <section className="mb-10">
        <div className="section-rule mb-4 pt-3">
          <h2 className="text-lg font-bold uppercase tracking-wide heading-gold" style={{ fontFamily: "Arial, sans-serif" }}>
            More Stories
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {moreStories.map(a => <NewsCard key={a.id} article={a} variant="horizontal" />)}
        </div>
      </section>

      {/* ── Category sections ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        {[
          { label: "Politics",    slug: "politics",    list: politics },
          { label: "Business",   slug: "business",    list: business },
          { label: "Sports",     slug: "sports",      list: sports   },
          { label: "Technology", slug: "technology",  list: tech     },
        ].map(({ label, slug, list }) => (
          <section key={slug}>
            <div className="flex items-center justify-between section-rule pt-3 mb-4">
              <h2 className="text-lg font-bold uppercase tracking-wide heading-gold" style={{ fontFamily: "Arial, sans-serif" }}>
                {label}
              </h2>
              <Link href={`/category/${slug}`} className="text-xs font-bold hover:underline transition-colors" style={{ color: "var(--nw-teal)", fontFamily: "Arial, sans-serif" }}>
                More →
              </Link>
            </div>
            {list.length > 0
              ? list.map(a => <NewsCard key={a.id} article={a} variant="minimal" />)
              : <p className="text-sm" style={{ color: "var(--nw-text-muted)" }}>No articles yet.</p>
            }
          </section>
        ))}
      </div>

      {/* ── Browse categories ── */}
      <section className="rounded-2xl p-6 mb-8" style={{ background: "#EEF2F8" }}>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "var(--nw-navy)", fontFamily: "Arial, sans-serif" }}>
          Browse by Category
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <Link
              key={cat.value}
              href={`/category/${cat.value}`}
              className="px-4 py-2 bg-white rounded-full text-sm font-semibold transition-all hover:shadow-md capitalize"
              style={{ color: "var(--nw-navy)", border: "1px solid var(--nw-border)", fontFamily: "Arial, sans-serif" }}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── About banner ── */}
      <section
        className="rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 mb-4 text-white"
        style={{ background: "linear-gradient(135deg, #0F2044 0%, #1A3A6E 100%)", borderTop: "3px solid #E8A020" }}
      >
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "Georgia, serif" }}>
            What is <span style={{ color: "#E8A020" }}>NepaliWave</span>?
          </h2>
          <p className="text-blue-200 text-sm leading-relaxed max-w-xl" style={{ fontFamily: "Arial, sans-serif" }}>
            Nepal's first fully AI-powered news portal. We source stories from across Nepal's media landscape, summarise them, and add our independent editorial angle — the NepaliWave Twist. No spin. No agenda. Just Nepal, clearly told.
          </p>
        </div>
        <Link
          href="#"
          className="shrink-0 font-bold px-6 py-3 rounded-full transition-all hover:opacity-90"
          style={{ background: "#E8A020", color: "#0F2044", fontFamily: "Arial, sans-serif" }}
        >
          Learn More →
        </Link>
      </section>
    </div>
  );
}
