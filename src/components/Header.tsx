"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { categories } from "@/data/mockNews";
import Logo from "@/components/Logo";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    }));
  }, []);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, width: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>

      {/* ── Top utility bar ── */}
      <div style={{ background: "#0F2044" }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <span className="text-[11px] text-blue-300" style={{ fontFamily: "Arial, sans-serif" }}>
            {today}
          </span>
          <div className="flex items-center gap-4 text-[11px]" style={{ fontFamily: "Arial, sans-serif" }}>
            <a href="#" className="text-blue-300 hover:text-white transition-colors">नेपाली</a>
            <span className="text-blue-800">|</span>
            <a href="#" className="text-blue-300 hover:text-white transition-colors">Newsletter</a>
            <span className="text-blue-800">|</span>
            <a href="#" className="text-blue-300 hover:text-white transition-colors">About</a>
            {/* Social icons */}
            <span className="text-blue-800">|</span>
            {[
              { label: "Facebook", icon: "f" },
              { label: "X", icon: "𝕏" },
              { label: "Instagram", icon: "◎" },
            ].map(({ label, icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-blue-300 hover:text-[#E8A020] transition-colors text-xs"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Brand bar ── */}
      <div
        className="text-white"
        style={{
          background: "linear-gradient(135deg, #0F2044 0%, #1A3A6E 60%, #0D4F70 100%)",
          borderBottom: "3px solid #E8A020",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="group">
            <Logo size="md" variant="full" />
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {/* Breaking badge */}
            <div className="flex items-center gap-2 bg-[#C41230] px-3 py-1.5 rounded text-xs font-bold" style={{ fontFamily: "Arial, sans-serif" }}>
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              LIVE UPDATES
            </div>

            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-10 w-72 bg-white rounded-lg shadow-2xl overflow-hidden">
                  <input
                    type="text"
                    id="site-search"
                    name="q"
                    placeholder="Search NepaliWave..."
                    autoFocus
                    className="w-full px-4 py-3 text-gray-900 text-sm focus:outline-none"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  />
                  <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                    <p className="text-xs text-gray-400" style={{ fontFamily: "Arial, sans-serif" }}>Press Enter to search</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* ── Category nav ── */}
      <nav
        className="hidden md:block text-white"
        style={{ background: "#0F2044", borderBottom: "1px solid rgba(232,160,32,0.2)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center overflow-x-auto" style={{ fontFamily: "Arial, sans-serif" }}>
            <li>
              <Link
                href="/"
                className="block px-4 py-2.5 text-sm font-bold text-[#E8A020] border-b-2 border-[#E8A020] whitespace-nowrap"
              >
                Home
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.value}>
                <Link
                  href={`/category/${cat.value}`}
                  className="block px-4 py-2.5 text-sm font-medium text-blue-200 hover:text-[#E8A020] hover:border-b-2 hover:border-[#E8A020] transition-all whitespace-nowrap capitalize"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
            <li className="ml-auto">
              <Link
                href="#"
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#14A8AE] hover:text-white whitespace-nowrap transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-[#14A8AE] rounded-full animate-pulse" />
                LIVE
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <nav className="md:hidden text-white" style={{ background: "#0F2044", fontFamily: "Arial, sans-serif" }}>
          <ul className="flex flex-col divide-y divide-blue-900">
            <li>
              <Link href="/" className="block px-4 py-3 text-sm font-bold text-[#E8A020]" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.value}>
                <Link
                  href={`/category/${cat.value}`}
                  className="block px-4 py-3 text-sm text-blue-200 hover:text-[#E8A020] capitalize transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
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
