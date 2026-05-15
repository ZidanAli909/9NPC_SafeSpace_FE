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
import { ChevronRight, File, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles";
import { useAdmin } from "@/contexts/AdminContext";

function DashboardTable({
    reports
}) {
    return (
        <>
            {reports.length === 0 ? (
                <p className="text-center font-light">Tidak ada laporan...</p>
            ) : (
                reports.map((report) =>
                    <div key={report.id} className="flex flex-row gap-4 items-center py-2 px-4 border-t">
                        <div className="w-10 aspect-square flex justify-center items-center bg-secondary text-white rounded-md">
                            <File className="text-secondary-foreground" />
                        </div>

                        <div className="flex-1">
                            <p className="font-medium">{report.id}</p>

                            <div className="flex flex-row gap-1 text-xs">
                                <p>{report.incident}</p>
                                <p>·</p>
                                <p>{report.createdAt}</p>
                                <p>·</p>
                                <p>Anonim</p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-2">
                            <Badge variant="secondary">New</Badge>
                            <Badge>Important</Badge>
                        </div>
                    </div>
                )
            )}
        </>
    )
}

export function DashboardPage() {
    const { profile } = useProfile();
    const { reports, loadingReports } = useAdmin();
    // console.log(profile);

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
                    count="?"
                />
                <DashboardTile
                    titleStyle="bg-green-100 text-green-800 border border-green-500"
                    title="Selesai"
                    subtitle="penyelesaian ?%"
                    count={profile?.report.totalFinishedReports}
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
                            } />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loadingReports ? (
                            <Card className="w-32 mx-auto">
                                <CardContent className="flex flex-col items-center gap-2 p-2">
                                    <Loader2 className="animate-spin" />
                                    <p>Loading...</p>
                                </CardContent>
                            </Card>
                        ) : (
                            <DashboardTable reports={reports} />
                        )}
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