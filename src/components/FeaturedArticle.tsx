import Link from "next/link";
import Image from "next/image";
import { Article, formatRelativeTime } from "@/data/mockNews";

const catColors: Record<string, string> = {
  politics:      "#991B1B",
  business:      "#1E3A5F",
  sports:        "#14532D",
  technology:    "#4C1D95",
  entertainment: "#831843",
  world:         "#134E4A",
  health:        "#7C2D12",
};

export default function FeaturedArticle({ article }: { article: Article }) {
  const catColor = catColors[article.category] ?? "#374151";

  return (
    <Link href={`/news/${article.slug}`} style={{ display: "block", textDecoration: "none" }}>
      <div style={{
        position: "relative", aspectRatio: "16/9", maxHeight: 520,
        borderRadius: 16, overflow: "hidden", background: "#111",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <Image
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
          priority
        />

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,10,20,0.97) 0%, rgba(5,10,20,0.65) 40%, rgba(5,10,20,0.1) 75%, transparent 100%)",
        }} />

        {/* Top accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 4,
          background: "linear-gradient(90deg, #C8102E, #E8981D)",
        }} />

        {/* Content */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "clamp(20px, 4vw, 40px) clamp(20px, 4vw, 44px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{
              background: catColor, color: "white",
              fontSize: 10, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.08em", padding: "3px 10px", borderRadius: 4,
              fontFamily: "system-ui, Arial, sans-serif",
            }}>
              {article.category}
            </span>
            <span style={{
              fontSize: 11, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.1em", color: "#E8981D",
              fontFamily: "system-ui, Arial, sans-serif",
            }}>
              ★ Featured
            </span>
          </div>

          <h1 style={{
            color: "white", fontFamily: "Georgia, serif",
            fontSize: "clamp(20px, 3.5vw, 40px)",
            fontWeight: 700, lineHeight: 1.25,
            margin: "0 0 12px", maxWidth: 760,
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}>
            {article.title}
          </h1>

          <p style={{
            color: "rgba(203,213,225,0.9)", fontSize: "clamp(13px, 1.5vw, 15px)",
            lineHeight: 1.6, marginBottom: 20, maxWidth: 600,
            overflow: "hidden", display: "-webkit-box",
            WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          }}>
            {article.excerpt}
          </p>

          <div style={{
            display: "flex", alignItems: "center", gap: 16,
            fontSize: 12, color: "#94A3B8",
            fontFamily: "system-ui, Arial, sans-serif",
          }}>
            <span style={{ fontWeight: 700, color: "#E8981D" }}>{article.author}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{article.readTime} min read</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{formatRelativeTime(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
