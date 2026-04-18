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

export function Navbar() {
    return (
        <header className="bg-primary-foreground flex items-center justify-between p-4 px-8 border-b">
            <div className="text-2xl font-semibold">
                SafeSpace
            </div>
            <div className="flex items-center gap-4">
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
                <Button className="px-4">Login</Button>
            </div>
        </header>
    )
}