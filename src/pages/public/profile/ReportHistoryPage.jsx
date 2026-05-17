import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"
import { useReport } from "@/contexts/ReportContext"
import { LoadingCard } from "@/components/common/LoadingCard"
import { cn, formatTimestamp } from "@/lib/utils"

function ReportHistoryTable({
    reports
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-32">ID Laporan</TableHead>
                    <TableHead className="w-48">Tanggal Laporan</TableHead>
                    <TableHead>Jenis Laporan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-48">Detil</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reports.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="font-light">Tidak ada laporan...</TableCell>
                    </TableRow>
                ) : (
                    reports.map((report) =>
                        <TableRow key={report.id}>
                            <TableCell className="font-medium">{report.id}</TableCell>
                            <TableCell>{formatTimestamp(report.createdAt)}</TableCell>
                            <TableCell>{report.incident}</TableCell>
                            <TableCell>
                                <Badge>{report.status}</Badge>
                            </TableCell>
                            <TableCell className="flex flex-row gap-2">
                                <Link
                                    to={"/profile/history/" + report.id}
                                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                                >
                                    Lihat Laporan
                                </Link>
                            </TableCell>
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
    )
}

export function ReportHistoryPage() {
    const { reports, loadingReports } = useReport();

    return (
        <div className={commonStyle_Page}>
            <div className={commonStyle_Section}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link to="/profile" />}>Profil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Riwayat Laporan</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className={commonStyle_Section + " max-w-4xl mx-auto"}>
                <p className="text-2xl font-semibold mb-4">Riwayat Laporan</p>
            </div>

            <div className="max-w-5xl mx-auto">
                {loadingReports ? (
                    <LoadingCard />
                ) : (
                    <ReportHistoryTable reports={reports} />
                )}
            </div>
        </div>
    )
}