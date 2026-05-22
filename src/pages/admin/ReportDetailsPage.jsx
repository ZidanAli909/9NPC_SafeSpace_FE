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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"
import { CircleAlert, ImageOff, Loader2, MoreVertical, Download, History } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { reportStatus } from "@/data/CommonSelectValues"
import { LoadingCard } from "@/components/common/LoadingCard"
import { formatDate, formatTimestamp } from "@/lib/utils"
import { AdminService } from "@/services/AdminService"
import { toast } from "sonner"
import { useAdminReport } from "@/contexts/AdminReportContext"

function ReportDetailsDetail({
    report,
    onRefresh
}) {
    const [status, setStatus] = useState(report?.status ?? "");
    const [errorStatus, setErrorStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleStatusChange = (newValue) => {
        setStatus(newValue);
        // console.log("Status diubah di lokal menjadi:", newValue);
    }

    const handleSaveStatus = async () => {
        setIsLoading(true);
        setErrorStatus(null);
        // console.log("Status: ", status);
        try {
            const response = await AdminService.updateReportStatus(report?.id, status);
            toast.success(response.message);
            onRefresh();
        } catch (error) {
            console.log("Terjadi kesalahan dalam mengubah status: ", error);
            toast.error("Terjadi kesalahan dalam mengubah status.");
            setErrorStatus(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className={commonStyle_Section + " flex flex-row justify-between max-w-4xl mx-auto"}>

                {/* Title and Status Badge */}
                <div>
                    <p className="text-2xl font-semibold mb-2">Laporan {report?.reportCode}</p>
                    <div className="flex flex-row gap-4">
                        <Badge>{report?.status}</Badge>
                    </div>
                </div>

                {/* Dropdown Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="outline" size="lg" />}>
                        <MoreVertical />
                        <p className="max-md:hidden">Aksi</p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-fit">
                        <DropdownMenuItem onClick={() => toast.info("Maaf, fitur ini belum tersedia!")}>
                            <History className="mr-2" />
                            Riwayat Status Laporan
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info("Maaf, fitur ini belum tersedia!")}>
                            <Download className="mr-2" />
                            Download Laporan (PDF)
                        </DropdownMenuItem>
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
                    <p className="font-medium text-lg">Detail Kejadian </p>
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
                            <div key={evidence} className="w-64 h-64 border rounded-md p-2 bg-background flex flex-col relative mr-4">
                                <p className="text-xs">ID {evidence.id}</p>
                                <p className="text-xs italic text-muted-foreground">Dibuat: {formatTimestamp(evidence.createdAt)}</p>
                                <div className="rounded-sm bg-muted flex-1 overflow-clip text-muted-foreground">
                                    {evidence.signedUrl ?
                                        <img src={evidence.signedUrl} className="object-contain w-full h-full" /> :
                                        <ImageOff className="size-16 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm italic text-muted-foreground">Tidak ada bukti...</p>
                        )}
                    </div>
                </div>

                <div className="mb-4 max-mod:mb-2">
                    <p className="font-medium text-lg mb-4">Status Kejadian</p>
                    <div className="flex flex-row gap-4 max-sm:w-full">
                        <Select
                            key={report?.status} 
                            value={status} 
                            onValueChange={handleStatusChange}
                            disabled={isLoading}
                        >
                            <SelectTrigger className="w-xs max-sm:w-full">
                                <SelectValue placeholder="Status pelaporan"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {reportStatus.map((status) => (
                                        <SelectItem key={status.value} value={status.value} >
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button onClick={handleSaveStatus} disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 animate-spin" />}
                            Simpan
                        </Button>
                    </div>
                    {errorStatus && <Alert className="mt-4 w-fit max-sm:w-full text-destructive">
                        <CircleAlert />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{errorStatus}</AlertDescription>
                    </Alert>}
                </div>
            </div>
        </>
    )
}

export function ReportDetailsPage() {
    const { id } = useParams()
    const { report, loadingReport, refreshReport } = useAdminReport();

    useEffect(() => {
        if (id) refreshReport(id);
    }, [id, refreshReport]);

    return (
        <div className={commonStyle_Page}>
            <title>Safespace | Report: {report?.id ?? "Details"}</title>

            <div className={commonStyle_Section}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link to="/admin/report" />}>Laporan</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="truncate">Detail Laporan {report?.reportCode}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {loadingReport ? (
                <LoadingCard />
            ) : (
                <ReportDetailsDetail
                    report={report}
                    onRefresh={() => refreshReport(id)}
                />
            )}
        </div>
    )
}