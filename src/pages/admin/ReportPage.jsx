import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { useAdmin } from "@/contexts/AdminContext"
import { Loader2, Search, Trash } from "lucide-react"
import { Link } from "react-router-dom"

function ReportTable({
    reports
}) {
    return (
        <div>
            <div className="flex flex-row justify-between mb-4">
                <div>
                    <p>Filters disini...</p>
                </div>

                <InputGroup className="w-xs">
                    <InputGroupInput placeholder="Cari.." />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                </InputGroup>
            </div>

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
                            <TableCell colSpan={5} className="font-light">
                                Tidak ada laporan...
                            </TableCell>
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
                                    <Button variant="outline" size="sm" render={<Link to={"/admin/report/" + report.id} />}>
                                        Lihat Laporan
                                    </Button>
                                    <Button variant="destructive" size="sm">
                                        <Trash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>

            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export function ReportPage() {
    const { reports, loadingReports } = useAdmin();
    // console.log(reports);

    return (
        <div className="py-8 px-24 max-md:px-16 max-sm:px-8">
            <div className="mb-8">
                <p className="text-2xl font-semibold">Daftar Laporan</p>
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
                    <ReportTable reports={reports} />
                )}
            </div>
        </div>
    )
}