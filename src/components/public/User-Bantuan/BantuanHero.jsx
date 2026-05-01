export default function BantuanHero({ title, description, backgroundImage }) {
  return (
    <div
      className="relative w-full h-72 flex items-end"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 px-12 py-10 max-w-3xl">
        <h1 className="text-4xl font-bold text-white leading-tight mb-3">{title}</h1>
        <p className="text-slate-200 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}