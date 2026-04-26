import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Download, History, Phone, Plus, X } from "lucide-react"
import { Link } from "react-router-dom"

export function ReportHistoryDetailsPage() {
    return (
        <div className="py-8 px-24 max-md:px-16 max-sm:px-8">
            <div className="mb-8">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link to="/profile"/>}>Profile</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link to="/profile/history"/>}>Riwayat Laporan</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Laporan ID sekian</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="mb-8 flex flex-row justify-between">

                {/* Title and Status Badge */}
                <div>
                    <p className="text-2xl font-semibold mb-2">ID Laporan #SAFE24041006</p>
                    <div className="flex flex-row gap-4">
                        <Badge>Laporan Diterima</Badge>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row gap-2">
                    <Button variant="outline">
                        <History className="mr-2" />
                        Riwayat Status Laporan
                    </Button>
                    <Button variant="secondary">
                        <Download className="mr-2" />
                        Download Laporan (PDF)
                    </Button>
                    <Button variant="secondary">
                        <Phone className="mr-2" />
                        Hubungi Admin
                    </Button>
                    <Button variant="destructive">
                        <X className="mr-2" />
                        Batalkan Laporan
                    </Button>
                </div>
            </div>

            <div className="flex-1 border rounded-lg p-8">
                <div className="mb-4">
                    <p className="font-medium text-lg">Informasi Umum</p>
                    <div className="text-sm grid grid-cols-4 gap-2 p-4">
                        <p className="font-semibold">Tanggal Pelaporan</p>
                        <p className="font-light">10 April 2026 15:45</p>
                        <p className="font-semibold">ID Laporan</p>
                        <p className="font-light">#SAFE24041006</p>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="font-medium text-lg">Detil Kejadian </p>
                    <div className="text-sm grid grid-cols-4 gap-2 p-4">
                        <p className="font-semibold">Jenis Kejadian</p>
                        <p className="font-light">Kekerasan verbal</p>
                        <p className="font-semibold">Tanggal Kejadian</p>
                        <p className="font-light">9 April 2026 17:25</p>
                        <p className="font-semibold">Lokasi Kejadian</p>
                        <p className="font-light col-span-3">Ruang Baca Lantai 3, Gedung Perpustakaan Kampus</p>
                        <p className="font-semibold">Deskripsi Kronologi</p>
                        <p className="font-light col-span-3">Saat itu saya sedang mengerjakan tugas sendirian di ruang baca.  Tiba-tiba seorang mahasiswa laki-laki (tidak dikenal) duduk di seberang  saya dan mulai berkomentar tentang cara saya duduk. Ia mengatakan "kamu  tuh duduknya nggak sopan, mana berani pakai baju begini". Saya coba  diamkan, tapi ia terus mengucapkan kata-kata kasar seperti "dasar cewek  kurang ajar" dan "pantesan dilecehin orang". Saya merasa terintimidasi  dan segera meninggalkan ruangan.</p>
                        <p className="font-semibold">Deskripsi Pelaku</p>
                        <p className="font-light col-span-3">Laki-laki, tinggi sekitar 170 cm, rambut hitam pendek, memakai kemeja abu-abu. Tidak mengetahui nama atau NIM.</p>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="font-medium text-lg mb-4">Bukti Kejadian</p>
                    <div className="rounded-lg border p-4 min-h-32 mb-2">
                        <p className="text-sm italic text-muted-foreground">Tidak ada bukti...</p>
                    </div>
                    <Button variant="outline" size="lg">
                        <Plus className="mr-2" />
                        Tambahkan Bukti
                    </Button>
                </div>

                <div>
                    <p className="italic text-sm">*Proses ini membutuhkan waktu dan kesabaran. Kamu tidak sendirian. Tim pendamping siap membantu kapan pun.</p>
                </div>
            </div>
        </div>
    )
}