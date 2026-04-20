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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import safespace_logo from "../../assets/safespace_logo.svg"
import { Link } from "react-router-dom"
import { Edit, History, LogIn, LogOut, Settings } from "lucide-react"

function NavigationPublic() {
    return (
        < NavigationMenu >
            <NavigationMenuList className="gap-4">
                <NavigationMenuItem>
                    <NavigationMenuLink render={
                        <Link to="/">Beranda</Link>
                    } className={navigationMenuTriggerStyle() + " px-4"}/>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink render={
                        <Link to="/">Lapor</Link>
                    } className={navigationMenuTriggerStyle() + " px-4"}/>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink render={
                        <Link to="/">Bantuan</Link>
                    } className={navigationMenuTriggerStyle() + " px-4"}/>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink render={
                        <Link to="/">FAQ</Link>
                    } className={navigationMenuTriggerStyle() + " px-4"}/>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu >
    )
}

function NavigationAdmin() {
    return (
        < NavigationMenu >
            <NavigationMenuList className="gap-4">
                <NavigationMenuItem>
                    <NavigationMenuLink render={
                        <Link to="/admin">Dashboard</Link>
                    } className={navigationMenuTriggerStyle() + " px-4"}/>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink render={
                        <Link to="/admin/report">Laporan</Link>
                    } className={navigationMenuTriggerStyle() + " px-4"}/>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu >
    )
}

export function Navbar({
    adminMode = false
}) {
    const [user, setUser] = React.useState(null)

    return (
        <header className="bg-primary-foreground flex items-center justify-between p-4 px-8 border-b">

            {/* Logo Section */}
            <Link to="/" className="text-2xl font-semibold flex items-center gap-2">
                <img src={safespace_logo} alt="Logo of Safespace" width={40} height={40}/>
                Safespace
            </Link>

            <div className="flex items-center gap-4">
                {/* Navigational Section */}
                {/* TODO: User/Admin Logic needed! */}
                {adminMode ? <NavigationAdmin /> : <NavigationPublic />}

                {/* Profile Section */}
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger render={
                            <Button variant="ghost" className="rounded-full gap-4">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                Username12345
                            </Button>
                        }/>
                        <DropdownMenuContent className="w-fit">
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="text-sm px-4">
                                    <History className="mr-2"/>
                                    Riwayat Pelaporan
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-sm px-4">
                                    <Edit className="mr-2"/>
                                    Profil
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-sm px-4">
                                    <Settings className="mr-2"/>
                                    Pengaturan
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem variant="destructive" className="text-sm px-4">
                                <LogOut className="mr-2"/>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex items-center gap-4">
                        <Button className="px-4">
                            Login
                        </Button>
                        <Button className="px-4" variant="secondary">                            
                            Sign Up
                        </Button>
                    </div>
                )}
            </div>
        </header>
    )
}