import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { DashboardTile } from "@/components/admin/DashboardTile";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronRight, File, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles";
import { useAdmin } from "@/contexts/AdminContext";
import { DashboardIncidentsChart } from "@/components/admin/DashboardChartIncidents";
import { cn, formatTimestamp } from "@/lib/utils";

function DashboardTable({
    reports
}) {
    return (
        <>
            {reports.length === 0 ? (
                <p className="text-center text-sm font-light text-muted-foreground">
                    Tidak ada laporan...
                </p>
            ) : (
                reports.map((report) =>
                    <Item key={report.id} render={
                        <Link
                            to={`/admin/report/${report.id}`}
                            key={report.id}
                        >
                            <ItemMedia className="w-10 aspect-square bg-secondary text-white rounded-md">
                                <File className="text-secondary-foreground" />
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>{report.id}</ItemTitle>
                                <ItemDescription>
                                    {report.incident}
                                    {" · "}
                                    {formatTimestamp(report.createdAt)}
                                    {" · "}
                                    Anonim
                                </ItemDescription>
                            </ItemContent>
                            <div className="flex flex-row gap-2">
                                <Badge variant="secondary">New</Badge>
                                <Badge>Important</Badge>
                            </div>
                        </Link>
                    } variant="outline" className="min-h-17" />
                )
            )}
        </>
    )
}

export function DashboardPage() {
    const { profile } = useProfile();
    const { reports, loadingReports } = useAdmin();
    // console.log(profile);

    // console.log(reports);
    const reportArray = reports ?? []; // Data diformat khusus untuk chart
    // console.log(reportArray);

    return (
        <div className={commonStyle_Page}>

            <div className={commonStyle_Section}>
                <p className="text-2xl font-semibold">Selamat pagi, Admin12345</p>
                <p>Ada beberapa laporan baru yang menunggu direview hari ini...</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <DashboardTile
                    titleStyle="bg-red-100 text-red-800 border border-red-500"
                    title="Total Laporan"
                    subtitle="sejak platform aktif"
                    count={profile?.report.totalReports}
                />
                <DashboardTile
                    titleStyle="bg-blue-100 text-blue-800 border border-blue-500"
                    title="Laporan Baru"
                    subtitle="minggu ini"
                    count={profile?.activity.WeeklyReportCount}
                />
                <DashboardTile
                    titleStyle="bg-yellow-100 text-yellow-800 border border-yellow-500"
                    title="Direview"
                    subtitle="perlu tindakan"
                    count={profile?.report.totalReports - profile?.report.totalFinishedReports}
                />
                <DashboardTile
                    titleStyle="bg-green-100 text-green-800 border border-green-500"
                    title="Selesai"
                    subtitle="penyelesaian ?%"
                    count={profile?.report.totalFinishedReports}
                />
            </div>

            <div className="flex flex-row max-lg:flex-col gap-4">

                <Card className="flex-2">
                    <CardHeader>
                        <div className="flex flex-row justify-between items-center pl-4">
                            <CardTitle>Riwayat Laporan</CardTitle>
                            <Link
                                to="/admin/report"
                                className={cn(buttonVariants({ variant: "default" }))}
                            >
                                Lihat Semua
                                <ChevronRight />
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loadingReports ? (
                            <div className="mx-auto w-fit font-light text-sm text-muted-foreground flex flex-row items-center gap-2 p-4">
                                <Loader2 className="animate-spin" />
                                Loading...
                            </div>
                        ) : (
                            <DashboardTable reports={reports} />
                        )}
                    </CardContent>
                </Card>

                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle className="py-1">Kategori Laporan</CardTitle>
                    </CardHeader>
                    {loadingReports &&
                        <CardContent>
                            <div className="mx-auto w-fit font-light text-sm text-muted-foreground flex flex-row items-center gap-2 p-4">
                                <Loader2 className="animate-spin" />
                                Loading...
                            </div>
                        </CardContent>}
                    {!loadingReports && reportArray.length > 0 &&
                        <CardContent>
                            <DashboardIncidentsChart reportArray={reportArray} />
                        </CardContent>}
                </Card>
            </div>
        </div>
    )
}