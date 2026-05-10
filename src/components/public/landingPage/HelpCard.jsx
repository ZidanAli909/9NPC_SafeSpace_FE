export default function HelpCard({ icon, title, items }) {
  return (
    <div className="bg-white/10 border border-white/15 rounded-xl p-5 backdrop-blur-sm hover:bg-white/15 transition-colors">
      <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center mb-4">
          <img src={icon} alt={title} className="w-9 h-9 object-contain" />
      </div>
      <h4 className="font-bold text-white text-sm mb-3">{title}</h4>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-slate-300 text-xs leading-relaxed flex items-start gap-1.5">
            {item.bullet ? (
              <span className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.bullet}`} />
            ) : null}
            <span>{item.text || item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
