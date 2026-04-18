interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

const sizes = {
  sm: { icon: 32, text: "text-xl",  sub: "text-[9px]"  },
  md: { icon: 42, text: "text-3xl", sub: "text-[10px]" },
  lg: { icon: 56, text: "text-4xl", sub: "text-xs"     },
};

export default function Logo({ size = "md", variant = "full" }: LogoProps) {
  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* ── Icon mark ── */}
      <div
        className="shrink-0 flex items-center justify-center"
        style={{ width: s.icon, height: s.icon }}
      >
        <svg
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: s.icon, height: s.icon }}
        >
          {/* Circular background */}
          <circle cx="28" cy="28" r="28" fill="#0F2044" />

          {/* Mountain silhouette — 3 peaks (Himalaya) */}
          <path
            d="M6 40 L16 22 L22 30 L28 16 L34 30 L40 22 L50 40 Z"
            fill="#E8A020"
            opacity="0.95"
          />

          {/* Snow caps */}
          <path d="M28 16 L24 24 L32 24 Z" fill="white" opacity="0.9" />
          <path d="M16 22 L13 27 L19 27 Z" fill="white" opacity="0.7" />
          <path d="M40 22 L37 27 L43 27 Z" fill="white" opacity="0.7" />

          {/* Wave at base */}
          <path
            d="M4 44 Q10 40 16 44 Q22 48 28 44 Q34 40 40 44 Q46 48 52 44"
            stroke="#14A8AE"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M4 48 Q10 44 16 48 Q22 52 28 48 Q34 44 40 48 Q46 52 52 48"
            stroke="#14A8AE"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* ── Wordmark ── */}
      {variant === "full" && (
        <div className="flex flex-col leading-none">
          <span
            className={`${s.text} font-bold tracking-tight text-white`}
            style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
          >
            Nepali<span style={{ color: "#E8A020" }}>Wave</span>
          </span>
          <span
            className={`${s.sub} tracking-widest uppercase mt-0.5`}
            style={{ fontFamily: "Arial, sans-serif", color: "#14A8AE", letterSpacing: "0.18em" }}
          >
            Nepal's Independent Voice
          </span>
        </div>
      )}
    </div>
  );
}
