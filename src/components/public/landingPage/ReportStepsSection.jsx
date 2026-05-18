import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import StepItem from "./StepItem";
import StepCard from "./StepCard";

const steps = [
  {
    number: 1,
    title: "Pilih Jenis Kejadian",
    description:
      "Pilih kategori yang paling menggambarkan apa yang Anda alami atau saksikan. Tidak ada kejadian yang terlalu kecil untuk dilaporkan.",
  },
  {
    number: 2,
    title: "Ceritakan Kejadiannya",
    description:
      "Isi formulir dengan informasi sedetail mungkin. Semakin lengkap, semakin mudah tim kami membantu. Anda bisa memilih untuk anonim sepenuhnya.",
  },
  {
    number: 3,
    title: "Unggah Bukti (Opsional)",
    description:
      "Sertakan foto, video, tangkapan layar, atau dokumen pendukung jika tersedia. Semua file dienkripsi dan terlindungi.",
  },
  {
    number: 4,
    title: "Kirim & Pantau Laporan",
    description:
      "Laporan Anda langsung diterima tim kami. Dapatkan notifikasi saat kami menindak lanjuti.",
  },
];

export default function ReportStepsSection() {
  return (
    <section id="laporan" className="bg-[#eef6fb] py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <p className="text-[#4E7489] text-sm font-semibold mb-2 uppercase tracking-wide">
          Buat Laporan
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-4">
          <h2 className="text-4xl font-bold text-[#18314F] leading-tight max-w-lg">
            Laporkan dengan Mudah, Aman & Anonim
          </h2>
        </div>
        <p className="text-[#777777] text-sm max-w-xl mb-3">
          Proses pelaporan dirancang sesederhana mungkin, tanpa kerumitan
          birokrasi — karena kami tahu bahwa berbicara tidaklah mudah, dan kami
          menghargai keberanian Anda.
        </p>
        <Button className="bg-[#4E7489] hover:bg-[#152d4a] text-white px-6 py-4 rounded-lg flex items-center gap-2 mb-12">
          <Shield className="w-4 h-4" />
          Laporkan Sekarang
        </Button>

        {/* Steps connector row */}
        <div className="flex items-center mb-6">
          {steps.map((step, index) => (
            <StepItem
              key={step.number}
              number={step.number}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step) => (
            <StepCard
              key={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
