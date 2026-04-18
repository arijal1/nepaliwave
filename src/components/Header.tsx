"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data/mockNews";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="w-full">
      {/* Top utility bar */}
      <div className="bg-[#1a1a1a] text-white text-xs font-sans py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-gray-400">{today}</span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">नेपाली</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Newsletter</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
          </div>
        </div>
      </div>

      {/* Brand bar */}
      <div className="bg-[#c41230] text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Nepal flag-inspired logo mark */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                  {/* Stylised "N" wave */}
                  <path d="M8 30 L8 10 L20 25 L32 10 L32 30" stroke="#c41230" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M6 34 Q20 28 34 34" stroke="#003893" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold tracking-tight" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
                NepaliWave
              </span>
              <div className="text-[10px] text-red-200 tracking-widest uppercase font-sans" style={{ fontFamily: "Arial, sans-serif" }}>
                Nepal's Independent Voice
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {/* Search */}
            <button className="p-2 rounded-full hover:bg-red-700 transition-colors" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {/* Hamburger (mobile) */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-red-700 transition-colors"
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
      </div>

      {/* Category nav */}
      <nav className="bg-[#1a1a1a] text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-0 overflow-x-auto" style={{ fontFamily: "Arial, sans-serif" }}>
            <li>
              <Link
                href="/"
                className="block px-4 py-3 text-sm font-bold hover:bg-[#c41230] transition-colors whitespace-nowrap"
              >
                Home
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.value}>
                <Link
                  href={`/category/${cat.value}`}
                  className="block px-4 py-3 text-sm font-semibold text-gray-300 hover:text-white hover:bg-[#c41230] transition-colors whitespace-nowrap capitalize"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
            <li className="ml-auto">
              <Link
                href="#"
                className="block px-4 py-3 text-sm font-bold text-[#f5a623] hover:bg-[#c41230] transition-colors whitespace-nowrap"
              >
                🔴 Live
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-[#1a1a1a] text-white border-t border-gray-700" style={{ fontFamily: "Arial, sans-serif" }}>
          <ul className="flex flex-col">
            <li>
              <Link href="/" className="block px-4 py-3 text-sm font-bold border-b border-gray-700 hover:bg-[#c41230] transition-colors">
                Home
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.value}>
                <Link
                  href={`/category/${cat.value}`}
                  className="block px-4 py-3 text-sm text-gray-300 border-b border-gray-700 hover:text-white hover:bg-[#c41230] transition-colors capitalize"
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
