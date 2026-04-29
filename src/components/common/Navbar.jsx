import React, { useState } from "react"
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

// NOTE: The Profile's/User's logic for Navbar has been moved into NavbarUser!

function NavigationPublic() {
    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-4">
                <NavigationMenuItem >
                    <NavigationMenuLink render={
                        <Link to="/">Beranda</Link>
                    } className={navigationMenuTriggerStyle() + " px-4"} />
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink render={
                        <Link to="/">Lapor</Link>
                    } className={navigationMenuTriggerStyle() + " px-4"} />
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink render={
                        <Link to="/">Bantuan</Link>
                    } className={navigationMenuTriggerStyle() + " px-4"} />
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>FAQ</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink render={<Link to="/faq" />}>
                            Pusat Bantuan Teknis
                        </NavigationMenuLink>
                        <NavigationMenuLink render={<Link to="/faq/guide" />}>
                            Panduan Pelaporan
                        </NavigationMenuLink>
                        <NavigationMenuLink render={<Link to="/faq/privacy" />}>
                            Kebijakan Privasi
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu >
    )
}

function NavigationAdmin() {
    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-4">
                <NavigationMenuItem>
                    <NavigationMenuLink render={
                        <Link to="/admin">Dashboard</Link>
                    } className={navigationMenuTriggerStyle() + " px-4"} />
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink render={
                        <Link to="/admin/report">Laporan</Link>
                    } className={navigationMenuTriggerStyle() + " px-4"} />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu >
    )
}

export function Navbar({
    adminMode = false
}) {
    return (
        <header className="bg-primary-foreground flex items-center justify-between p-4 px-8 border-b">

            {/* Logo Section */}
            <Link to="/" className="text-2xl font-semibold flex items-center gap-2">
                <img src={safespace_logo} alt="Logo of Safespace" width={40} height={40} />
                Safespace
            </Link>

            {/* Navigation Section */}
            <div className="flex items-center gap-4">
                {adminMode ? <NavigationAdmin /> : <NavigationPublic />}
                <NavbarUser />
            </div>
        </header>
    )
}