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
import { Link } from "react-router-dom"
import { UserReportTableItem } from "@/components/public/UserReportTable"
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"

export function ReportHistoryPage() {
    return (
        <div className={commonStyle_Page}>
            <div className={commonStyle_Section}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link to="/profile"/>}>Profile</BreadcrumbLink>
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
                <Table className="">
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
                        <UserReportTableItem />
                        <UserReportTableItem />
                        <UserReportTableItem />
                        <UserReportTableItem />
                        <UserReportTableItem />
                        <UserReportTableItem />
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}