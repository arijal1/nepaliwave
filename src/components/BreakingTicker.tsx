import { getBreakingNews } from "@/data/mockNews";

export default function BreakingTicker() {
  const breaking = getBreakingNews();
  if (breaking.length === 0) return null;

  return (
    <div className="text-white flex items-stretch overflow-hidden" style={{ background: "#C41230", fontFamily: "Arial, sans-serif" }}>
      <div className="flex items-center px-4 py-2 shrink-0 gap-2" style={{ background: "#8B0D20" }}>
        <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-xs font-bold tracking-widest uppercase">Breaking</span>
      </div>
      {/* Gold divider */}
      <div className="w-1 shrink-0" style={{ background: "#E8A020" }} />
      <div className="relative flex-1 overflow-hidden py-2">
        <div className="ticker-animate inline-flex items-center gap-10 text-sm font-semibold">
          {[...breaking, ...breaking].map((article, i) => (
            <a key={`${article.id}-${i}`} href={`/news/${article.slug}`} className="hover:text-[#E8A020] whitespace-nowrap transition-colors">
              {article.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
