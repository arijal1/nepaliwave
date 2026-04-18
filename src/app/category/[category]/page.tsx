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

const bannerGradients: Record<string, string> = {
  politics:      "linear-gradient(135deg, #7C1D2F, #A82B3F)",
  business:      "linear-gradient(135deg, #1E3A5F, #2D5A9E)",
  sports:        "linear-gradient(135deg, #14532D, #1E7A3F)",
  technology:    "linear-gradient(135deg, #3B1F6E, #5A2FA0)",
  entertainment: "linear-gradient(135deg, #6B1D5F, #9E2D8F)",
  world:         "linear-gradient(135deg, #0D4F52, #0D7377)",
  health:        "linear-gradient(135deg, #7C3410, #B04F1A)",
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = categories.find(c => c.value === category);
  if (!cat) notFound();

  const catArticles = getAllArticles(20, cat.value as Category);
  const gradient = bannerGradients[cat.value] ?? "linear-gradient(135deg, #0F2044, #1A3A6E)";

  return (
    <div>
      {/* Banner */}
      <div className="text-white py-12 px-4" style={{ background: gradient, borderBottom: "3px solid #E8A020" }}>
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs mb-3 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Arial, sans-serif" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white">{cat.label}</span>
          </nav>
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "Georgia, serif" }}>{cat.label}</h1>
          <p className="text-sm max-w-xl" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Arial, sans-serif" }}>
            {descriptions[cat.value]}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8" style={{ background: "var(--nw-bg)" }}>
        {/* Other category pills */}
        <div className="flex flex-wrap gap-2 mb-8 pb-6" style={{ borderBottom: "1px solid var(--nw-border)", fontFamily: "Arial, sans-serif" }}>
          {categories.filter(c => c.value !== cat.value).map(c => (
            <Link key={c.value} href={`/category/${c.value}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:shadow-md capitalize"
              style={{ border: "1px solid var(--nw-border)", color: "var(--nw-navy)", background: "white" }}>
              {c.label}
            </Link>
          ))}
        </div>

        {catArticles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg mb-4" style={{ color: "var(--nw-text-muted)", fontFamily: "Arial, sans-serif" }}>
              No articles in {cat.label} yet — check back soon.
            </p>
            <Link href="/" className="font-bold hover:underline" style={{ color: "var(--nw-teal)", fontFamily: "Arial, sans-serif" }}>
              ← Back to Home
            </Link>
          </div>
        ) : (
          <div>
            <div className="section-rule mb-4 pt-3">
              <h2 className="text-base font-bold uppercase tracking-wide heading-gold" style={{ fontFamily: "Arial, sans-serif" }}>
                Latest in {cat.label}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {catArticles.map(a => <NewsCard key={a.id} article={a} variant="default" />)}
            </div>
          </div>
        )}

        <div className="mt-10 pt-6 text-center" style={{ borderTop: "1px solid var(--nw-border)" }}>
          <Link href="/" className="text-sm font-bold hover:underline" style={{ color: "var(--nw-teal)", fontFamily: "Arial, sans-serif" }}>
            ← Back to NepaliWave Home
          </Link>
        </div>
      </div>
    </div>
  );
}
