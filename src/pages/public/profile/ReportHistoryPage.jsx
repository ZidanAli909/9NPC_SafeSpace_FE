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
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"
import { useReport } from "@/contexts/ReportContext"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

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
                            <TableCell>{report.createdAt}</TableCell>
                            <TableCell>{report.incident}</TableCell>
                            <TableCell>
                                <Badge>{report.status}</Badge>
                            </TableCell>
                            <TableCell className="flex flex-row gap-2">
                                <Button variant="outline" size="sm" render={<Link to={"/profile/history/" + report.id} />}>
                                    Lihat Laporan
                                </Button>
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
                            <BreadcrumbLink render={<Link to="/profile" />}>Profile</BreadcrumbLink>
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
                    <Card className="w-32 mx-auto">
                        <CardContent className="flex flex-col items-center gap-2 p-2">
                            <Loader2 className="animate-spin" />
                            <p>Loading...</p>
                        </CardContent>
                    </Card>
                ) : (
                    <ReportHistoryTable reports={reports} />
                )}
            </div>
        </div>
    )
}