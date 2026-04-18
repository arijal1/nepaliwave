import { notFound } from "next/navigation";
import Link from "next/link";
import {
  categories,
  getArticlesByCategory,
  Category,
} from "@/data/mockNews";
import NewsCard from "@/components/NewsCard";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.value }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = categories.find((c) => c.value === category);
  if (!cat) return {};
  return {
    title: `${cat.label} | NepaliWave`,
    description: `Latest ${cat.label} news from Nepal, independently told by NepaliWave.`,
  };
}

const categoryDescriptions: Record<string, string> = {
  politics: "Nepal's political landscape — parliament, parties, elections, and governance, independently covered.",
  business: "Nepal's economy, startups, markets, and remittance — the financial pulse of the nation.",
  sports: "Cricket, football, and beyond — Nepal's sporting heroes and their stories.",
  technology: "Innovation, AI, and the digital future taking shape in Nepal.",
  entertainment: "Nepali cinema, music, and culture — the stories that move us.",
  world: "Nepal on the global stage — international relations, Everest, and the diaspora.",
  health: "Public health, healthcare policy, and wellness news from across Nepal.",
};

const categoryBannerColors: Record<string, string> = {
  politics: "bg-red-700",
  business: "bg-blue-800",
  sports: "bg-green-700",
  technology: "bg-purple-700",
  entertainment: "bg-pink-700",
  world: "bg-teal-700",
  health: "bg-orange-700",
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = categories.find((c) => c.value === category);

  if (!cat) notFound();

  const catArticles = getArticlesByCategory(cat.value as Category);
  const bannerColor = categoryBannerColors[cat.value] ?? "bg-gray-700";
  const description = categoryDescriptions[cat.value] ?? "";

  return (
    <div>
      {/* Category header banner */}
      <div className={`${bannerColor} text-white py-10 px-4`}>
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-white/60 mb-3 flex items-center gap-2" style={{ fontFamily: "Arial, sans-serif" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white">{cat.label}</span>
          </nav>
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "Georgia, serif" }}>
            {cat.label}
          </h1>
          <p className="text-white/80 text-sm max-w-xl" style={{ fontFamily: "Arial, sans-serif" }}>
            {description}
          </p>
        </div>
      </div>

      {/* Articles grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Other categories quick nav */}
        <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-100" style={{ fontFamily: "Arial, sans-serif" }}>
          {categories
            .filter((c) => c.value !== cat.value)
            .map((c) => (
              <Link
                key={c.value}
                href={`/category/${c.value}`}
                className="text-xs font-semibold text-gray-600 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-[#c41230] hover:text-white hover:border-[#c41230] transition-colors"
              >
                {c.label}
              </Link>
            ))}
        </div>

        {catArticles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4" style={{ fontFamily: "Arial, sans-serif" }}>
              No articles in {cat.label} yet.
            </p>
            <Link href="/" className="text-[#c41230] font-bold hover:underline" style={{ fontFamily: "Arial, sans-serif" }}>
              ← Back to Home
            </Link>
          </div>
        ) : (
          <>
            {/* Top article (featured in category) */}
            {catArticles.length >= 1 && (
              <div className="mb-8">
                <div className="section-rule mb-4">
                  <h2 className="text-base font-bold uppercase tracking-wide mt-3" style={{ fontFamily: "Arial, sans-serif" }}>
                    Latest in {cat.label}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catArticles.map((article) => (
                    <NewsCard key={article.id} article={article} variant="default" />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Back to home */}
        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <Link
            href="/"
            className="text-sm font-bold text-[#c41230] hover:underline"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            ← Back to NepaliWave Home
          </Link>
        </div>
      </div>
    </div>
  );
}
