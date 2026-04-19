import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DashboardTile } from "@/components/admin/DashboardTile";
import { Button } from "@/components/ui/button";
import { DashboardReportTableItem } from "@/components/admin/DashboardReportTable";

export function DashboardPage() {
    return (
        <div className="py-8 px-24">

            <div className="mb-8">
                <p className="text-2xl font-semibold">Selamat pagi, Admin12345</p>
                <p>Ada beberapa laporan baru yang menunggu direview hari ini...</p>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
                <DashboardTile />
                <DashboardTile />
                <DashboardTile />
                <DashboardTile />
            </div>

            <div className="flex flex-row gap-4">

                <Card className="flex-2">
                    <CardHeader>
                        <div className="flex flex-row justify-between items-center pl-4">
                            <CardTitle>Riwayat Laporan</CardTitle>
                            <Button>Lihat Semua</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <DashboardReportTableItem />
                        <DashboardReportTableItem />
                        <DashboardReportTableItem />
                        <DashboardReportTableItem />
                    </CardContent>
                </Card>

                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Kategori Laporan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Lorem Ipsum Dolor Sit Amet
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}