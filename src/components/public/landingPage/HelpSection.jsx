import HelpCard from "./HelpCard";
import card1 from "@/assets/safespace_helpcard.png";
import card2 from "@/assets/safespace_helpcard2.png";
import card3 from "@/assets/safespace_helpcard3.png";
import card4 from "@/assets/safespace_helpcard4.png";

const helpData = [
  {
    icon: card1,
    title: "Bantuan Darurat",
    items: [
      { text: "112 — Panggilan Darurat Nasional" },
      { text: "(021) 500-111 — Satpam Kampus" },
      { text: "110 ext 4 — Hotline Kekerasan" },
    ],
  },
  {
    icon: card2,
    title: "Layanan Konseling",
    items: [
      { text: "Bicarakan pengalaman Anda dengan konselor profesional yang terlatih dan empatik." },
      { text: "Pusat Konseling Kampus — Gedung Terpadu" },
    ],
  },
  {
    icon: card3,
    title: "Pihak Kampus Terkait",
    items: [
      { text: "Unit Pembinaan Mahasiswa — berwenang menangani dan merujuk kasus." },
      { text: "safespace@upnvj.ac.id" },
    ],
  },
  {
    icon: card4,
    title: "Panduan Situasi Tidak Aman",
    items: [
      { text: "Pergi ke tempat ramai & terang", bullet: "bg-yellow-400" },
      { text: "Hubungi orang yang Anda percaya", bullet: "bg-green-400" },
      { text: "Dokumentasikan kejadian dengan aman", bullet: "bg-blue-400" },
    ],
  },
];

export default function HelpSection() {
  return (
    <section id="bantuan" className="bg-[#1e3a5f] py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <p className="text-[#7fb3d3] text-sm font-semibold mb-2 uppercase tracking-wide">
          Pusat Bantuan
        </p>
        <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
          Anda Tidak Sendirian
        </h2>
        <p className="text-slate-300 text-sm max-w-xl mb-12">
          Jika Anda berada dalam situasi darurat atau membutuhkan dukungan,
          berikut adalah sumber bantuan yang dapat Anda hubungi segera.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {helpData.map((card) => (
            <HelpCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              items={card.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
