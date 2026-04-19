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
import { Button } from "../ui/button"
import safespace_logo from "../../assets/safespace_logo.svg"
import { Link } from "react-router-dom"

export function Navbar() {
    return (
        <header className="bg-primary-foreground flex items-center justify-between p-4 px-8 border-b">

            {/* Logo Section */}
            <Link to="/" className="text-2xl font-semibold flex items-center gap-2">
                <img src={safespace_logo} alt="Logo of Safespace" width={40} height={40}/>
                Safespace
            </Link>

            <div className="flex items-center gap-4">

                {/* Navigation Section */}
                <NavigationMenu>
                    <NavigationMenuList className="gap-4">
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/" className="px-4">
                                Home
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/" className="px-4">
                                Lapor
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/" className="px-4">
                                Bantuan
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/" className="px-4">
                                FAQ
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Profile Section */}
                <Button className="px-4">Login</Button>
                
            </div>
        </header>
    )
}