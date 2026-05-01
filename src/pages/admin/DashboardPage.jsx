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
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";

export function DashboardPage() {
    const { admin } = useAdmin();

    return (
        <div className="py-8 px-24 max-md:px-16 max-sm:px-8">

            <div className="mb-8">
                <p className="text-2xl font-semibold">Selamat pagi, Admin12345</p>
                <p>Ada beberapa laporan baru yang menunggu direview hari ini...</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <DashboardTile
                    titleStyle="bg-red-100 text-red-800 border border-red-500"
                    title="Total Laporan"
                    subtitle="sejak platform aktif"
                    count={admin?.report.totalReports}
                />
                <DashboardTile
                    titleStyle="bg-blue-100 text-blue-800 border border-blue-500"
                    title="Laporan Baru"
                    subtitle="minggu ini"
                    count={admin?.activity.WeeklyReportCount}
                />
                <DashboardTile
                    titleStyle="bg-yellow-100 text-yellow-800 border border-yellow-500"
                    title="Direview"
                    subtitle="perlu tindakan"
                    count="10"
                />
                <DashboardTile
                    titleStyle="bg-green-100 text-green-800 border border-green-500"
                    title="Selesai"
                    subtitle="penyelesaian ?%"
                    count={admin?.report.totalFinishedReports}
                />
            </div>

            <div className="flex flex-row gap-4">

                <Card className="flex-2">
                    <CardHeader>
                        <div className="flex flex-row justify-between items-center pl-4">
                            <CardTitle>Riwayat Laporan</CardTitle>
                            <Button render={
                                <Link to="/admin/report">
                                    Lihat Semua
                                    <ChevronRight />
                                </Link>
                            }/>
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