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
import { Link } from "react-router-dom"

const items = [
  {
    value: "faq1",
    trigger: "Apakah laporan saya dirahasiakan?",
    content:
      "Ya. Semua laporan yang masuk ke SafeSpace bersifat rahasia. Hanya admin terverifikasi yang dapat mengakses data laporan untuk keperluan tindak lanjut. Identitas pelapor tidak akan pernah ditampilkan kepada pelaku atau publik.",
  },
  {
    value: "faq2",
    trigger: "Apakah saya bisa melapor secara anonim?",
    content:
      "Bisa. Meskipun data akun wajib diisi untuk komunikasi dengan  admin, laporan yang Anda buat akan otomatis bersifat anonim. Nama dan identitas Anda tidak akan muncul di laporan.",
  },
  {
    value: "faq3",
    trigger: "Bagaimana SafeSpace melindungi data saya?",
    content:
      "Data laporan dienkripsi saat dikirim dan disimpan. Kami menggunakan protokol keamanan standar industri. Hanya admin yang berwenang yang bisa mengakses laporan, itupun hanya untuk keperluan  verifikasi dan tindak lanjut.",
  },
  {
    value: "faq4",
    trigger: "Apa yang terjadi setelah saya mengirim laporan?",
    content:
      "Laporan akan masuk ke dashboard admin. Admin akan mereview  kelengkapan data dan bukti dalam waktu maksimal 1x24 jam. Status laporan dapat Anda pantau melalui menu 'Status Laporan' di profil Anda.",
  },
  {
    value: "faq5",
    trigger: "Apakah laporan saya akan diteruskan ke polisi atau pihak kampus?",
    content:
      "Tergantung pada jenis dan tingkat keparahan kekerasan. Admin akan berkoordinasi dengan Satgas PPKS kampus atau pihak berwenang jika diperlukan. Sebelum diteruskan, Anda akan dikonfirmasi terlebih dahulu (kecuali dalam keadaan darurat yang membutuhkan tindakan segera).",
  },
]

export function PrivacyPage() {
    return (
        <div className={commonStyle_Page}>
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
                <p className="text-2xl font-semibold mb-4">Kebijakan Privasi Pelapor</p>
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