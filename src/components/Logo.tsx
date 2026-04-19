interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

const sizes = {
  sm: { icon: 30, fontSize: "1.15rem",  subSize: "8px"   },
  md: { icon: 40, fontSize: "1.75rem",  subSize: "9px"   },
  lg: { icon: 52, fontSize: "2.1rem",   subSize: "11px"  },
};

export default function Logo({ size = "md", variant = "full" }: LogoProps) {
  const s = sizes[size];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {/* Icon */}
      <div style={{ flexShrink: 0, width: s.icon, height: s.icon }}>
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ width: s.icon, height: s.icon, display: "block" }}>
          <circle cx="28" cy="28" r="28" fill="#C8102E" />
          <path d="M6 40 L16 22 L22 30 L28 16 L34 30 L40 22 L50 40 Z" fill="#F5B94A" opacity="0.95" />
          <path d="M28 16 L24 24 L32 24 Z" fill="white" opacity="0.95" />
          <path d="M16 22 L13 27 L19 27 Z" fill="white" opacity="0.8" />
          <path d="M40 22 L37 27 L43 27 Z" fill="white" opacity="0.8" />
          <path d="M4 44 Q10 40 16 44 Q22 48 28 44 Q34 40 40 44 Q46 48 52 44"
            stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M4 48 Q10 44 16 48 Q22 52 28 48 Q34 44 40 48 Q46 52 52 48"
            stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* Wordmark */}
      {variant === "full" && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{
            fontSize: s.fontSize, fontWeight: 700, color: "white",
            fontFamily: "Georgia, serif", letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}>
            Nepali<span style={{ color: "#E8981D" }}>Wave</span>
          </span>
          <span style={{
            fontSize: s.subSize, color: "#94A3B8",
            fontFamily: "system-ui, Arial, sans-serif",
            letterSpacing: "0.14em", textTransform: "uppercase",
            marginTop: 3, whiteSpace: "nowrap",
          }}>
            Nepal's Independent Voice
          </span>
        </div>
      )}
    </div>
  );
}
