import { FAQContactCard } from "@/components/public/faq/FAQCommon"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"

const items = [
  {
    value: "faq1",
    trigger: "Saya lupa password. Bagaimana cara meresetnya?",
    content:
      "Klik tautan 'Lupa Password' di halaman login. Masukkan alamat  email yang kamu gunakan saat mendaftar. Kami akan mengirimkan tautan  reset password ke email tersebut. Tautan berlaku selama 30 menit. Jika  tidak menerima email, cek folder Spam atau hubungi admin melalui halaman Kontak.",
  },
  {
    value: "faq2",
    trigger: "Saya sudah login, tapi tidak bisa mengakses halaman Lapor. Kenapa?",
    content:
      "Pastikan akun kamu sudah terverifikasi melalui email yang kami  kirim saat pendaftaran. Jika belum, silakan cek email (termasuk folder  Spam) dan klik tautan verifikasi. Jika sudah terverifikasi namun masih  tidak bisa, coba logout lalu login kembali. Jika masalah berlanjut,  hubungi tim teknis di support@safespace.id.",
  },
  {
    value: "faq3",
    trigger: "Unggahan bukti (foto/video/dokumen) selalu gagal. Apa yang harus saya lakukan?",
    content:
      "Pastikan ukuran file tidak melebihi batas maksimal: foto maks 10 MB per file, video maks 50 mb per file, dokumen (PDF/Word) maks 5 MB per file, audio maks 10 MB per file. Periksa juga koneksi internetmu. Coba gunakan browser Chrome atau Firefox versi terbaru. Jika masih gagal, coba kompres file terlebih dahulu atau unggah satu per satu.",
  },
  {
    value: "faq4",
    trigger: "Saya tidak menerima notifikasi status laporan padahal sudah berubah. Kenapa?",
    content:
      "Notifikasi dikirim melalui email ke alamat yang kamu daftarkan. Cek folder Spam atau Promosi (jika pakai Gmail). Pastikan email support@safespace.id sudah masuk dalam daftar kontak aman. Kamu juga bisa mengecek status laporan secara manual melalui menu 'Status Laporan' di dashboard atau  profilmu. Jika tetap tidak ada, hubungi admin untuk memastikan alamat  emailmu benar.",
  },
  {
    value: "faq5",
    trigger: "Apakah saya bisa mengedit atau membatalkan laporan yang sudah terkirim?",
    content:
      "Laporan yang sudah terkirim tidak bisa diedit langsung. Namun jika status laporan masih 'Diterima' atau 'Sedang Direview', kamu dapat  menghubungi admin melalui halaman Kontak untuk meminta perubahan atau  pembatalan. Jika status sudah 'Diproses' atau lebih lanjut, perubahan  tidak dapat dilakukan karena sudah masuk koordinasi dengan pihak  kampus/polisi.",
  },
]

export function FAQPage() {
    return (
        <div  className={commonStyle_Page}>
            <div className={commonStyle_Section}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>FAQ</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Pusat Bantuan Teknis</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className={commonStyle_Section + " max-w-4xl mx-auto"}>
                <p className="text-2xl font-semibold mb-4 max-md:mb-2">Pertanyaan yang Sering Diajukan</p>
                <p className="text-sm">Kami memahami bahwa Anda mungkin memiliki kekhawatiran. Berikut jawaban atas pertanyaan yang paling sering diajukan.</p>
            </div>
            
            <div className={commonStyle_Section + " max-w-4xl mx-auto"}>
                <Accordion multiple className="mx-auto rounded-lg border" defaultValue={["faq1"]}>
                    {items.map((item) => (
                        <AccordionItem key={item.value} value={item.value} className="border-b px-8 last:border-b-0">
                            <AccordionTrigger>{item.trigger}</AccordionTrigger>
                            <AccordionContent>{item.content}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <FAQContactCard />
            
        </div>
    )
}