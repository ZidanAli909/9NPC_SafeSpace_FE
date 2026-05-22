import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"
import { ChevronRight, LogOut } from "lucide-react"

export function SettingsPage() {
    return (
        <div className={commonStyle_Page}>
            <title>Safespace | Settings</title>

            <div className={commonStyle_Section}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>Profil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Pengaturan</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex flex-row gap-8 max-w-4xl mx-auto">
                <div className="basis-64 max-lg:basis-48">
                    <div className={commonStyle_Section}>
                        <p className="text-2xl font-semibold">Pengaturan</p>
                    </div>
                    <div className="flex flex-col gap-1 mb-2">
                        <p className="font-medium text-lg">Sistem</p>
                        <Button variant="ghost" className="flex justify-between">
                            Notifikasi<ChevronRight/>
                        </Button>
                        <Button variant="ghost" className="flex justify-between">
                            Tampilan<ChevronRight/>
                        </Button>
                        <Button variant="ghost" className="flex justify-between">
                            Bahasa<ChevronRight/>
                        </Button>
                    </div>
                    <div className="flex flex-col gap-1 mb-2">
                        <p className="font-medium text-lg">Akun</p>
                        <Button variant="ghost" className="flex justify-between">
                            Keamanan<ChevronRight/>
                        </Button>
                        <Button variant="ghost" className="flex justify-between">
                            Privasi<ChevronRight/>
                        </Button>
                    </div>
                    <div className="flex flex-col gap-1 mb-2">
                        <p className="font-medium text-lg">Preferensi</p>
                        <Button variant="ghost" className="flex justify-between">
                            Laporan<ChevronRight/>
                        </Button>
                        <Button variant="ghost" className="flex justify-between">
                            Data & Cadangan<ChevronRight/>
                        </Button>
                    </div>
                    <Button variant="destructive" size="lg" className="flex justify-between w-full">
                        Keluar dari Akun
                        <LogOut/>
                    </Button>
                </div>

                <div className="flex-1">
                    <div className={commonStyle_Section}>
                        <p className="text-2xl font-semibold mb-4">Notifikasi</p>
                    </div>
                    <p className="mb-4">
                        Mohon maaf, fitur pengaturan belum tersedia dan saat ini masih dalam tahap pengembangan.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae perspiciatis unde, neque hic dolorum facere dolore minima voluptates nulla voluptatibus veniam a recusandae, numquam necessitatibus corrupti officiis ad quod voluptas?
                    </p>
                </div>
            </div>
        </div>
    )
}