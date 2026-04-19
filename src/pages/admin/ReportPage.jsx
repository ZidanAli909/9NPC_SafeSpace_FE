import { ReportTableItem } from "@/components/admin/ReportTable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Search } from "lucide-react"

export function ReportPage() {
    return (
        <div className="py-8 px-24">
            <div className="mb-8">
                <p className="text-2xl font-semibold">Daftar Laporan</p>
            </div>

            <div>
                <div className="flex flex-row justify-between mb-4">
                    <div>
                        <p>Filters disini...</p>
                    </div>

                    <InputGroup className="w-96">
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
                        <ReportTableItem />
                        <ReportTableItem />
                        <ReportTableItem />
                        <ReportTableItem />
                        <ReportTableItem />
                        <ReportTableItem />
                        <ReportTableItem />
                        <ReportTableItem />
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}