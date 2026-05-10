import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"
import { navigationMenuTriggerStyle } from "../ui/navigation-menu"
import { Link } from "react-router-dom"

import safespace_logo from "../../assets/safespace_logo.svg"
import { NavbarUser } from "./NavbarUser"
import { useState } from "react"
import { Separator } from "../ui/separator"

function NavigationAdmin() {
    return (
        <div className="flex flex-col gap-2 mx-4">
            <Button variant="outline" render={<Link to="/admin" />} onClick={() => setOpen(false)}>
                Dashboard
            </Button>
            <Button variant="outline" render={<Link to="/admin/report" />} onClick={() => setOpen(false)}>
                Laporan
            </Button>
        </div>
    )
}

function NavigationPublic() {
    return (
        <div className="flex flex-col gap-2 mx-4">
            <Button variant="outline" render={<Link to="/" />} onClick={() => setOpen(false)}>
                Beranda
            </Button>
            <Button variant="outline" render={<Link to="/report" />} onClick={() => setOpen(false)}>
                Lapor
            </Button>
            <Button variant="outline" render={<Link to="/artikel" />} onClick={() => setOpen(false)}>
                Bantuan
            </Button>
            <Collapsible>
                <CollapsibleTrigger render={
                    <Button variant="outline" className="w-full">
                        FAQ
                    </Button>
                } />
                <CollapsibleContent className="flex flex-col gap-2 m-2">
                    <Button variant="outline" render={<Link to="/faq" />} onClick={() => setOpen(false)}>
                        Pusat Bantuan Teknis
                    </Button>
                    <Button variant="outline" render={<Link to="/faq/guide" />} onClick={() => setOpen(false)}>
                        Panduan Pelaporan
                    </Button>
                    <Button variant="outline" render={<Link to="/faq/privacy" />} onClick={() => setOpen(false)}>
                        Kebijakan Privasi
                    </Button>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}

export function MobileNavigationDrawer({
    adminMode,
}) {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Button variant="outline" className={navigationMenuTriggerStyle() + " px-4 md:hidden"}>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent showCloseButton={false} side="right">
                <SheetHeader className="pb-0">
                    <Link to="/" className="text-2xl font-semibold flex items-center gap-2 pb-2" onClick={() => setOpen(false)}>
                        <img src={safespace_logo} alt="Logo of Safespace" width={40} height={40} />
                        Safespace
                    </Link>
                    <Separator />
                </SheetHeader>
                {adminMode ? <NavigationAdmin /> : <NavigationPublic />}
                <SheetFooter>
                    <Separator />
                    <NavbarUser onNavigateAction={() => setOpen(false)} />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}