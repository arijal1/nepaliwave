import Link from "next/link";
import Image from "next/image";
import { Article, formatRelativeTime } from "@/data/mockNews";

interface FeaturedArticleProps {
  article: Article;
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

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const catColor = categoryColors[article.category] ?? "bg-gray-700";

  return (
    <Link href={`/news/${article.slug}`} className="group block relative overflow-hidden rounded-lg bg-gray-900">
      {/* Background image */}
      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        <Image
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-xs font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded ${catColor}`} style={{ fontFamily: "Arial, sans-serif" }}>
            {article.category}
          </span>
          <span className="text-xs text-gray-300 font-semibold" style={{ fontFamily: "Arial, sans-serif" }}>
            Featured
          </span>
        </div>

        <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3 max-w-3xl group-hover:text-gray-100 transition-colors">
          {article.title}
        </h1>

        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 max-w-2xl line-clamp-2 md:line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-400" style={{ fontFamily: "Arial, sans-serif" }}>
          <span className="font-semibold text-gray-300">{article.author}</span>
          <span>·</span>
          <span>{article.readTime} min read</span>
          <span>·</span>
          <span>{formatRelativeTime(article.publishedAt)}</span>
        </div>
      </div>

      {/* Read more caret */}
      <div className="absolute top-4 right-4 bg-[#c41230] text-white text-xs font-bold px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "Arial, sans-serif" }}>
        Read more →
      </div>
    </Link>
  );
}
