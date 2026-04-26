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
import { Edit2, Info, Lock, LucideKeyRound } from "lucide-react"
import { Link } from "react-router-dom"

export function ProfileDetailsPage() {
    return (
        <div className="py-8 px-24 max-md:px-16 max-sm:px-8">
            <div className="mb-8">
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

            <div className="mb-8">
                <p className="text-2xl font-semibold mb-4">Detil Profil</p>
            </div>

            <div className="flex flex-row">

                {/* Side Page */}
                {/* TODO: Responsive */}
                <div className="basis-96">
                    <Avatar className="w-32 h-32 mx-auto mt-16 mb-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex flex-col gap-4 max-w-64 mx-auto">
                        <Button variant="outline" size="lg">Ganti Foto Profil</Button>
                        <Button variant="outline" size="lg">Hapus Foto Profil</Button>
                        <Button size="lg">Simpan Perubahan</Button>
                    </div>
                </div>

                {/* Main Page */}
                <div className="flex-1 border rounded-lg p-8">
                    <div className="mb-4">
                        <p className="font-medium text-lg">Informasi Akun</p>
                        <div className="text-sm grid grid-cols-4 gap-2 p-4">
                            <p className="font-semibold">ID Pengguna</p>
                            <p className="font-light">USR-240410-001</p>
                            <p className="font-semibold">Tanggal Bergabung</p>
                            <p className="font-light">2 Januari 2026</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="font-medium text-lg">Data Pribadi</p>
                        <div className="text-sm grid grid-cols-4 gap-2 p-4">
                            <p className="font-semibold">Nama</p>
                            <p className="font-light col-span-3">John Doe Jane Doe</p>
                            <p className="font-semibold">Email</p>
                            <p className="font-light col-span-3">2310511061@mahasiswa.upnvj.ac.id</p>
                            <p className="font-semibold">Nomor Telepon</p>
                            <p className="font-light col-span-3">+62 812-3456-7890</p>
                            <p className="font-semibold">NIM</p>
                            <p className="font-light">2310511061</p>
                            <p className="font-semibold">Tahun Masuk</p>
                            <p className="font-light">2023</p>
                            <p className="font-semibold">Fakultas</p>
                            <p className="font-light">Ilmu Komputer</p>
                            <p className="font-semibold">Program Studi</p>
                            <p className="font-light">S1 Informatika</p>
                        </div>
                    </div>

                    <Alert className="mb-4 bg-secondary text-secondary-foreground">
                        <Info />
                        <AlertTitle>Notice</AlertTitle>
                        <AlertDescription>
                            Data akun wajib diisi untuk keperluan internal admin dan  komunikasi dengan Anda. Laporan yang dibuat akan otomatis bersifat  anonim. Identitas Anda tidak akan pernah kami bocorkan.
                        </AlertDescription>
                    </Alert>
                    
                    <div className="flex flex-row gap-4">
                        <Button size="lg" variant="outline">
                            <Edit2 className="mr-2" />
                            Ubah Data Pribadi
                        </Button>
                        <Button size="lg" variant="secondary">
                            <LucideKeyRound className="mr-2" />
                            Ganti Password
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}