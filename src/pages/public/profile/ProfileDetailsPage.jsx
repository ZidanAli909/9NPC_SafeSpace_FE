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
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit2, Image, Info, Lock, LucideKeyRound, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"

export function ProfileDetailsPage() {
    return (
        <div className={commonStyle_Page}>
            <div className={commonStyle_Section}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>Profile</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Detil Profil</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className={commonStyle_Section + " max-w-4xl mx-auto"}>
                <p className="text-2xl font-semibold mb-4">Detil Profil</p>
            </div>

            <div className="flex max-md:flex-col flex-row gap-4 w-fit mx-auto">

                {/* Side Page */}
                {/* TODO: Responsive */}
                <div className="md:basis-48 lg:basis-64 flex flex-col max-md:flex-row gap-8 max-md:mx-auto items-center md:pt-4">
                    <Avatar className="w-32 h-32 md:mx-auto">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
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
                    <div className="mb-4">
                        <p className="font-medium text-lg">Informasi Akun</p>
                        <div className="text-sm grid grid-cols-4 max-lg:grid-cols-2 gap-2 p-4">
                            <p className="font-semibold">ID Pengguna</p>
                            <p className="font-light">USR-240410-001</p>
                            <p className="font-semibold">Tanggal Bergabung</p>
                            <p className="font-light">2 Januari 2026</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="font-medium text-lg">Data Akun</p>
                        <div className="text-sm grid grid-cols-4 max-lg:grid-cols-2 gap-2 p-4">
                            <p className="font-semibold">Nama</p>
                            <p className="font-light lg:col-span-3">John Doe Jane Doe</p>
                            <p className="font-semibold">Email</p>
                            <p className="font-light lg:col-span-3">2310511061@mahasiswa.upnvj.ac.id</p>
                            <p className="font-semibold">Nomor Telepon</p>
                            <p className="font-light lg:col-span-3">+62 812-3456-7890</p>
                            <p className="font-semibold">NIM</p>
                            <p className="font-light">2310511061</p>
                            <p className="font-semibold">Tahun Masuk</p>
                            <p className="font-light">2023</p>
                            <p className="font-semibold">Fakultas</p>
                            <p className="font-light">Ilmu Komputer</p>
                            <p className="font-semibold">Program Studi</p>
                            <p className="font-light">S1 Informatika</p>
                        </div>
                        <Button variant="outline" className="mb-4 lg:h-9">
                            <Edit2 className="mr-2" />
                            Ubah Data Pribadi
                        </Button>
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
                        <Button variant="secondary" className="lg:h-9">
                            <LucideKeyRound className="mr-2" />
                            Ganti Password
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}