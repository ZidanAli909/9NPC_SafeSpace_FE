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
import { Button, buttonVariants } from "../ui/button"
import { Menu } from "lucide-react"
import { navigationMenuTriggerStyle } from "../ui/navigation-menu"
import { Link } from "react-router-dom"

import safespace_logo from "../../assets/safespace_logo.svg"
import { NavbarUser } from "./NavbarUser"
import { useState } from "react"
import { Separator } from "../ui/separator"
import { NavbarAdmin } from "./NavbarAdmin"
import { cn } from "@/lib/utils"

function NavigationAdmin() {
    return (
        <div className="flex flex-col gap-2 mx-4">
            <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "outline" }))}
            >
                Dashboard
            </Link>
            <Link
                to="/admin/report"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "outline" }))}
            >
                Laporan
            </Link>
        </div>
    )
}

function NavigationPublic() {
    return (
        <div className="flex flex-col gap-2 mx-4">
            <Link
                to="/"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "outline" }))}
            >
                Beranda
            </Link>
            <Link
                to="/report"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "outline" }))}
            >
                Lapor
            </Link>
            <Collapsible>
                <Button variant="outline" className="w-full" render={<CollapsibleTrigger/>}>
                    Bantuan
                </Button>
                <CollapsibleContent className="flex flex-col gap-2 m-2">
                    <Button variant="outline" render={<Link to="/help/article" />} onClick={() => setOpen(false)}>
                        Bantuan Artikel
                    </Button>
                    <Button variant="outline" render={<Link to="/help/legal" />} onClick={() => setOpen(false)}>
                        Bantuan Hukum
                    </Button>
                </CollapsibleContent>
            </Collapsible>
            <Collapsible>
                <Button variant="outline" className="w-full" render={<CollapsibleTrigger/>}>
                    FAQ
                </Button>
                <CollapsibleContent className="flex flex-col gap-2 m-2">
                    <Button variant="outline" render={<Link to="/faq/technical" />} onClick={() => setOpen(false)}>
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
            <Button variant="outline" className={navigationMenuTriggerStyle() + " px-4 md:hidden"} render={<SheetTrigger />}>
                <Menu />
            </Button>
            <SheetContent showCloseButton={false} side="right">
                <SheetHeader className="pb-0">
                    <Link
                        to={adminMode ? "/admin" : "/"}
                        className="text-2xl font-semibold flex items-center gap-2 pb-2"
                        onClick={() => setOpen(false)}
                    >
                        <img
                            src={safespace_logo}
                            alt="Logo of Safespace"
                            width={40} height={40} />
                        Safespace
                    </Link>
                    <Separator />
                </SheetHeader>
                {adminMode ? <NavigationAdmin /> : <NavigationPublic />}
                <SheetFooter>
                    <Separator />
                    {adminMode ? <NavbarAdmin onNavigateAction={() => setOpen(false)}/> : <NavbarUser onNavigateAction={() => setOpen(false)} />}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}