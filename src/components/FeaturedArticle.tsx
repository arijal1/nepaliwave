import Link from "next/link";
import Image from "next/image";
import { Article, formatRelativeTime } from "@/data/mockNews";

const catClass: Record<string, string> = {
  politics:      "cat-politics",
  business:      "cat-business",
  sports:        "cat-sports",
  technology:    "cat-technology",
  entertainment: "cat-entertainment",
  world:         "cat-world",
  health:        "cat-health",
};

export default function FeaturedArticle({ article }: { article: Article }) {
  const cc = catClass[article.category] ?? "bg-gray-700";

  return (
    <Link href={`/news/${article.slug}`} className="group block relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        <Image
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          priority
        />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(10,22,40,0.97) 0%, rgba(10,22,40,0.6) 40%, rgba(10,22,40,0.15) 70%, transparent 100%)"
        }} />
        {/* Gold top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #E8A020, #14A8AE)" }} />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-full ${cc}`} style={{ fontFamily: "Arial, sans-serif" }}>
            {article.category}
          </span>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#E8A020", fontFamily: "Arial, sans-serif" }}>
            ★ Featured
          </span>
        </div>

        <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-4xl group-hover:text-blue-100 transition-colors" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
          {article.title}
        </h1>

        <p className="text-blue-200 text-sm md:text-base leading-relaxed mb-5 max-w-2xl line-clamp-2 md:line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-5 text-xs" style={{ color: "#94A3B8", fontFamily: "Arial, sans-serif" }}>
          <span className="font-bold" style={{ color: "#E8A020" }}>{article.author}</span>
          <span>·</span>
          <span>{article.readTime} min read</span>
          <span>·</span>
          <span>{formatRelativeTime(article.publishedAt)}</span>
          <div
            className="ml-auto px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"
            style={{ background: "#E8A020", color: "#0F2044" }}
          >
            Read Story →
          </div>
        </div>
      </div>
    </Link>
  );
}
