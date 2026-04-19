import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllArticles, getArticleBySlug, getRecentArticles } from "@/lib/articles";
import { formatDate } from "@/data/mockNews";
import AdUnit from "@/components/AdUnit";
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

const catColors: Record<string, string> = {
  politics: "#991B1B", business: "#1E3A5F", sports: "#14532D",
  technology: "#4C1D95", entertainment: "#831843", world: "#134E4A", health: "#7C2D12",
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRecentArticles(article.id, 3);
  const catColor = catColors[article.category] ?? "#374151";

  return (
    <div style={{ background: "#F4F5F7", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 16px 48px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Article ── */}
          <article className="lg:col-span-2" style={{ background: "white", borderRadius: 16, padding: "clamp(20px,4vw,40px)", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>

            {/* Breadcrumb */}
            <nav style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 12, color: "#9CA3AF", marginBottom: 20,
              fontFamily: "system-ui, Arial, sans-serif", flexWrap: "wrap",
            }}>
              <Link href="/" style={{ color: "#9CA3AF", textDecoration: "none" }}>Home</Link>
              <span>›</span>
              <Link href={`/category/${article.category}`} style={{ color: "#9CA3AF", textDecoration: "none", textTransform: "capitalize" }}>
                {article.category}
              </Link>
              <span>›</span>
              <span style={{ color: "#6B7280", overflow: "hidden", whiteSpace: "nowrap", maxWidth: 200, textOverflow: "ellipsis" }}>
                {article.title.substring(0, 48)}…
              </span>
            </nav>

            {/* Category + breaking */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
              <Link href={`/category/${article.category}`} style={{ textDecoration: "none" }}>
                <span style={{
                  background: catColor, color: "white",
                  fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.08em", padding: "3px 10px", borderRadius: 4,
                  fontFamily: "system-ui, Arial, sans-serif",
                }}>
                  {article.category}
                </span>
              </Link>
              {article.breaking && (
                <span style={{
                  display: "flex", alignItems: "center", gap: 5,
                  fontSize: 11, fontWeight: 700, color: "#C8102E",
                  fontFamily: "system-ui, Arial, sans-serif",
                }}>
                  <span className="ticker-dot" style={{ background: "#C8102E", width: 6, height: 6 }} />
                  Breaking News
                </span>
              )}
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(22px, 4vw, 36px)",
              fontWeight: 700, lineHeight: 1.25,
              color: "#111827", margin: "0 0 18px",
            }}>
              {article.title}
            </h1>

            {/* Lead / excerpt */}
            <p style={{
              fontSize: 17, lineHeight: 1.7, color: "#4B5563",
              padding: "14px 0 14px 18px",
              borderLeft: "4px solid #E8981D",
              fontStyle: "italic", margin: "0 0 24px",
              fontFamily: "Georgia, serif",
            }}>
              {article.excerpt}
            </p>

            {/* Meta */}
            <div style={{
              display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12,
              paddingBottom: 20, marginBottom: 20,
              borderBottom: "1px solid #E5E7EB",
              fontSize: 13, color: "#6B7280",
              fontFamily: "system-ui, Arial, sans-serif",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "#C8102E", display: "flex", alignItems: "center",
                  justifyContent: "center", color: "white", fontSize: 13, fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {article.author.charAt(0)}
                </div>
                <span style={{ fontWeight: 600, color: "#111827" }}>{article.author}</span>
              </div>
              <span style={{ color: "#D1D5DB" }}>·</span>
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              <span style={{ color: "#D1D5DB" }}>·</span>
              <span>{article.readTime} min read</span>
              {article.source && (
                <>
                  <span style={{ color: "#D1D5DB" }}>·</span>
                  <span style={{ color: "#0EA5E9", fontWeight: 600 }}>{article.source}</span>
                </>
              )}
            </div>

            {/* Share */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 28, flexWrap: "wrap",
              fontFamily: "system-ui, Arial, sans-serif",
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Share:
              </span>
              {["Facebook", "Twitter", "WhatsApp", "Copy Link"].map(p => (
                <button key={p} style={{
                  fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 50,
                  border: "1px solid #E5E7EB", color: "#6B7280", background: "white",
                  cursor: "pointer", fontFamily: "inherit",
                }}>
                  {p}
                </button>
              ))}
            </div>

            {/* Image */}
            {article.imageUrl && (
              <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 28, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
                <Image
                  src={article.imageUrl} alt={article.imageAlt}
                  width={800} height={450}
                  style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                  priority
                />
                <p style={{
                  fontSize: 11, color: "#9CA3AF", padding: "8px 12px",
                  fontFamily: "system-ui, Arial, sans-serif", background: "#F9FAFB",
                  margin: 0,
                }}>
                  {article.imageAlt}
                </p>
              </div>
            )}

            {/* Body */}
            <div className="article-body">
              {article.body.map((para, i) => (
                <>
                  <p key={i}>{para}</p>
                  {i === 2 && (
                    <AdUnit key="mid-ad" slot="1122334455" format="rectangle" className="my-6" style={{ minHeight: 250 }} />
                  )}
                </>
              ))}
            </div>

            {/* NepaliWave Angle */}
            <div style={{
              margin: "32px 0", padding: "20px 24px", borderRadius: 12,
              background: "#FFFBEB", borderLeft: "4px solid #E8981D",
            }}>
              <p style={{
                fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.12em", color: "#E8981D",
                fontFamily: "system-ui, Arial, sans-serif", marginBottom: 8,
              }}>
                The NepaliWave Angle
              </p>
              <p style={{
                fontSize: 14, lineHeight: 1.7, color: "#374151",
                fontFamily: "system-ui, Arial, sans-serif", margin: 0,
              }}>
                NepaliWave brings you this story with independent editorial analysis — cutting through the headlines to tell you what it actually means for Nepal and Nepalis.
              </p>
            </div>

            {/* Tags */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 8,
              paddingTop: 24, marginTop: 24, borderTop: "1px solid #E5E7EB",
            }}>
              {article.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 12, padding: "5px 12px", borderRadius: 50,
                  background: "#F3F4F6", color: "#6B7280",
                  border: "1px solid #E5E7EB",
                  fontFamily: "system-ui, Arial, sans-serif",
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-1">
            <div style={{ position: "sticky", top: 80, display: "flex", flexDirection: "column", gap: 28 }}>

              {/* Newsletter */}
              <div style={{
                background: "#111827", borderRadius: 14, padding: 24,
                borderTop: "3px solid #E8981D",
              }}>
                <h3 style={{
                  fontFamily: "Georgia, serif", color: "white",
                  fontSize: 17, fontWeight: 700, margin: "0 0 8px",
                }}>
                  Stay informed
                </h3>
                <p style={{
                  color: "#94A3B8", fontSize: 13, lineHeight: 1.6, marginBottom: 16,
                  fontFamily: "system-ui, Arial, sans-serif",
                }}>
                  Nepal's top stories in your inbox daily.
                </p>
                <input type="email" placeholder="your@email.com" style={{
                  width: "100%", background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)", borderRadius: 8,
                  padding: "10px 14px", color: "#F1F5F9", fontSize: 13,
                  outline: "none", fontFamily: "system-ui, Arial, sans-serif",
                  marginBottom: 8, boxSizing: "border-box",
                }} />
                <button style={{
                  width: "100%", background: "#C8102E", color: "white",
                  fontWeight: 700, padding: "11px 0", borderRadius: 8,
                  border: "none", cursor: "pointer", fontSize: 13,
                  fontFamily: "system-ui, Arial, sans-serif",
                }}>
                  Subscribe Free
                </button>
              </div>

              {/* Related */}
              <div>
                <div style={{ borderTop: "3px solid #C8102E", paddingTop: 14, marginBottom: 18 }}>
                  <h3 style={{
                    fontSize: 13, fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.1em", color: "#111827",
                    fontFamily: "system-ui, Arial, sans-serif", margin: 0,
                  }}>
                    Related Stories
                  </h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {related.map(a => <NewsCard key={a.id} article={a} variant="horizontal" />)}
                </div>
              </div>

              <AdUnit slot="5544332211" format="vertical" style={{ minHeight: 250 }} />

              {/* More in category */}
              <div style={{
                background: "white", borderRadius: 12, padding: 20,
                border: "1px solid #E5E7EB",
              }}>
                <p style={{
                  fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.12em", color: "#6B7280",
                  fontFamily: "system-ui, Arial, sans-serif", marginBottom: 12,
                }}>
                  More in {article.category}
                </p>
                <Link href={`/category/${article.category}`} style={{
                  color: "#C8102E", fontWeight: 700, textDecoration: "none",
                  fontSize: 14, textTransform: "capitalize",
                  fontFamily: "system-ui, Arial, sans-serif",
                }}>
                  View all {article.category} stories →
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
