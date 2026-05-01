import React from "react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import safespace_logo from "../../assets/safespace_logo.svg"
import { Link } from "react-router-dom"
import { NavbarUser } from "./NavbarUser"
import { MobileNavigationDrawer } from "./NavbarMobile"

function NavigationPublic() {
    return (
        <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-4">

                <NavigationMenuItem>
                    <NavigationMenuLink
                        render={<Link to="/">Beranda</Link>}
                        className={navigationMenuTriggerStyle() + " px-4"}
                    />
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink
                        render={<Link to="/report">Buat Laporan</Link>}
                        className={navigationMenuTriggerStyle() + " px-4"}
                    />
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Bantuan</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink render={<Link to="/artikel" />}>
                            Artikel Dukungan
                        </NavigationMenuLink>
                        <NavigationMenuLink render={<Link to="/hukum" />}>
                            Info Bantuan Hukum
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink
                        render={<Link to="/faq">FAQ</Link>}
                        className={navigationMenuTriggerStyle() + " px-4"}
                    />
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}

function NavigationAdmin() {
    return (
        <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-4">
                <NavigationMenuItem>
                    <NavigationMenuLink
                        render={<Link to="/admin">Dashboard</Link>}
                        className={navigationMenuTriggerStyle() + " px-4"}
                    />
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink
                        render={<Link to="/admin/report">Laporan</Link>}
                        className={navigationMenuTriggerStyle() + " px-4"}
                    />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export function Navbar({ adminMode = false }) {
    return (
        <header className="bg-primary-foreground flex items-center justify-between p-4 px-8 border-b">

            {/* Logo */}
            <Link to="/" className="text-2xl font-semibold flex items-center gap-2">
                <img src={safespace_logo} alt="Logo Safespace" width={40} height={40} />
                Safespace
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-4">
                {adminMode ? <NavigationAdmin /> : <NavigationPublic />}
                <MobileNavigationDrawer />
                <NavbarUser />
            </div>
        </header>
    )
}