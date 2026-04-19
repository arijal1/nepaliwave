import Link from "next/link";
import { categories } from "@/data/mockNews";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer style={{ background: "#1E2A3A", fontFamily: "system-ui, -apple-system, Arial, sans-serif" }}>
      <div style={{ height: 3, background: "linear-gradient(90deg, #C8102E, #E8981D, #C8102E)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px 36px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "40px 32px",
        }}>

          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <Link href="/" style={{ display: "inline-block", marginBottom: 16, textDecoration: "none" }}>
              <Logo size="sm" variant="full" />
            </Link>
            <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.75, margin: "12px 0 20px" }}>
              Nepal's independent AI-powered news source. Real stories, no spin — just the NepaliWave angle.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { label: "Facebook", icon: "f" },
                { label: "Twitter", icon: "𝕏" },
                { label: "Instagram", icon: "◎" },
                { label: "YouTube", icon: "▶" },
              ].map(({ label, icon }) => (
                <a key={label} href="#" aria-label={label} style={{
                  width: 36, height: 36, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.07)", color: "#CBD5E1",
                  textDecoration: "none", fontSize: 13, border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div>
            <h3 style={{
              fontSize: 10, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.14em", color: "#E8981D", marginBottom: 20,
            }}>
              Sections
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {categories.map(cat => (
                <li key={cat.value}>
                  <Link href={`/category/${cat.value}`} style={{
                    color: "#CBD5E1", fontSize: 14, textDecoration: "none",
                    textTransform: "capitalize",
                  }}>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 style={{
              fontSize: 10, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.14em", color: "#E8981D", marginBottom: 20,
            }}>
              Company
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {["About NepaliWave", "How We Work", "AI & Automation", "Editorial Standards", "Contact Us", "Advertise"].map(item => (
                <li key={item}>
                  <a href="#" style={{ color: "#CBD5E1", fontSize: 14, textDecoration: "none" }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{
              fontSize: 10, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.14em", color: "#E8981D", marginBottom: 20,
            }}>
              Stay Updated
            </h3>
            <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.65, marginBottom: 16 }}>
              Get Nepal's top stories in your inbox every morning.
            </p>
            <form style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 8, padding: "11px 14px", color: "#F1F5F9", fontSize: 14,
                  outline: "none", fontFamily: "inherit",
                }}
              />
              <button type="submit" style={{
                background: "#C8102E", color: "white", fontWeight: 700,
                padding: "11px 16px", borderRadius: 8, border: "none",
                cursor: "pointer", fontSize: 14, fontFamily: "inherit",
              }}>
                Subscribe Free
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "16px 24px",
          display: "flex", flexWrap: "wrap", alignItems: "center",
          justifyContent: "space-between", gap: 10,
        }}>
          <p style={{ color: "#4B5563", fontSize: 12, margin: 0 }}>
            © 2026 NepaliWave. All rights reserved. Powered by AI.
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map(item => (
              <a key={item} href="#" style={{ color: "#4B5563", fontSize: 12, textDecoration: "none" }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
