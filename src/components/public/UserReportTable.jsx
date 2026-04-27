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
import { Link } from "react-router-dom"

export function UserReportTableItem({
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
                <Button variant="outline" size="sm" render={<Link to="/profile/history/1"/>}>
                    Lihat Laporan
                </Button>
            </TableCell>
        </TableRow>
    )
}