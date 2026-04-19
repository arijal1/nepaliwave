import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, Category } from "@/data/mockNews";
import { getAllArticles } from "@/lib/articles";
import NewsCard from "@/components/NewsCard";

export const revalidate = 300;

interface Props { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  return categories.map(c => ({ category: c.value }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = categories.find(c => c.value === category);
  if (!cat) return {};
  return {
    title: `${cat.label} | NepaliWave`,
    description: `Latest ${cat.label} news from Nepal, independently told by NepaliWave.`,
  };
}

const descriptions: Record<string, string> = {
  politics:      "Nepal's political landscape — parliament, parties, elections, and governance.",
  business:      "Nepal's economy, startups, markets, and remittance — the financial pulse of the nation.",
  sports:        "Cricket, football, and beyond — Nepal's sporting heroes and their stories.",
  technology:    "Innovation, AI, and the digital future taking shape in Nepal.",
  entertainment: "Nepali cinema, music, and culture — the stories that move us.",
  world:         "Nepal on the global stage — international relations, Everest, and the diaspora.",
  health:        "Public health, healthcare policy, and wellness news from across Nepal.",
};

const catAccents: Record<string, string> = {
  politics:      "#991B1B",
  business:      "#1E3A5F",
  sports:        "#14532D",
  technology:    "#4C1D95",
  entertainment: "#831843",
  world:         "#134E4A",
  health:        "#7C2D12",
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = categories.find(c => c.value === category);
  if (!cat) notFound();

  const catArticles = getAllArticles(20, cat.value as Category);
  const accent = catAccents[cat.value] ?? "#111827";

  return (
    <div style={{ background: "#F4F5F7", minHeight: "100vh" }}>

      {/* Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${accent} 0%, #111827 100%)`,
        borderBottom: "3px solid #E8981D",
        padding: "40px 16px 36px",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <nav style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 12, color: "rgba(255,255,255,0.55)",
            fontFamily: "system-ui, Arial, sans-serif", marginBottom: 14,
          }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Home</Link>
            <span>›</span>
            <span style={{ color: "white" }}>{cat.label}</span>
          </nav>
          <h1 style={{
            color: "white", fontFamily: "Georgia, serif",
            fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700,
            margin: "0 0 10px", textTransform: "capitalize",
          }}>
            {cat.label}
          </h1>
          <p style={{
            color: "rgba(203,213,225,0.85)", fontSize: 14,
            maxWidth: 560, lineHeight: 1.65, margin: 0,
            fontFamily: "system-ui, Arial, sans-serif",
          }}>
            {descriptions[cat.value]}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 16px" }}>

        {/* Other category pills */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8,
          marginBottom: 32, paddingBottom: 28,
          borderBottom: "1px solid #E5E7EB",
        }}>
          {categories.filter(c => c.value !== cat.value).map(c => (
            <Link key={c.value} href={`/category/${c.value}`} className="category-pill" style={{
              fontSize: 12, fontWeight: 600, padding: "6px 16px", borderRadius: 50,
              border: "1px solid #E5E7EB", color: "#374151", background: "white",
              textDecoration: "none", textTransform: "capitalize",
              fontFamily: "system-ui, Arial, sans-serif",
            }}>
              {c.label}
            </Link>
          ))}
        </div>

        {catArticles.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <p style={{ color: "#6B7280", fontSize: 16, marginBottom: 20 }}>
              No articles in {cat.label} yet — check back soon.
            </p>
            <Link href="/" style={{
              color: "#C8102E", fontWeight: 700, textDecoration: "none",
              fontFamily: "system-ui, Arial, sans-serif",
            }}>
              ← Back to Home
            </Link>
          </div>
        ) : (
          <>
            <div style={{
              borderTop: "3px solid #C8102E", paddingTop: 14, marginBottom: 24,
            }}>
              <h2 style={{
                fontSize: 14, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.1em", color: "#111827",
                fontFamily: "system-ui, Arial, sans-serif", margin: 0,
              }}>
                Latest in {cat.label}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {catArticles.map(a => <NewsCard key={a.id} article={a} variant="default" />)}
            </div>
          </>
        )}

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #E5E7EB", textAlign: "center" }}>
          <Link href="/" style={{
            color: "#C8102E", fontWeight: 700, textDecoration: "none",
            fontSize: 14, fontFamily: "system-ui, Arial, sans-serif",
          }}>
            ← Back to NepaliWave Home
          </Link>
        </div>
      </div>
    </div>
  );
}
