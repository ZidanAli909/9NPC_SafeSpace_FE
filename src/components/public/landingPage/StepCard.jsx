export default function StepCard({ title, description }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex-1">
      <h4 className="font-bold text-[#000000] text-sm mb-2">{title}</h4>
      <p className="text-[#000000] text-xs leading-relaxed">{description}</p>
    </div>
  );
}
