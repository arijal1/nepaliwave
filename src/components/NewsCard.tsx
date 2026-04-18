import Link from "next/link";
import Image from "next/image";
import { Article, formatRelativeTime } from "@/data/mockNews";

interface NewsCardProps {
  article: Article;
  variant?: "default" | "horizontal" | "minimal";
}

const catClass: Record<string, string> = {
  politics:      "cat-politics",
  business:      "cat-business",
  sports:        "cat-sports",
  technology:    "cat-technology",
  entertainment: "cat-entertainment",
  world:         "cat-world",
  health:        "cat-health",
};

export default function NewsCard({ article, variant = "default" }: NewsCardProps) {
  const cc = catClass[article.category] ?? "bg-gray-700";

  if (variant === "minimal") {
    return (
      <Link href={`/news/${article.slug}`} className="flex gap-3 group py-3 border-b last:border-0" style={{ borderColor: "var(--nw-border)" }}>
        <div className="flex-1 min-w-0">
          <span className={`text-[10px] font-bold uppercase tracking-wider text-white px-1.5 py-0.5 rounded ${cc} inline-block mb-1`} style={{ fontFamily: "Arial, sans-serif" }}>
            {article.category}
          </span>
          <h4 className="text-sm font-semibold leading-snug text-gray-900 group-hover:text-[#0D7377] transition-colors line-clamp-2">
            {article.title}
          </h4>
          <p className="text-[11px] mt-1" style={{ color: "var(--nw-text-muted)", fontFamily: "Arial, sans-serif" }}>
            {formatRelativeTime(article.publishedAt)}
          </p>
        </div>
        <div className="img-zoom w-20 h-16 shrink-0 rounded overflow-hidden bg-gray-100">
          <Image src={article.imageUrl} alt={article.imageAlt} width={80} height={64} className="w-full h-full object-cover" />
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/news/${article.slug}`} className="news-card flex gap-4 group bg-white rounded-lg overflow-hidden" style={{ border: "1px solid var(--nw-border)" }}>
        <div className="img-zoom w-36 shrink-0 h-28 bg-gray-100">
          <Image src={article.imageUrl} alt={article.imageAlt} width={144} height={112} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 py-3 pr-3 min-w-0">
          <span className={`text-[10px] font-bold uppercase tracking-wider text-white px-1.5 py-0.5 rounded ${cc} inline-block mb-1.5`} style={{ fontFamily: "Arial, sans-serif" }}>
            {article.category}
          </span>
          <h3 className="text-sm font-bold leading-snug text-gray-900 group-hover:text-[#0D7377] transition-colors line-clamp-3">
            {article.title}
          </h3>
          <p className="text-[11px] mt-2" style={{ color: "var(--nw-text-muted)", fontFamily: "Arial, sans-serif" }}>
            {article.author} · {formatRelativeTime(article.publishedAt)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/news/${article.slug}`} className="news-card group block bg-white rounded-xl overflow-hidden" style={{ border: "1px solid var(--nw-border)" }}>
      <div className="img-zoom aspect-video bg-gray-100">
        <Image src={article.imageUrl} alt={article.imageAlt} width={600} height={338} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider text-white px-1.5 py-0.5 rounded ${cc}`} style={{ fontFamily: "Arial, sans-serif" }}>
            {article.category}
          </span>
          {article.breaking && (
            <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1" style={{ color: "var(--nw-crimson)", fontFamily: "Arial, sans-serif" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: "var(--nw-crimson)" }} />
              Breaking
            </span>
          )}
        </div>
        <h3 className="font-bold text-base leading-snug mb-2 line-clamp-3 group-hover:text-[#0D7377] transition-colors" style={{ color: "var(--nw-text)" }}>
          {article.title}
        </h3>
        <p className="text-sm line-clamp-2 mb-3 leading-relaxed" style={{ color: "var(--nw-text-muted)" }}>
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-[11px]" style={{ color: "var(--nw-text-muted)", fontFamily: "Arial, sans-serif" }}>
          <span>{article.author}</span>
          <span>{article.readTime} min · {formatRelativeTime(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
