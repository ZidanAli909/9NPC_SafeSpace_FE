import { Accordion } from "@/components/ui/accordion";
import FAQItem from "./FAQItem";

const faqs = [
  {
    value: "faq-1",
    question: "Unggahan bukti (foto/video/dokumen) selalu gagal. Apa yang harus saya lakukan?",
    answer:
      "Kalau unggahan bukti seperti foto, video, atau dokumen selalu gagal, coba pastikan dulu ukuran file tidak melebihi batas, format file sesuai (misalnya JPG, PNG, atau PDF), dan koneksi internet kamu stabil. Kalau masih gagal, coba ulang upload atau gunakan browser atau perangkat lain.",
  },
  {
    value: "faq-2",
    question: "Apakah saya bisa mengedit atau membatalkan laporan yang sudah terkirim?",
    answer:
      "Untuk laporan yang sudah terkirim, biasanya tidak bisa diedit atau dibatalkan secara langsung. Namun, kamu tetap bisa menghubungi admin atau pihak terkait untuk meminta bantuan terkait perubahan atau tindak lanjut laporan tersebut.",
  },
  {
    value: "faq-3",
    question: "Apakah identitas saya benar-benar terlindungi jika melapor secara anonim?",
    answer:
      "Ya, saat kamu memilih opsi anonim, sistem kami tidak menyimpan informasi yang bisa mengidentifikasi dirimu. Semua data laporan dienkripsi dan hanya dapat diakses oleh tim yang berwenang.",
  },
  {
    value: "faq-4",
    question: "Berapa lama proses penanganan laporan biasanya berlangsung?",
    answer:
      "Tim kami berusaha meninjau setiap laporan dalam 1×24 jam kerja. Waktu penyelesaian keseluruhan bergantung pada kompleksitas kasus dan pihak-pihak yang perlu dihubungi.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="bg-[#FEFAF5] py-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <p className="text-[#2d6a9f] text-sm font-semibold mb-2 uppercase tracking-wide text-center">
          FAQ
        </p>
        <h2 className="text-4xl font-bold text-[#1e3a5f] mb-3 text-center leading-tight">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="text-slate-500 text-sm text-center mb-12">
          Kami memahami bahwa Anda mungkin memiliki kekhawatiran. Berikut jawaban
          atas pertanyaan yang paling sering diajukan.
        </p>

        {/* Accordion */}
        <Accordion type="multiple" className="w-full">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.value}
              value={faq.value}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </Accordion>
      </div>
    </section>
  );
}
