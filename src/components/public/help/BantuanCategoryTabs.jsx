export default function BantuanCategoryTabs({ categories, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-12 pb-4 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`whitespace-nowrap text-xs px-4 py-2 rounded-full border transition-colors ${
            active === cat
              ? "bg-[#1e3a5f] text-white border-[#1e3a5f]"
              : "bg-white text-slate-600 border-slate-300 hover:border-[#1e3a5f]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}