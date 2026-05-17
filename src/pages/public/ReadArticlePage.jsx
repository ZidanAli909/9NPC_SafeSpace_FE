import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ArticleContent from "@/components/public/help/ArticleContent";
import ArticleBacaJuga from "@/components/public/help/ArticleBacaJuga";
import { articles } from "@/data/articles";

export default function ReadArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.slug === slug);
  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  if (!article) return <div className="p-12 text-slate-500">Artikel tidak ditemukan.</div>;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-6 pt-6 pb-2 text-xs text-slate-500">
        <button onClick={() => navigate(-1)} className="hover:text-[#1e3a5f]">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <Link to="/help/article" className="hover:underline">Artikel Dukungan</Link>
        <span>/</span>
        <span className="text-slate-400">{article.category}</span>
        <span>/</span>
        <span className="text-[#2d6a9f] font-medium truncate max-w-xs">{article.title}</span>
      </div>
      <ArticleContent article={article} />
      <ArticleBacaJuga articles={related} />
    </div>
  );
}