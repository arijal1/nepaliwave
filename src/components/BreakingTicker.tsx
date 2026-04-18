import { getBreakingNews } from "@/data/mockNews";

export default function BreakingTicker() {
  const breaking = getBreakingNews();
  if (breaking.length === 0) return null;

  return (
    <div className="bg-[#c41230] text-white flex items-stretch overflow-hidden" style={{ fontFamily: "Arial, sans-serif" }}>
      <div className="bg-[#9a0e24] flex items-center px-4 py-2 shrink-0 z-10">
        <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
          Breaking
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden py-2">
        <div className="ticker-animate inline-flex items-center gap-8 text-sm font-semibold">
          {breaking.map((article) => (
            <a key={article.id} href={`/news/${article.slug}`} className="hover:underline whitespace-nowrap">
              {article.title}
            </a>
          ))}
          {/* repeat for continuous scroll feel */}
          {breaking.map((article) => (
            <a key={`${article.id}-dup`} href={`/news/${article.slug}`} className="hover:underline whitespace-nowrap">
              {article.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
