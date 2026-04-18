import Link from "next/link";
import { categories } from "@/data/mockNews";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white mt-16">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
                NepaliWave
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "Arial, sans-serif" }}>
              Nepal's independent AI-powered news source. Real stories, no spin — just the NepaliWave angle.
            </p>
            {/* Social links */}
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
                  className="w-9 h-9 rounded-full bg-gray-700 hover:bg-[#c41230] flex items-center justify-center text-sm transition-colors"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: "Arial, sans-serif" }}>
              Sections
            </h3>
            <ul className="space-y-2" style={{ fontFamily: "Arial, sans-serif" }}>
              {categories.map((cat) => (
                <li key={cat.value}>
                  <Link
                    href={`/category/${cat.value}`}
                    className="text-gray-300 hover:text-white text-sm transition-colors capitalize"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: "Arial, sans-serif" }}>
              About
            </h3>
            <ul className="space-y-2" style={{ fontFamily: "Arial, sans-serif" }}>
              {["About NepaliWave", "How We Work", "AI & Automation", "Editorial Standards", "Contact Us", "Advertise"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: "Arial, sans-serif" }}>
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: "Arial, sans-serif" }}>
              Get the NepaliWave daily digest in your inbox.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-gray-700 text-white text-sm px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-[#c41230] placeholder-gray-500"
                style={{ fontFamily: "Arial, sans-serif" }}
              />
              <button
                type="submit"
                className="bg-[#c41230] hover:bg-[#9a0e24] text-white text-sm font-bold py-2 px-4 rounded transition-colors"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2" style={{ fontFamily: "Arial, sans-serif" }}>
          <p className="text-gray-500 text-xs">
            © 2026 NepaliWave. All rights reserved. Powered by AI.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
