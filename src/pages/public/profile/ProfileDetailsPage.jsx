import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit2, Image, Info, Lock, LucideKeyRound, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"
import { useProfile } from "@/contexts/ProfileContext"
import { Skeleton } from "@/components/ui/skeleton"
import { cn, formatTimestamp } from "@/lib/utils"
import { toast } from "sonner"

function DetailsProfileSkeleton() {
    return (
        <>
            <div className="mb-4">
                <Skeleton className="h-5 w-full" />
                <div className="text-sm grid grid-cols-4 max-lg:grid-cols-2 gap-2 p-4">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full lg:col-span-3" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full lg:col-span-3" />
                </div>
            </div>

            <div className="mb-4">
                <Skeleton className="h-5 w-full" />
                <div className="text-sm grid grid-cols-4 max-lg:grid-cols-2 gap-2 p-4">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full lg:col-span-3" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full lg:col-span-3" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full lg:col-span-3" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                </div>
                <Skeleton className="h-8 w-48 mb-4" />
            </div>

            <div className="mb-4">
                <Skeleton className="h-5 w-full mb-4" />
                <Skeleton className="h-8 w-48" />
            </div>
        </>
    )
}

function DetailsProfile({
    profile,
}) {
    return (
        <>
            <div className="mb-4">
                <p className="font-medium text-lg">Informasi Akun</p>
                <div className="text-sm grid grid-cols-4 max-lg:grid-cols-2 gap-2 p-4">
                    <p className="font-semibold">ID Pengguna</p>
                    <p className="font-light lg:col-span-3">{profile?.id ?? "-"}</p>
                    <p className="font-semibold">Tanggal Bergabung</p>
                    <p className="font-light lg:col-span-3">{formatTimestamp(profile?.createdAt) ?? "-"}</p>
                </div>
            </div>

            <div className="mb-4">
                <p className="font-medium text-lg">Data Akun</p>
                <div className="text-sm grid grid-cols-4 max-lg:grid-cols-2 gap-2 p-4">
                    <p className="font-semibold">Nama</p>
                    <p className="font-light lg:col-span-3">{profile?.name ?? "-"}</p>
                    <p className="font-semibold">Email</p>
                    <p className="font-light lg:col-span-3">{profile?.email ?? "-"}</p>
                    <p className="font-semibold">Nomor Telepon</p>
                    <p className="font-light lg:col-span-3">{profile?.phoneNumber ?? "-"}</p>
                    <p className="font-semibold">NIM</p>
                    <p className="font-light">{profile?.nim ?? "-"}</p>
                    <p className="font-semibold">Tahun Masuk</p>
                    <p className="font-light">{profile?.enrollmentYear ?? "-"}</p>
                    <p className="font-semibold">Fakultas</p>
                    <p className="font-light">{profile?.faculty ?? "-"}</p>
                    <p className="font-semibold">Program Studi</p>
                    <p className="font-light">{profile?.department ?? "-"}</p>
                </div>
                <Link to="/profile/edit" className={cn(buttonVariants({ variant: "outline" }), "mb-4 lg:h-9")}>
                    <Edit2 className="mr-2" />
                    Ubah Data Pribadi
                </Link>
                <Alert className="bg-secondary text-secondary-foreground">
                    <Info />
                    <AlertTitle>Notice</AlertTitle>
                    <AlertDescription>
                        Data akun wajib diisi untuk keperluan internal admin dan  komunikasi dengan Anda. Laporan yang dibuat akan otomatis bersifat  anonim. Identitas Anda tidak akan pernah kami bocorkan.
                    </AlertDescription>
                </Alert>
            </div>

            <div className="mb-4">
                <p className="font-medium text-lg mb-4">Password</p>
                <Button
                    variant="secondary"
                    className="lg:h-9"
                >
                    <LucideKeyRound className="mr-2" />
                    Ganti Password
                </Button>
            </div>
        </>
    )
}

export function ProfileDetailsPage() {
    const { profile, loadingProfile } = useProfile();

    return (
        <div className={commonStyle_Page}>
            <div className={commonStyle_Section}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>Profil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Detail Profil</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className={commonStyle_Section + " max-w-4xl mx-auto"}>
                <p className="text-2xl font-semibold mb-4">Detail Profil</p>
            </div>

            <div className="flex max-md:flex-col flex-row gap-4 max-w-4xl mx-auto">

                {/* Side Page */}
                {/* TODO: Responsive */}
                <div className="md:basis-48 lg:basis-64 flex flex-col max-md:flex-row gap-8 max-md:mx-auto items-center md:pt-4">
                    <Avatar className="w-32 h-32 md:mx-auto">
                        <AvatarImage src={profile?.profilePictureUrl} alt={"Foto profil " + profile?.name} className="bg-black" />
                        <AvatarFallback className="text-6xl">
                            {profile && profile.name != null
                                        ? profile.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .substring(0, 2)
                                            .toUpperCase()
                                        : "?"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-4 max-lg:gap-2 lg:mx-auto">
                        <Button variant="outline" className="lg:h-9">
                            <Image />
                            Ganti Foto Profil
                        </Button>
                        <Button variant="outline" className="lg:h-9 text-destructive">
                            <Trash />
                            Hapus Foto Profil
                        </Button>
                    </div>
                </div>

                {/* Main Page */}
                <div className="flex-1 border rounded-lg p-8 max-w-3xl">
                    {!loadingProfile ? <DetailsProfile profile={profile} /> : <DetailsProfileSkeleton />}
                </div>
            </div>
        </div>
    )
}