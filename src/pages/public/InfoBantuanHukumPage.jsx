import { useState } from "react";
import BantuanHero from "@/components/public/help/BantuanHero";
import BantuanSearch from "@/components/public/help/BantuanSearch";
import LegalAccordion from "@/components/public/help/LegalAccordion";
import LegalQuote from "@/components/public/help/LegalQuote";
import { legalFAQ } from "@/data/articles";
import hukumBg from "@/assets/safespace_hukumhero.png";


export default function InfoBantuanHukumPage() {
  const [search, setSearch] = useState("");

  const filtered = legalFAQ.filter((item) =>
    item.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <BantuanHero
        title="Ruang Pulih: Panduan Hukum untuk Korban Kekerasan"
        description="Kamu berhak mendapatkan keadilan. Proses hukum mungkin terdengar menakutkan, tapi kami di sini untuk membantumu memahami langkah-langkahnya. Bagian ini berisi informasi tentang apa yang perlu disiapkan jika kamu ingin melapor secara resmi, serta perlindungan hukum yang tersedia untukmu."
        backgroundImage={hukumBg}
      />
      <BantuanSearch
        placeholder="Apa yang ingin kamu ketahui tentang hukum? (pasal, prosedur, lembaga bantuan)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="px-12 pt-6 pb-2">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Informasi Bantuan Hukum yang Sering Dicari</h2>
        <p className="text-sm text-[#2d6a9f]">Pilih topik di bawah untuk mengetahui panduan singkat, pasal yang melindungimu, dan cara melapor ke pihak berwajib.</p>
      </div>
      <LegalAccordion items={filtered} />
      <LegalQuote />
    </div>
  );
}