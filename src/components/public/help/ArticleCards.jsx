import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ArticleCard({ article }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-bold text-slate-800 leading-snug">{article.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed flex-1">{article.excerpt}</p>
        <Button
          size="sm"
          className="bg-[#1e3a5f] hover:bg-[#152d4a] text-white w-full mt-2 text-xs"
          onClick={() => navigate(`/help/article/${article.slug}`)}
        >
          Baca Lebih Lanjut
        </Button>
      </div>
    </div>
  );
}