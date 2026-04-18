import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="text-8xl font-bold text-gray-100 mb-4" style={{ fontFamily: "Georgia, serif" }}>
        404
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Page not found</h1>
      <p className="text-gray-500 mb-8 max-w-md mx-auto" style={{ fontFamily: "Arial, sans-serif" }}>
        The story you're looking for has moved, been updated, or doesn't exist.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#c41230] text-white font-bold px-6 py-3 rounded hover:bg-[#9a0e24] transition-colors"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        Back to NepaliWave Home
      </Link>
    </div>
  );
}
