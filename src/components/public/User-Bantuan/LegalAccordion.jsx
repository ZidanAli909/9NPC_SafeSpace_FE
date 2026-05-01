import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function LegalAccordion({ items }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex flex-col gap-3 px-12 py-6">
      {items.map((item) => (
        <div key={item.id} className="border border-slate-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpen(open === item.id ? null : item.id)}
            className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-slate-800 hover:bg-slate-50 transition-colors text-left"
          >
            {item.question}
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${open === item.id ? "rotate-180" : ""}`} />
          </button>
          {open === item.id && (
            <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 prose prose-sm max-w-none">
              <ReactMarkdown>{item.answer}</ReactMarkdown>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}