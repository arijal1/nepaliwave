import Link from "next/link";
import Image from "next/image";
import { Article, formatRelativeTime } from "@/data/mockNews";

interface NewsCardProps {
  article: Article;
  variant?: "default" | "horizontal" | "minimal";
}

const categoryColors: Record<string, string> = {
  politics: "bg-red-700",
  business: "bg-blue-800",
  sports: "bg-green-700",
  technology: "bg-purple-700",
  entertainment: "bg-pink-700",
  world: "bg-teal-700",
  health: "bg-orange-700",
};

export default function NewsCard({ article, variant = "default" }: NewsCardProps) {
  const catColor = categoryColors[article.category] ?? "bg-gray-700";

  if (variant === "minimal") {
    return (
      <Link href={`/news/${article.slug}`} className="flex gap-3 group py-3 border-b border-gray-100 last:border-0">
        <div className="flex-1 min-w-0">
          <span className={`text-[10px] font-bold uppercase tracking-wider text-white px-1.5 py-0.5 rounded ${catColor} inline-block mb-1`} style={{ fontFamily: "Arial, sans-serif" }}>
            {article.category}
          </span>
          <h4 className="text-sm font-semibold leading-snug text-gray-900 group-hover:text-[#c41230] transition-colors line-clamp-2">
            {article.title}
          </h4>
          <p className="text-[11px] text-gray-500 mt-1" style={{ fontFamily: "Arial, sans-serif" }}>
            {formatRelativeTime(article.publishedAt)}
          </p>
        </div>
        <div className="img-zoom w-20 h-16 shrink-0 rounded overflow-hidden bg-gray-100">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            width={80}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/news/${article.slug}`} className="news-card flex gap-4 group bg-white rounded overflow-hidden">
        <div className="img-zoom w-36 shrink-0 h-28 bg-gray-100">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            width={144}
            height={112}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 py-2 pr-2 min-w-0">
          <span className={`text-[10px] font-bold uppercase tracking-wider text-white px-1.5 py-0.5 rounded ${catColor} inline-block mb-1.5`} style={{ fontFamily: "Arial, sans-serif" }}>
            {article.category}
          </span>
          <h3 className="text-sm font-bold leading-snug text-gray-900 group-hover:text-[#c41230] transition-colors line-clamp-3">
            {article.title}
          </h3>
          <p className="text-[11px] text-gray-500 mt-2" style={{ fontFamily: "Arial, sans-serif" }}>
            {article.author} · {formatRelativeTime(article.publishedAt)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/news/${article.slug}`} className="news-card group block bg-white rounded overflow-hidden border border-gray-100">
      <div className="img-zoom aspect-video bg-gray-100">
        <Image
          src={article.imageUrl}
          alt={article.imageAlt}
          width={600}
          height={338}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider text-white px-1.5 py-0.5 rounded ${catColor}`} style={{ fontFamily: "Arial, sans-serif" }}>
            {article.category}
          </span>
          {article.breaking && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#c41230] flex items-center gap-1" style={{ fontFamily: "Arial, sans-serif" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c41230] animate-pulse inline-block" />
              Breaking
            </span>
          )}
        </div>
        <h3 className="font-bold text-base leading-snug text-gray-900 group-hover:text-[#c41230] transition-colors mb-2 line-clamp-3">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-[11px] text-gray-400" style={{ fontFamily: "Arial, sans-serif" }}>
          <span>{article.author}</span>
          <span>{article.readTime} min read · {formatRelativeTime(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
