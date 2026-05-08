import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function ArticleBacaJuga({ articles }) {
  return (
    <div className="max-w-3xl mx-auto px-6 pb-12">
      <h2 className="text-xl font-bold text-slate-800 mb-1">Baca Juga</h2>
      <p className="text-sm text-slate-500 mb-4">Masih butuh dukungan? Artikel lain yang mungkin membantu kamu saat ini:</p>
      <div className="flex flex-col gap-3">
        {articles.map((a) => (
          <div key={a.id}>
            <div className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 text-[#1e3a5f] mt-0.5 shrink-0" />
              <p className="text-sm font-semibold text-slate-800">{a.title}</p>
            </div>
            <Link to={`/bantuan/artikel/${a.slug}`} className="text-xs text-[#2d6a9f] font-semibold ml-6 hover:underline">
              Baca Sekarang
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}