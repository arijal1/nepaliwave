import { getBreakingNews } from "@/data/mockNews";

export default function BreakingTicker() {
  const breaking = getBreakingNews();
  if (breaking.length === 0) return null;

  return (
    <div style={{
      display: "flex",
      alignItems: "stretch",
      background: "#C8102E",
      overflow: "hidden",
      fontFamily: "system-ui, -apple-system, Arial, sans-serif",
    }}>
      {/* Label */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 18px", background: "#A00C23",
        flexShrink: 0, borderRight: "3px solid #E8981D",
      }}>
        <span className="ticker-dot" />
        <span style={{
          fontSize: 11, fontWeight: 800, color: "white",
          letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap",
        }}>
          Breaking
        </span>
      </div>

      {/* Scrolling strip */}
      <div style={{ flex: 1, overflow: "hidden", padding: "8px 0", minWidth: 0 }}>
        <div className="ticker-track">
          {[...breaking, ...breaking].map((article, i) => (
            <a
              key={`${article.id}-${i}`}
              href={`/news/${article.slug}`}
              style={{
                color: "white", textDecoration: "none",
                fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <span style={{ color: "#F5B94A", marginRight: 8, fontSize: 9 }}>◆</span>
              {article.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
