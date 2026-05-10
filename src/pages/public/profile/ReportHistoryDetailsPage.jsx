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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { useReport } from "@/contexts/ReportContext"
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"
import { Download, Edit2, History, ImageOff, Loader2, MoreVertical, Phone, Plus, X } from "lucide-react"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Separator } from "@/components/ui/separator"

function ReportHistoryDetailsDetail({
    report,
}) {
    return (
        <>
            <div className={commonStyle_Section + " flex flex-row justify-between max-w-4xl mx-auto"}>

                {/* Title and Status Badge */}
                <div>
                    <p className="text-2xl font-semibold mb-2">Laporan {report?.id}</p>
                    <div className="flex flex-row gap-4">
                        <Badge>{report?.status}</Badge>
                    </div>
                </div>

                {/* Dropdown Menu */}
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
                        <DropdownMenuItem>
                            <Download className="mr-2" />
                            Download Laporan (PDF)
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Phone className="mr-2" />
                            Hubungi Admin
                        </DropdownMenuItem>
                        {report?.status !== "CANCELLED" && (
                            <DropdownMenuItem className="text-destructive">
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
                        <p className="font-light">{report?.createdAt}</p>
                        <p className="font-semibold">ID Laporan</p>
                        <p className="font-light">{report?.id}</p>
                    </div>
                </div>

                <div className="mb-4 max-mod:mb-2">
                    <p className="font-medium text-lg">Detil Kejadian </p>
                    <div className="text-sm grid grid-cols-4 max-md:grid-cols-2 gap-2 max-md:gap-1 p-4 max-md:p-2">
                        <p className="font-semibold">Jenis Kejadian</p>
                        <p className="font-light">{report?.incident}</p>
                        <p className="font-semibold">Tanggal Kejadian</p>
                        <p className="font-light">{report?.date}</p>
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
                            <div key={evidence} className="w-64 h-64 border rounded-md p-2 bg-background flex flex-col relative mr-12">
                                <p className="text-xs">ID {evidence.id}</p>
                                <p className="text-xs italic text-muted-foreground">Dibuat: {evidence.createdAt}</p>
                                <div className="rounded-sm bg-muted flex-1 overflow-clip text-muted-foreground">
                                    {evidence.signedUrl ?
                                    <img src={evidence.signedUrl} className="object-contain w-full h-full"/> :
                                    <ImageOff className="size-16 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>}
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
    const { report, loadingReport, fetchReportById } = useReport();

    useEffect(() => {
        if (id) fetchReportById(id);
    }, [id, fetchReportById]);

    return (
        <div className={commonStyle_Page}>
            <div className={commonStyle_Section}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link to="/profile" />}>Profile</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link to="/profile/history" />}>Riwayat Laporan</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="truncate">Detil Laporan {id}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {loadingReport ? (
                <Card className="w-32 mx-auto">
                    <CardContent className="flex flex-col items-center gap-2 p-2">
                        <Loader2 className="animate-spin" />
                        <p>Loading...</p>
                    </CardContent>
                </Card>
            ) : (
                <ReportHistoryDetailsDetail report={report} />
            )}
        </div>
    )
}