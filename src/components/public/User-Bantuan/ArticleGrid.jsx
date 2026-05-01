import ArticleCard from "./ArticleCards";
import { useState } from "react";

const PER_PAGE = 3;

export default function ArticleGrid({ articles }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(articles.length / PER_PAGE);
  const paginated = articles.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="px-12 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paginated.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-8 h-8 rounded text-sm border ${
              page === p
                ? "bg-[#1e3a5f] text-white border-[#1e3a5f]"
                : "bg-white text-slate-600 border-slate-300 hover:border-[#1e3a5f]"
            }`}
          >
            {p}
          </button>
        ))}
        {totalPages > 4 && (
          <button className="w-auto px-3 h-8 rounded text-sm border border-slate-300 bg-white text-slate-600">
            ... / {totalPages}
          </button>
        )}
      </div>
    </div>
  );
}