export default function StepItem({ number, isLast = false }) {
  return (
    <div className="flex items-center flex-1">
      {/* Circle */}
      <div className="w-10 h-10 rounded-full bg-[#191919] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 z-10">
        {number}
      </div>
      {/* Connector line */}
      {!isLast && (
        <div className="flex-1 h-0.5 bg-[#191919]/30 mx-1" />
      )}
    </div>
  );
}
