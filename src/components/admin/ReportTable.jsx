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

export function ReportTableItem() {
    return (
        <TableRow>
            <TableCell className="font-medium">#SAFE24041006</TableCell>
            <TableCell>10 April 2026 15:45</TableCell>
            <TableCell>Kekerasan verbal</TableCell>
            <TableCell>
                <Badge variant="primary">Laporan Diterima</Badge>
            </TableCell>
            <TableCell className="flex flex-row gap-2">
                <Button variant="secondary">
                    Lihat Laporan
                </Button>
                <Button variant="destructive">
                    <Trash />
                </Button>
            </TableCell>
        </TableRow>
    )
}