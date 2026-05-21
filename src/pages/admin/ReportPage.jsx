import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
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
    InputGroupInput,
} from "@/components/ui/input-group"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useAdmin } from "@/contexts/AdminContext"
import { Eraser, Search, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { LoadingCard } from "@/components/common/LoadingCard"
import { cn, formatTimestamp } from "@/lib/utils"
import { categories, reportStatus } from "@/data/CommonSelectValues"

function ReportTable({
    reports
}) {
    return (
        <div>
            <div className="p-2 flex max-md:flex-col flex-row justify-between gap-2 mb-4 border rounded-xl">
                <div className="flex max-md:flex-col flex-row gap-2">
                    <Select items={reportStatus}>
                        <SelectTrigger className="max-md:w-full w-24 lg:w-32">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {reportStatus.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select items={categories}>
                        <SelectTrigger className="max-md:w-full  w-24 lg:w-43">
                            <SelectValue placeholder="Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {categories.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="max-md:w-full w-24 lg:w-32">
                            <SelectValue placeholder="Urutan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem key="asc" value="asc">
                                    Ascending
                                </SelectItem>
                                <SelectItem key="desc" value="desc">
                                    Descending
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Eraser/>
                        <p className="ml-2 md:hidden">Hapus Filter</p>
                    </Button>
                </div>

                <InputGroup className="max-md:w-full w-64">
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
                        <TableHead className="w-48">Detail</TableHead>
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
                                <TableCell>{formatTimestamp(report.createdAt)}</TableCell>
                                <TableCell>{report.incident}</TableCell>
                                <TableCell>
                                    <Badge>{report.status}</Badge>
                                </TableCell>
                                <TableCell className="flex flex-row gap-2">
                                    <Link
                                        to={"/admin/report/" + report.id}
                                        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                                    >
                                        Lihat Laporan
                                    </Link>
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
            <title>Safespace | Reports</title>

            <div className="mb-8">
                <p className="text-2xl font-semibold">Daftar Laporan</p>
            </div>

            <div className="max-w-5xl mx-auto">
                {loadingReports ? (
                    <LoadingCard />
                ) : (
                    <ReportTable reports={reports} />
                )}
            </div>
        </div>
    )
}