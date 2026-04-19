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
    <Link href={`/news/${article.slug}`} className="group block overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
      {/* Single container with explicit height — everything is positioned inside it */}
      <div style={{ position: "relative", aspectRatio: "16/9", maxHeight: "500px" }}>
        <Image
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-700 group-hover:scale-[1.03]"
          priority
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,22,40,0.97) 0%, rgba(10,22,40,0.6) 40%, rgba(10,22,40,0.15) 70%, transparent 100%)"
        }} />
        {/* Gold accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #E8A020, #14A8AE)" }} />

        {/* Content overlay — inside same container so bottom-0 works correctly */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem 2.5rem" }}>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-full ${cc}`} style={{ fontFamily: "Arial, sans-serif" }}>
              {article.category}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#E8A020", fontFamily: "Arial, sans-serif" }}>
              ★ Featured
            </span>
          </div>

          <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight mb-3 max-w-4xl group-hover:text-blue-100 transition-colors" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
            {article.title}
          </h1>

          <p className="text-blue-200 text-sm leading-relaxed mb-4 max-w-2xl line-clamp-2">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-5 text-xs" style={{ color: "#94A3B8", fontFamily: "Arial, sans-serif" }}>
            <span className="font-bold" style={{ color: "#E8A020" }}>{article.author}</span>
            <span>·</span>
            <span>{article.readTime} min read</span>
            <span>·</span>
            <span>{formatRelativeTime(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
