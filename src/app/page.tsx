import Link from "next/link";
import FeaturedArticle from "@/components/FeaturedArticle";
import NewsCard from "@/components/NewsCard";
import AdUnit from "@/components/AdUnit";
import { categories } from "@/data/mockNews";
import {
  getAllArticles,
  getFeaturedArticle,
  getRecentArticles,
} from "@/lib/articles";

export const revalidate = 300;

function SectionHead({ title, href }: { title: string; href?: string }) {
  return (
    <div style={{
      borderTop: "3px solid #E8A020", paddingTop: 12, marginBottom: 18,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <h2 style={{
        fontSize: 14, fontWeight: "bold", textTransform: "uppercase",
        letterSpacing: "0.1em", color: "#0F2044", fontFamily: "Arial, sans-serif", margin: 0,
      }}>
        {title}
      </h2>
      {href && (
        <Link href={href} style={{ fontSize: 12, fontWeight: "bold", color: "#0D7377", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>
          More →
        </Link>
      )}
    </div>
  );
}

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
    <div style={{ background: "#F8F7F4" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 16px" }}>

        {/* ── Hero ── */}
        <section style={{ marginBottom: 32 }}>
          <FeaturedArticle article={featured} />
        </section>

        <AdUnit slot="1234567890" format="horizontal" style={{ minHeight: 90, marginBottom: 32 }} />

        {/* ── Top Stories + Most Read ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" style={{ marginBottom: 40 }}>

          <div className="lg:col-span-2">
            <SectionHead title="Top Stories" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {topStories.map(a => <NewsCard key={a.id} article={a} variant="default" />)}
            </div>
          </div>

          <div>
            <SectionHead title="Most Read" />
            {allRecent.map((a, i) => (
              <div key={a.id} style={{
                display: "flex", gap: 12, alignItems: "flex-start",
                padding: "12px 0", borderBottom: "1px solid #E5E7EB",
              }}>
                <span style={{
                  fontSize: 26, fontWeight: "bold", lineHeight: 1,
                  color: "#E8A020", opacity: 0.45, width: 28, flexShrink: 0,
                  fontFamily: "Georgia, serif",
                }}>
                  {i + 1}
                </span>
                <div>
                  <Link href={`/news/${a.slug}`} style={{
                    fontSize: 13, fontWeight: 600, lineHeight: 1.45, color: "#111827",
                    textDecoration: "none", display: "-webkit-box", overflow: "hidden",
                    WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
                  }}>
                    {a.title}
                  </Link>
                  <p style={{ fontSize: 11, marginTop: 4, color: "#9CA3AF", fontFamily: "Arial, sans-serif" }}>
                    {a.readTime} min read
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AdUnit slot="0987654321" format="auto" style={{ minHeight: 90, marginBottom: 40 }} />

        {/* ── More Stories ── */}
        <section style={{ marginBottom: 40 }}>
          <SectionHead title="More Stories" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {moreStories.map(a => <NewsCard key={a.id} article={a} variant="horizontal" />)}
          </div>
        </section>

        {/* ── Category sections ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10" style={{ marginBottom: 40 }}>
          {[
            { label: "Politics",    slug: "politics",   list: politics },
            { label: "Business",   slug: "business",   list: business },
            { label: "Sports",     slug: "sports",     list: sports   },
            { label: "Technology", slug: "technology", list: tech     },
          ].map(({ label, slug, list }) => (
            <section key={slug}>
              <SectionHead title={label} href={`/category/${slug}`} />
              {list.length > 0
                ? list.map(a => <NewsCard key={a.id} article={a} variant="minimal" />)
                : <p style={{ fontSize: 13, color: "#9CA3AF" }}>No articles yet.</p>
              }
            </section>
          ))}
        </div>

        {/* ── Browse categories ── */}
        <section style={{ background: "#EEF2F8", borderRadius: 16, padding: "24px 28px", marginBottom: 32 }}>
          <h2 style={{
            fontSize: 11, fontWeight: "bold", textTransform: "uppercase",
            letterSpacing: "0.15em", color: "#0F2044", fontFamily: "Arial, sans-serif", marginBottom: 16,
          }}>
            Browse by Category
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {categories.map(cat => (
              <Link key={cat.value} href={`/category/${cat.value}`} className="category-pill" style={{
                padding: "8px 18px", background: "white", borderRadius: 50,
                fontSize: 13, fontWeight: 600, color: "#0F2044",
                textDecoration: "none", textTransform: "capitalize",
                fontFamily: "Arial, sans-serif", border: "1px solid #E5E7EB",
              }}>
                {cat.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ── About banner ── */}
        <section style={{
          background: "linear-gradient(135deg, #0F2044 0%, #1A3A6E 100%)",
          borderRadius: 16, padding: "32px", borderTop: "3px solid #E8A020",
          display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24,
        }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <h2 style={{ fontSize: 22, fontWeight: "bold", color: "white", fontFamily: "Georgia, serif", margin: "0 0 10px" }}>
              What is <span style={{ color: "#E8A020" }}>NepaliWave</span>?
            </h2>
            <p style={{ fontSize: 14, color: "#94A3C8", lineHeight: 1.7, maxWidth: 560, margin: 0, fontFamily: "Arial, sans-serif" }}>
              Nepal's first fully AI-powered news portal. We source stories from across Nepal's media landscape, summarise them, and add our independent editorial angle — the NepaliWave Twist. No spin. No agenda.
            </p>
          </div>
          <Link href="#" style={{
            flexShrink: 0, background: "#E8A020", color: "#0F2044",
            fontWeight: "bold", padding: "12px 26px", borderRadius: 50,
            textDecoration: "none", fontSize: 14, fontFamily: "Arial, sans-serif",
          }}>
            Learn More →
          </Link>
        </section>

      </div>
    </div>
  );
}
