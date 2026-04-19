"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { categories } from "@/data/mockNews";
import Logo from "@/components/Logo";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50, width: "100%",
      background: "#111827",
      borderBottom: scrolled ? "2px solid #C8102E" : "2px solid #E8981D",
      boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.2)",
      transition: "box-shadow 0.3s, border-color 0.3s",
    }}>

      {/* ── Brand bar ── */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: `${scrolled ? 6 : 12}px 16px`,
        transition: "padding 0.3s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12,
      }}>
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <Logo size={isMobile || scrolled ? "sm" : "md"} variant="full" />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!isMobile && (
            <div style={{
              display: "flex", alignItems: "center", gap: 5,
              background: "#C8102E", padding: "4px 10px", borderRadius: 4,
              fontSize: 11, fontWeight: 800, color: "white",
              fontFamily: "system-ui, Arial, sans-serif", userSelect: "none",
              letterSpacing: "0.06em",
            }}>
              <span className="ticker-dot" style={{ width: 6, height: 6 }} />
              LIVE
            </div>
          )}

          {/* Search */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => { setSearchOpen(v => !v); setMenuOpen(false); }}
              aria-label="Search"
              style={{
                width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                background: searchOpen ? "rgba(255,255,255,0.15)" : "transparent",
                border: "none", borderRadius: "50%", cursor: "pointer", color: "white",
              }}
            >
              <svg width={17} height={17} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {searchOpen && (
              <div style={{
                ...(isMobile
                  ? { position: "fixed", top: 60, left: 12, right: 12, width: "auto" }
                  : { position: "absolute", right: 0, top: 44, width: 290 }),
                background: "white", borderRadius: 12, zIndex: 200,
                boxShadow: "0 16px 48px rgba(0,0,0,0.22)", overflow: "hidden",
              }}>
                <input
                  autoFocus type="text" id="site-search" name="q"
                  placeholder="Search NepaliWave…"
                  style={{
                    width: "100%", padding: "14px 16px", fontSize: 14,
                    color: "#111", outline: "none", border: "none",
                    fontFamily: "system-ui, Arial, sans-serif", boxSizing: "border-box",
                  }}
                />
                <div style={{ padding: "8px 16px", background: "#f7f7f7", borderTop: "1px solid #eee" }}>
                  <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>Press Enter to search</p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => { setMenuOpen(v => !v); setSearchOpen(false); }}
              aria-label="Menu"
              style={{
                width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                background: menuOpen ? "rgba(255,255,255,0.15)" : "transparent",
                border: "none", borderRadius: "50%", cursor: "pointer", color: "white",
              }}
            >
              <svg width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Desktop category nav ── */}
      {!isMobile && (
        <nav style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px", overflowX: "auto" }}>
            <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
              <li>
                <Link href="/" style={{
                  display: "block", padding: "8px 14px", fontSize: 12, fontWeight: 700,
                  color: "#E8981D", textDecoration: "none", borderBottom: "2px solid #E8981D",
                  fontFamily: "system-ui, Arial, sans-serif", whiteSpace: "nowrap",
                }}>
                  Home
                </Link>
              </li>
              {categories.map(cat => (
                <li key={cat.value}>
                  <Link href={`/category/${cat.value}`} className="nav-cat-link" style={{
                    display: "block", padding: "8px 14px", fontSize: 12, fontWeight: 500,
                    color: "#9EB3C8", textDecoration: "none",
                    fontFamily: "system-ui, Arial, sans-serif",
                    whiteSpace: "nowrap", textTransform: "capitalize",
                  }}>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      {/* ── Mobile drawer ── */}
      {isMobile && menuOpen && (
        <nav style={{ background: "#0D1320", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)} style={{
                display: "block", padding: "15px 20px", fontSize: 15, fontWeight: 700,
                color: "#E8981D", textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                fontFamily: "system-ui, Arial, sans-serif",
              }}>
                Home
              </Link>
            </li>
            {categories.map(cat => (
              <li key={cat.value}>
                <Link href={`/category/${cat.value}`} onClick={() => setMenuOpen(false)} style={{
                  display: "block", padding: "15px 20px", fontSize: 15, color: "#9EB3C8",
                  textDecoration: "none", textTransform: "capitalize",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  fontFamily: "system-ui, Arial, sans-serif",
                }}>
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
