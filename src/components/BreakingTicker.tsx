"use client";

import { useRef, useEffect } from "react";
import { getBreakingNews } from "@/data/mockNews";

export default function BreakingTicker() {
  const breaking = getBreakingNews();
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef   = useRef(0);
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const tick = () => {
      posRef.current -= 0.6;
      if (Math.abs(posRef.current) >= el.scrollWidth / 2) {
        posRef.current = 0;
      }
      el.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (breaking.length === 0) return null;

  return (
    <div style={{
      display: "flex", alignItems: "stretch",
      background: "#C8102E", overflow: "hidden",
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

      {/* Scrolling track — JS-animated via requestAnimationFrame */}
      <div style={{ flex: 1, overflow: "hidden", padding: "8px 0", minWidth: 0 }}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "48px",
            whiteSpace: "nowrap",
            width: "max-content",
            willChange: "transform",
          }}
        >
          {[...breaking, ...breaking].map((article, i) => (
            <a
              key={`${article.id}-${i}`}
              href={`/news/${article.slug}`}
              style={{
                color: "white", textDecoration: "none",
                fontSize: 13, fontWeight: 600,
                display: "inline-flex", alignItems: "center", gap: 8,
                whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              <span style={{ color: "#F5B94A", fontSize: 9, flexShrink: 0 }}>◆</span>
              {article.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
