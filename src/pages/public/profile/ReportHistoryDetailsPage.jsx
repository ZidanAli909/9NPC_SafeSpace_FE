import jsPDF from "jspdf"
import { useReport } from "@/contexts/ReportContext"
import { ReportService } from "@/services/ReportService"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"
import { Download, Edit2, History, ImageOff, MoreVertical, Phone, Plus, X } from "lucide-react"
import { formatDate, formatTimestamp } from "@/lib/utils"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { LoadingCard } from "@/components/common/LoadingCard"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function ReportHistoryDetailsDetail({ report }) {
    const { refreshReport } = useReport()

    function handleDownloadPDF() {
        const doc = new jsPDF()
        doc.setFontSize(16)
        doc.text("Laporan SafeSpace", 20, 20)
        doc.setFontSize(12)
        doc.text(`ID Laporan: ${report?.id}`, 20, 35)
        doc.text(`Status: ${report?.status}`, 20, 45)
        doc.text(`Tanggal Pelaporan: ${formatTimestamp(report?.createdAt)}`, 20, 55)
        doc.text("Detail Kejadian:", 20, 70)
        doc.text(`Jenis Kejadian: ${report?.incident}`, 20, 80)
        doc.text(`Tanggal Kejadian: ${formatDate(report?.date)}`, 20, 90)
        doc.text(`Lokasi: ${report?.location}`, 20, 100)
        const incidentDesc = doc.splitTextToSize(`Deskripsi: ${report?.incidentDesc}`, 170)
        doc.text(incidentDesc, 20, 110)
        const perpetratorDesc = doc.splitTextToSize(`Pelaku: ${report?.perpetratorDesc}`, 170)
        doc.text(perpetratorDesc, 20, 130)
        doc.save(`laporan-${report?.id}.pdf`)
    }

    function handleHubungiAdmin() {
        window.open("mailto:support@safespace.id?subject=Pertanyaan%20Laporan%20" + report?.id)
    }

    async function handleBatalkan() {
        if (!confirm("Yakin ingin membatalkan laporan ini?")) return
        try {
            await ReportService.cancelReport(report?.id)
            toast.success("Laporan berhasil dibatalkan!")
            fetchReportById(report?.id)
        } catch (error) {
            toast.error("Gagal membatalkan laporan!")
        }
    }

    return (
        <>
            <div className={commonStyle_Section + " flex flex-row justify-between max-w-4xl mx-auto"}>
                <div>
                    <p className="text-2xl font-semibold mb-2">Laporan {report?.id}</p>
                    <div className="flex flex-row gap-4">
                        <Badge>{report?.status}</Badge>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="outline" size="lg"/>}>
                        <MoreVertical />
                        <p className="max-md:hidden">Aksi</p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-fit">
                        <DropdownMenuItem>
                            <History className="mr-2" />
                            Riwayat Status Laporan
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDownloadPDF}>
                            <Download className="mr-2" />
                            Download Laporan (PDF)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleHubungiAdmin}>
                            <Phone className="mr-2" />
                            Hubungi Admin
                        </DropdownMenuItem>
                        {report?.status !== "CANCELLED" && (
                            <DropdownMenuItem className="text-destructive" onClick={handleBatalkan}>
                                <X className="mr-2" />
                                Batalkan Laporan
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex-1 border rounded-lg p-8 max-md:py-4 max-md:px-6 max-w-5xl mx-auto">
                <div className="mb-4 max-mod:mb-2">
                    <p className="font-medium text-lg">Informasi Umum</p>
                    <div className="text-sm grid grid-cols-4 max-md:grid-cols-2 gap-2 max-md:gap-1 p-4 max-md:p-2">
                        <p className="font-semibold">Tanggal Pelaporan</p>
                        <p className="font-light">{formatTimestamp(report?.createdAt)}</p>
                        <p className="font-semibold">ID Laporan</p>
                        <p className="font-light">{report?.id}</p>
                    </div>
                </div>

                <div className="mb-4 max-mod:mb-2">
                    <p className="font-medium text-lg">Detail Kejadian</p>
                    <div className="text-sm grid grid-cols-4 max-md:grid-cols-2 gap-2 max-md:gap-1 p-4 max-md:p-2">
                        <p className="font-semibold">Jenis Kejadian</p>
                        <p className="font-light">{report?.incident}</p>
                        <p className="font-semibold">Tanggal Kejadian</p>
                        <p className="font-light">{formatDate(report?.date)}</p>
                        <p className="font-semibold">Lokasi Kejadian</p>
                        <p className="font-light md:col-span-3">{report?.location}</p>
                        <p className="font-semibold">Deskripsi Kronologi</p>
                        <p className="font-light md:col-span-3">{report?.incidentDesc}</p>
                        <p className="font-semibold">Deskripsi Pelaku</p>
                        <p className="font-light md:col-span-3">{report?.perpetratorDesc}</p>
                    </div>
                </div>

                <div className="mb-4 max-mod:mb-2">
                    <p className="font-medium text-lg mb-4">Bukti Kejadian</p>
                    <div className="rounded-lg border p-4 min-h-32 mb-2 bg-accent flex flex-row overflow-x-auto">
                        {report?.evidenceAssets.length > 0 ? report.evidenceAssets.map((evidence) =>
                            <div key={evidence.id} className="w-64 h-64 border rounded-md p-2 bg-background flex flex-col relative mr-12">
                                <p className="text-xs">ID {evidence.id}</p>
                                <p className="text-xs italic text-muted-foreground">Dibuat: {formatTimestamp(evidence.createdAt)}</p>
                                <div className="rounded-sm bg-muted flex-1 overflow-clip text-muted-foreground">
                                    {evidence.signedUrl ?
                                        <img src={evidence.signedUrl} className="object-contain w-full h-full" /> :
                                        <ImageOff className="size-16 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                                </div>
                                <Button variant="outline" size="icon" className="absolute -right-10.5">
                                    <Edit2 />
                                </Button>
                                <Button variant="outline" size="icon" className="absolute -right-10.5 top-12 text-destructive">
                                    <X />
                                </Button>
                            </div>
                        ) : (
                            <p className="text-sm italic text-muted-foreground">Tidak ada bukti...</p>
                        )}
                    </div>
                    <Button variant="outline" className="lg:h-9">
                        <Plus className="mr-2" />
                        Tambahkan Bukti
                    </Button>
                </div>

                <div>
                    <p className="italic text-sm">*Proses ini membutuhkan waktu dan kesabaran. Kamu tidak sendirian. Tim pendamping siap membantu kapan pun.</p>
                </div>
            </div>
        </>
    )
}

export function ReportHistoryDetailsPage() {
    const { id } = useParams()
    const { report, loadingReport, refreshReport } = useReport()

    useEffect(() => {
        if (id) refreshReport(id)
    }, [id, refreshReport])

    return (
        <div className={commonStyle_Page}>
            <title>Safespace | Report Details</title>
            <div className={commonStyle_Section}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link to="/profile" />}>Profil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link to="/profile/history" />}>Riwayat Laporan</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="truncate">Detail Laporan</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {loadingReport ? (
                <LoadingCard />
            ) : (
                <ReportHistoryDetailsDetail report={report} />
            )}
        </div>
    )
}