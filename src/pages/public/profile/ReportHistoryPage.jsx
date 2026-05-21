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
import { cn, formatTimestamp } from "@/lib/utils"
import { useReports } from "@/contexts/ReportsContext"
import { useDebouncedCallback } from "use-debounce"
import { categories } from "@/data/CommonSelectValues"
import { Eraser, Loader2, Search } from "lucide-react"
import { AnimatedEllipsis } from "@/components/common/AnimatedEllipsis"

function ReportHistoryTable() {
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
    } = useReports();
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
                                            to={"/profile/history/" + report.id}
                                            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                                        >
                                            Lihat Laporan
                                        </Link>
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

export function ReportHistoryPage() {
    return (
        <div className={commonStyle_Page}>
            <title>Safespace | Report History</title>

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
                <ReportHistoryTable />
            </div>
        </div>
    )
}