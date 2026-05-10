import { useState } from "react";
import BantuanHero from "@/components/public/help/BantuanHero";
import BantuanSearch from "@/components/public/help/BantuanSearch";
import BantuanCategoryTabs from "@/components/public/help/BantuanCategoryTabs";
import ArticleGrid from "@/components/public/help/ArticleGrid";
import { articles, categories } from "@/data/articles";
import bantuanBg from "@/assets/safespace_artikelhero.png";


export default function ArtikelDukunganPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered = articles.filter((a) => {
    const matchCategory = activeCategory === "Semua" || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>
      <BantuanHero
        title="Ruang Pulih: Artikel Dukungan Mental untuk Korban Kekerasan"
        description="Kamu tidak sendirian. Kumpulan artikel ini ditulis untuk membantumu memahami apa yang kamu rasakan, merawat luka batin, dan menemukan kembali kekuatanmu. Semua informasi disusun oleh psikolog dan relawan pendamping korban."
        backgroundImage={bantuanBg}
      />
      <BantuanSearch
        placeholder="Tulis kata kunci yang sedang kamu rasakan (cemas, marah, sedih)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <BantuanCategoryTabs
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />
      <ArticleGrid articles={filtered} />
    </div>
  );
}