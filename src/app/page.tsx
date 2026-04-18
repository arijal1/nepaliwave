import Link from "next/link";
import FeaturedArticle from "@/components/FeaturedArticle";
import NewsCard from "@/components/NewsCard";
import {
  articles,
  categories,
  getFeaturedArticle,
  getArticlesByCategory,
  getRecentArticles,
} from "@/data/mockNews";

export default function HomePage() {
  const featured = getFeaturedArticle();
  const recent = getRecentArticles(featured.id, 6);
  const topStories = recent.slice(0, 3);
  const moreStories = recent.slice(3, 6);

  const politicsArticles = getArticlesByCategory("politics").filter((a) => a.id !== featured.id);
  const businessArticles = getArticlesByCategory("business");
  const sportsArticles = getArticlesByCategory("sports");
  const techArticles = getArticlesByCategory("technology");

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* ── Hero section ── */}
      <section className="mb-8">
        <FeaturedArticle article={featured} />
      </section>

      {/* ── Top Stories + Sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Main 2/3 */}
        <div className="lg:col-span-2">
          <div className="section-rule mb-4">
            <h2 className="text-lg font-bold mt-3 uppercase tracking-wide text-[#1a1a1a]" style={{ fontFamily: "Arial, sans-serif" }}>
              Top Stories
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topStories.map((article) => (
              <NewsCard key={article.id} article={article} variant="default" />
            ))}
          </div>
        </div>

        {/* Sidebar 1/3 */}
        <div>
          <div className="section-rule mb-4">
            <h2 className="text-lg font-bold mt-3 uppercase tracking-wide text-[#1a1a1a]" style={{ fontFamily: "Arial, sans-serif" }}>
              Most Read
            </h2>
          </div>
          <div>
            {articles.map((article, i) => (
              <div key={article.id} className="flex gap-3 items-start py-3 border-b border-gray-100 last:border-0">
                <span className="text-3xl font-bold text-gray-200 leading-none w-8 shrink-0" style={{ fontFamily: "Georgia, serif" }}>
                  {i + 1}
                </span>
                <div>
                  <Link href={`/news/${article.slug}`} className="text-sm font-semibold text-gray-900 hover:text-[#c41230] transition-colors leading-snug line-clamp-3">
                    {article.title}
                  </Link>
                  <p className="text-[11px] text-gray-400 mt-1" style={{ fontFamily: "Arial, sans-serif" }}>
                    {article.readTime} min read
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── More Stories (horizontal cards) ── */}
      <section className="mb-10">
        <div className="section-rule mb-4">
          <h2 className="text-lg font-bold mt-3 uppercase tracking-wide" style={{ fontFamily: "Arial, sans-serif" }}>
            More Stories
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {moreStories.map((article) => (
            <NewsCard key={article.id} article={article} variant="horizontal" />
          ))}
        </div>
      </section>

      {/* ── Category sections ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">

        {/* Politics */}
        <section>
          <div className="flex items-center justify-between mb-4 section-rule pt-3">
            <h2 className="text-lg font-bold uppercase tracking-wide" style={{ fontFamily: "Arial, sans-serif" }}>
              Politics
            </h2>
            <Link href="/category/politics" className="text-xs text-[#c41230] font-bold hover:underline" style={{ fontFamily: "Arial, sans-serif" }}>
              More →
            </Link>
          </div>
          {politicsArticles.length > 0 ? (
            <div className="space-y-0">
              {politicsArticles.slice(0, 3).map((article) => (
                <NewsCard key={article.id} article={article} variant="minimal" />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No articles yet.</p>
          )}
        </section>

        {/* Business */}
        <section>
          <div className="flex items-center justify-between mb-4 section-rule pt-3">
            <h2 className="text-lg font-bold uppercase tracking-wide" style={{ fontFamily: "Arial, sans-serif" }}>
              Business
            </h2>
            <Link href="/category/business" className="text-xs text-[#c41230] font-bold hover:underline" style={{ fontFamily: "Arial, sans-serif" }}>
              More →
            </Link>
          </div>
          <div className="space-y-0">
            {businessArticles.slice(0, 3).map((article) => (
              <NewsCard key={article.id} article={article} variant="minimal" />
            ))}
          </div>
        </section>

        {/* Sports */}
        <section>
          <div className="flex items-center justify-between mb-4 section-rule pt-3">
            <h2 className="text-lg font-bold uppercase tracking-wide" style={{ fontFamily: "Arial, sans-serif" }}>
              Sports
            </h2>
            <Link href="/category/sports" className="text-xs text-[#c41230] font-bold hover:underline" style={{ fontFamily: "Arial, sans-serif" }}>
              More →
            </Link>
          </div>
          <div className="space-y-0">
            {sportsArticles.slice(0, 3).map((article) => (
              <NewsCard key={article.id} article={article} variant="minimal" />
            ))}
          </div>
        </section>

        {/* Technology */}
        <section>
          <div className="flex items-center justify-between mb-4 section-rule pt-3">
            <h2 className="text-lg font-bold uppercase tracking-wide" style={{ fontFamily: "Arial, sans-serif" }}>
              Technology
            </h2>
            <Link href="/category/technology" className="text-xs text-[#c41230] font-bold hover:underline" style={{ fontFamily: "Arial, sans-serif" }}>
              More →
            </Link>
          </div>
          <div className="space-y-0">
            {techArticles.slice(0, 3).map((article) => (
              <NewsCard key={article.id} article={article} variant="minimal" />
            ))}
          </div>
        </section>
      </div>

      {/* ── Category browse strip ── */}
      <section className="bg-[#f8f8f8] rounded-lg p-6 mb-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4" style={{ fontFamily: "Arial, sans-serif" }}>
          Browse by Category
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={`/category/${cat.value}`}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:bg-[#c41230] hover:text-white hover:border-[#c41230] transition-colors capitalize"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── About NepaliWave banner ── */}
      <section className="bg-[#003893] text-white rounded-lg p-8 flex flex-col md:flex-row items-center gap-6 mb-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "Georgia, serif" }}>
            What is NepaliWave?
          </h2>
          <p className="text-blue-200 text-sm leading-relaxed max-w-xl" style={{ fontFamily: "Arial, sans-serif" }}>
            NepaliWave is Nepal's first fully AI-powered news portal. We source stories from across Nepal's media landscape, summarise them, and add our independent editorial angle — the NepaliWave Twist. No spin. No agenda. Just Nepal, clearly told.
          </p>
        </div>
        <div className="shrink-0">
          <Link
            href="#"
            className="block bg-[#c41230] hover:bg-[#9a0e24] text-white font-bold px-6 py-3 rounded transition-colors"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Learn More →
          </Link>
        </div>
      </section>
    </div>
  );
}
