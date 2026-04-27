import { FAQContactCard } from "@/components/public/FAQCommon"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ReportGuidePage() {
    return (
        <div className="py-8 px-24 max-md:px-16 max-sm:px-8">
            <div className="mb-8">
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

            <div className="mb-8">
                <p className="text-2xl font-semibold mb-4">Langkah-Langkah Pelaporan</p>
                <p className="text-sm">Kami memahami bahwa Anda mungkin memiliki kekhawatiran. Berikut jawaban atas pertanyaan yang paling sering diajukan.</p>
            </div>

            <div className="grid grid-cols-4 mb-8">
                <div>
                    <Card className="mx-8">
                        <CardHeader>
                            <CardTitle>Pilih Jenis Kejadian</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Pilih kategori yang paling menggambarkan apa yang Anda alami atau saksikan. Tidak ada kejadian yang terlalu kecil untuk dilaporkan.</p>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="mx-8">
                        <CardHeader>
                            <CardTitle>Ceritakan Kejadiannya</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Isi formulir dengan informasi sedetail mungkin. Semakin lengkap, semakin mudah tim kami membantu. Anda bisa memilih untuk anonim sepenuhnya.</p>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="mx-8">
                        <CardHeader>
                            <CardTitle>Unggah Bukti (Opsional)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Sertakan foto, video, tangkapan layar, atau dokumen pendukung jika tersedia. Semua file dienkripsi dan terlindungi.</p>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="mx-8">
                        <CardHeader>
                            <CardTitle>Kirim & Pantau Laporan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Laporan Anda langsung diterima tim kami. Dapatkan notifikasi saat kami menindak lanjuti</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <FAQContactCard />
        </div>
    )
}