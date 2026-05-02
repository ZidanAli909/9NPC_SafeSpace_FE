import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

export function ReportTableItem({
    id,
    date,
    type,
    status
}) {
    return (
        <TableRow>
            <TableCell className="font-medium">#SAFE24041006</TableCell>
            <TableCell>10 April 2026 15:45</TableCell>
            <TableCell>Kekerasan verbal</TableCell>
            <TableCell>
                <Badge>Laporan Diterima</Badge>
            </TableCell>
            <TableCell className="flex flex-row gap-2">
                <Button variant="outline" size="sm">
                    Lihat Laporan
                </Button>
                <Button variant="destructive" size="sm">
                    <Trash />
                </Button>
            </TableCell>
        </TableRow>
    )
}