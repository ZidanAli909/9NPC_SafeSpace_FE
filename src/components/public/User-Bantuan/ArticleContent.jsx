import ReactMarkdown from "react-markdown";

export default function ArticleContent({ article }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-3">{article.title}</h1>
      <div className="flex items-center gap-3 text-xs text-slate-500 mb-6">
        <span>Posted in {article.date} {article.time}</span>
        <span>•</span>
        <span>✍ Written by {article.author}</span>
      </div>
      <img src={article.image} alt={article.title} className="w-full h-72 object-cover rounded-xl mb-6" />
      <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
      {article.quote && (
        <div className="mt-8 bg-[#FEFAF5] border-l-4 border-[#4E7489] rounded-lg p-6 text-sm text-slate-700 italic leading-relaxed">
          <p>{article.quote}</p>
          <p className="text-right font-semibold mt-3 not-italic">— Tim SafeSpace</p>
        </div>
      )}
    </div>
  );
}