import Link from "next/link";
import Image from "next/image";
import { Article, formatRelativeTime } from "@/data/mockNews";

interface NewsCardProps {
  article: Article;
  variant?: "default" | "horizontal" | "minimal";
}

const catColors: Record<string, string> = {
  politics:      "#7C1D2F",
  business:      "#1E3A5F",
  sports:        "#14532D",
  technology:    "#3B1F6E",
  entertainment: "#6B1D5F",
  world:         "#0D4F52",
  health:        "#7C3410",
};

const CategoryBadge = ({ category }: { category: string }) => (
  <span style={{
    fontSize: 10, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.07em",
    color: "white", background: catColors[category] ?? "#374151",
    padding: "2px 7px", borderRadius: 3, fontFamily: "Arial, sans-serif",
    display: "inline-block",
  }}>
    {category}
  </span>
);

export default function NewsCard({ article, variant = "default" }: NewsCardProps) {
  if (variant === "minimal") {
    return (
      <Link href={`/news/${article.slug}`} className="nw-card-minimal" style={{
        display: "flex", alignItems: "flex-start", gap: 12,
        padding: "12px 0", borderBottom: "1px solid #E5E7EB",
        textDecoration: "none",
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 5 }}>
            <CategoryBadge category={article.category} />
          </div>
          <h4 style={{
            fontSize: 13, fontWeight: 600, lineHeight: 1.45, color: "#111827",
            margin: 0, overflow: "hidden", display: "-webkit-box",
            WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          }}>
            {article.title}
          </h4>
          <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4, fontFamily: "Arial, sans-serif" }}>
            {formatRelativeTime(article.publishedAt)}
          </p>
        </div>
        <div style={{
          width: 72, height: 56, flexShrink: 0, borderRadius: 6,
          overflow: "hidden", background: "#F3F4F6", position: "relative",
        }}>
          <Image src={article.imageUrl} alt={article.imageAlt} fill style={{ objectFit: "cover" }} />
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/news/${article.slug}`} className="nw-card" style={{
        display: "flex", background: "white", borderRadius: 10, overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05)",
        textDecoration: "none",
      }}>
        <div style={{ width: 140, height: 110, flexShrink: 0, overflow: "hidden", position: "relative" }}>
          <Image src={article.imageUrl} alt={article.imageAlt} fill style={{ objectFit: "cover", transition: "transform 0.4s" }} />
        </div>
        <div style={{
          flex: 1, padding: "12px 14px", minWidth: 0,
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{ marginBottom: 6 }}>
            <CategoryBadge category={article.category} />
          </div>
          <h3 style={{
            fontSize: 13, fontWeight: 700, lineHeight: 1.45, color: "#111827", margin: 0,
            overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
          }}>
            {article.title}
          </h3>
          <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 8, fontFamily: "Arial, sans-serif" }}>
            {article.author} · {formatRelativeTime(article.publishedAt)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/news/${article.slug}`} className="nw-card" style={{
      display: "block", background: "white", borderRadius: 12, overflow: "hidden",
      boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05)",
      textDecoration: "none",
    }}>
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "#F3F4F6" }}>
        <Image
          src={article.imageUrl} alt={article.imageAlt} fill
          style={{ objectFit: "cover", transition: "transform 0.45s ease" }}
        />
        {article.breaking && (
          <div style={{
            position: "absolute", top: 10, left: 10,
            background: "#C41230", color: "white", fontSize: 10, fontWeight: "bold",
            padding: "3px 8px", borderRadius: 3, fontFamily: "Arial, sans-serif",
            display: "flex", alignItems: "center", gap: 4,
            textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            <span className="animate-pulse" style={{ width: 5, height: 5, borderRadius: "50%", background: "white", display: "block" }} />
            Breaking
          </div>
        )}
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ marginBottom: 8 }}>
          <CategoryBadge category={article.category} />
        </div>
        <h3 style={{
          fontSize: 15, fontWeight: 700, lineHeight: 1.4, color: "#111827",
          margin: "0 0 8px", overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
        }}>
          {article.title}
        </h3>
        <p style={{
          fontSize: 13, lineHeight: 1.55, color: "#6B7280", margin: "0 0 12px",
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        }}>
          {article.excerpt}
        </p>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontSize: 11, color: "#9CA3AF", fontFamily: "Arial, sans-serif",
        }}>
          <span style={{ fontWeight: 600, color: "#6B7280" }}>{article.author}</span>
          <span>{article.readTime} min · {formatRelativeTime(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
