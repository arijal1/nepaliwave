"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { categories } from "@/data/mockNews";
import Logo from "@/components/Logo";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header ref={headerRef} style={{
      position: "sticky", top: 0, zIndex: 100,
      width: "100%", maxWidth: "100vw",
      background: "#111827",
      borderBottom: "2px solid #E8981D",
      boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.2)",
      transition: "box-shadow 0.3s",
    }}>

      {/* ── Main bar ── */}
      <div style={{
        padding: isMobile ? "8px 12px" : (scrolled ? "6px 20px" : "12px 20px"),
        transition: "padding 0.3s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 8, maxWidth: 1280, margin: "0 auto",
        boxSizing: "border-box", width: "100%",
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0, minWidth: 0 }}>
          <Logo size={isMobile ? "sm" : (scrolled ? "sm" : "md")} variant="full" />
        </Link>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>

          {/* LIVE badge — desktop only */}
          {!isMobile && (
            <div style={{
              display: "flex", alignItems: "center", gap: 5,
              background: "#C8102E", padding: "4px 10px", borderRadius: 4,
              fontSize: 11, fontWeight: 800, color: "white",
              fontFamily: "system-ui, Arial, sans-serif",
              letterSpacing: "0.06em", whiteSpace: "nowrap",
            }}>
              <span className="ticker-dot" style={{ width: 6, height: 6 }} />
              LIVE
            </div>
          )}

          {/* Search button */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => { setSearchOpen(v => !v); setMenuOpen(false); }}
              aria-label="Search"
              style={{
                width: 38, height: 38,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: searchOpen ? "#C8102E" : "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 8, cursor: "pointer", color: "white",
                flexShrink: 0,
              }}
            >
              <svg width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {searchOpen && (
              <div style={{
                ...(isMobile
                  ? { position: "fixed", top: 58, left: 8, right: 8, width: "auto" }
                  : { position: "absolute", right: 0, top: 46, width: 300 }),
                background: "white", borderRadius: 12, zIndex: 300,
                boxShadow: "0 16px 48px rgba(0,0,0,0.3)", overflow: "hidden",
              }}>
                <input
                  autoFocus type="text" id="site-search" name="q"
                  placeholder="Search NepaliWave…"
                  style={{
                    width: "100%", padding: "14px 16px", fontSize: 15,
                    color: "#111", outline: "none", border: "none",
                    fontFamily: "system-ui, Arial, sans-serif",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ padding: "8px 16px", background: "#f5f5f5", borderTop: "1px solid #eee" }}>
                  <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>Press Enter to search</p>
                </div>
              </div>
            )}
          </div>

          {/* Hamburger — mobile only, clearly visible */}
          {isMobile && (
            <button
              onClick={() => { setMenuOpen(v => !v); setSearchOpen(false); }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                width: 38, height: 38,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: menuOpen ? "#C8102E" : "rgba(232,152,29,0.25)",
                border: "1px solid rgba(232,152,29,0.6)",
                borderRadius: 8, cursor: "pointer", color: "white",
                flexShrink: 0,
              }}
            >
              <svg width={18} height={18} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Desktop category nav ── */}
      {!isMobile && (
        <nav style={{ borderTop: "1px solid rgba(255,255,255,0.07)", overflowX: "auto" }}>
          <ul style={{
            display: "flex", listStyle: "none", margin: 0,
            padding: "0 20px", maxWidth: 1280, boxSizing: "border-box",
          }}>
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
        </nav>
      )}

      {/* ── Mobile dropdown — absolute overlay ── */}
      {isMobile && menuOpen && (
        <nav style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "#0D1320",
          boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
          zIndex: 200,
        }}>
          <style>{`
            @keyframes slideDown {
              from { opacity: 0; transform: translateY(-6px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div style={{ animation: "slideDown 0.18s ease-out" }}>
            {/* Close hint */}
            <div style={{
              padding: "10px 16px 6px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "system-ui, Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Navigate
              </span>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li>
                <Link href="/" onClick={() => setMenuOpen(false)} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "14px 16px", fontSize: 15, fontWeight: 700,
                  color: "#E8981D", textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  fontFamily: "system-ui, Arial, sans-serif",
                }}>
                  🏠 Home
                </Link>
              </li>
              {categories.map(cat => (
                <li key={cat.value}>
                  <Link href={`/category/${cat.value}`} onClick={() => setMenuOpen(false)} style={{
                    display: "block", padding: "13px 16px 13px 26px",
                    fontSize: 14, color: "#CBD5E1", textDecoration: "none",
                    textTransform: "capitalize",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontFamily: "system-ui, Arial, sans-serif",
                  }}>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
