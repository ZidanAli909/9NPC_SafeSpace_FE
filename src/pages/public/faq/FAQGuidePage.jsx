import { FAQContactCard } from "@/components/public/faq/FAQCommon"
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
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"

function GuideStepsCardTemplate({
    number = 1,
    title = "Lorem Ipsum",
    description = "Lorem Ipsum Dolor Sit Amet",
}) {
    return (
        <div>
            <div className="w-[110%] h-1 -mt-1 bg-muted max-sm:hidden relative top-5.5 right-2" />
            <div className="max-sm:hidden size-10 bg-primary text-primary-foreground text-lg font-semibold rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                {number}
            </div>
            <Card className="sm:max-w-64">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="sm:hidden size-10 bg-primary text-primary-foreground text-lg font-semibold rounded-full flex items-center justify-center">
                        {number}
                    </div>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{description}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export function ReportGuidePage() {
    return (
        <div className={commonStyle_Page}>
            <title>Safespace | FAQ Guide</title>

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
                <p className="text-2xl font-semibold mb-4">Langkah-Langkah Pelaporan</p>
                <p className="text-sm">Kami memahami bahwa Anda mungkin memiliki kekhawatiran. Berikut jawaban atas pertanyaan yang paling sering diajukan.</p>
            </div>

            <div className="grid grid-cols-4 gap-4 w-fit max-lg:grid-cols-2 max-sm:grid-cols-1 mb-8 max-md:mb-4 max-w-4xl mx-auto">
                <GuideStepsCardTemplate
                    number="1"
                    title="Pilih Jenis Kejadian"
                    description="Pilih kategori yang paling menggambarkan apa yang Anda alami atau saksikan. Tidak ada kejadian yang terlalu kecil untuk dilaporkan."
                />

                <GuideStepsCardTemplate
                    number="2"
                    title="Ceritakan Kejadiannya"
                    description="Isi formulir dengan informasi sedetail mungkin. Semakin lengkap, semakin mudah tim kami membantu. Anda bisa memilih untuk anonim sepenuhnya."
                />

                <GuideStepsCardTemplate
                    number="3"
                    title="Unggah Bukti (Opsional)"
                    description="Sertakan foto, video, tangkapan layar, atau dokumen pendukung jika tersedia. Semua file dienkripsi dan terlindungi."
                />

                <GuideStepsCardTemplate
                    number="4"
                    title="Kirim & Pantau Laporan"
                    description="Laporan Anda langsung diterima tim kami. Dapatkan notifikasi saat kami menindak lanjuti"
                />
            </div>

            <FAQContactCard />
        </div>
    )
}