import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { Eraser, Loader2, Search, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { cn, formatTimestamp } from "@/lib/utils"
import { categories, reportStatus } from "@/data/CommonSelectValues"
import { useAdminReports } from "@/contexts/AdminReportsContext"
import { useDebouncedCallback } from "use-debounce"
import { AnimatedEllipsis } from "@/components/common/AnimatedEllipsis"

function ReportTable() {
    const {
        reports,
        loadingReports,
        pagination,
        page,
        setPage,
        limit,
        setLimit,
        filters,
        updateFilters,
        resetFilters,
    } = useAdminReports();
    // console.log(reports);

    const debouncedSearch = useDebouncedCallback(
        (value) => updateFilters({ search: value }),
        500
    )
    return (
        <div>
            <div className="p-2 flex max-md:flex-col flex-row justify-between gap-2 mb-4 border rounded-xl">
                <div className="flex max-md:flex-col flex-row gap-2">
                    <Select
                        id="status"
                        items={reportStatus}
                        value={filters.status}
                        onValueChange={(value) => updateFilters({ status: value })}
                    >
                        <SelectTrigger className="max-md:w-full w-24 lg:w-32">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent><SelectGroup>
                            {reportStatus.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup></SelectContent>
                    </Select>
                    <Select
                        id="category"
                        items={categories}
                        value={filters.category}
                        onValueChange={(value) => updateFilters({ category: value })}
                    >
                        <SelectTrigger className="max-md:w-full  w-24 lg:w-43">
                            <SelectValue placeholder="Kategori" />
                        </SelectTrigger>
                        <SelectContent><SelectGroup>
                            {categories.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup></SelectContent>
                    </Select>
                    <Select
                        id="order"
                        value={filters.sortOrder}
                        onValueChange={(value) => updateFilters({ sortOrder: value })}
                    >
                        <SelectTrigger className="max-md:w-full w-24 lg:w-32">
                            <SelectValue placeholder="Urutan" />
                        </SelectTrigger>
                        <SelectContent><SelectGroup>
                            <SelectItem key="asc" value="asc">
                                Ascending
                            </SelectItem>
                            <SelectItem key="desc" value="desc">
                                Descending
                            </SelectItem>
                        </SelectGroup></SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        onClick={() => resetFilters()}
                    >
                        <Eraser />
                        <p className="ml-2 md:hidden">Hapus Filter</p>
                    </Button>
                </div>
                <InputGroup className="max-md:w-full w-64">
                    <InputGroupInput
                        placeholder="Cari.."
                        defaultValue={filters.search}
                        onChange={e => debouncedSearch(e.target.value)}
                    />
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
                    {loadingReports ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center font-light text-muted-foreground">
                                <div className="flex flex-row justify-center items-center">
                                    <Loader2 className="mr-2 animate-spin" />
                                    Loading
                                    <AnimatedEllipsis />
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        reports.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center font-light text-muted-foreground">
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
                                        {/* <Button variant="destructive" size="sm">
                                            <Trash />
                                        </Button> */}
                                    </TableCell>
                                </TableRow>
                            )
                        )
                    )}
                </TableBody>
            </Table>

            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setPage(p => p - 1)}
                            className={!pagination.hasPrev ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 1)
                        .reduce((acc, p, idx, arr) => {
                            if (idx > 0 && p - arr[idx - 1] > 1) acc.push("ellipsis");
                            acc.push(p);
                            return acc;
                        }, [])
                        .map((p, idx) =>
                            p === "ellipsis" ? (
                                <PaginationItem key={`ellipsis-${idx}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            ) : (
                                <PaginationItem key={p}>
                                    <PaginationLink
                                        onClick={() => setPage(p)}
                                        isActive={page === p}
                                        className="cursor-pointer"
                                    >
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        )
                    }
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setPage(p => p + 1)}
                            className={!pagination.hasNext ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export function ReportPage() {
    return (
        <div className="py-8 px-24 max-md:px-16 max-sm:px-8">
            <title>Safespace | Reports</title>

            <div className="mb-8">
                <p className="text-2xl font-semibold">Daftar Laporan</p>
            </div>

            <div className="max-w-5xl mx-auto">
                <ReportTable />
            </div>
        </div>
    )
}