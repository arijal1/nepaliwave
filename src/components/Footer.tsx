import Link from "next/link";
import { categories } from "@/data/mockNews";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="mt-16" style={{ background: "#0A1628" }}>
      {/* Gold top border */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #E8A020, #14A8AE, #E8A020)" }} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Logo size="sm" variant="full" />
            </Link>
            <p className="text-blue-300 text-sm leading-relaxed mt-4" style={{ fontFamily: "Arial, sans-serif" }}>
              Nepal's independent AI-powered news source. Real stories, no spin — just the NepaliWave angle.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { label: "Facebook", icon: "f" },
                { label: "Twitter", icon: "𝕏" },
                { label: "Instagram", icon: "◎" },
                { label: "YouTube", icon: "▶" },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all hover:scale-110"
                  style={{ background: "#1A3A6E", color: "#E8A020", fontFamily: "Arial, sans-serif" }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#E8A020", fontFamily: "Arial, sans-serif" }}>
              Sections
            </h3>
            <ul className="space-y-2" style={{ fontFamily: "Arial, sans-serif" }}>
              {categories.map((cat) => (
                <li key={cat.value}>
                  <Link href={`/category/${cat.value}`} className="text-blue-300 hover:text-[#E8A020] text-sm transition-colors capitalize">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#E8A020", fontFamily: "Arial, sans-serif" }}>
              About
            </h3>
            <ul className="space-y-2" style={{ fontFamily: "Arial, sans-serif" }}>
              {["About NepaliWave", "How We Work", "AI & Automation", "Editorial Standards", "Contact Us", "Advertise"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-blue-300 hover:text-[#E8A020] text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#E8A020", fontFamily: "Arial, sans-serif" }}>
              Stay Updated
            </h3>
            <p className="text-blue-300 text-sm mb-4" style={{ fontFamily: "Arial, sans-serif" }}>
              Get the NepaliWave daily digest in your inbox.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="text-white text-sm px-3 py-2 rounded border focus:outline-none placeholder-blue-600"
                style={{ background: "#1A3A6E", borderColor: "#2D5A9E", fontFamily: "Arial, sans-serif" }}
              />
              <button
                type="submit"
                className="text-white text-sm font-bold py-2 px-4 rounded transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #E8A020, #F5C152)", color: "#0F2044", fontFamily: "Arial, sans-serif" }}
              >
                Subscribe Free
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #1A3A6E" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2" style={{ fontFamily: "Arial, sans-serif" }}>
          <p className="text-blue-600 text-xs">
            © 2026 NepaliWave. All rights reserved. Powered by AI.
          </p>
          <div className="flex gap-4 text-xs text-blue-600">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="hover:text-blue-300 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
