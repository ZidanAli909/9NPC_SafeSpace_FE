import React, { useState } from "react"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
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
import { Button, buttonVariants } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { History, LoaderCircle, LogOut, Settings, User2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import LogoutAlertDialog from "./LogoutAlertDialog"
import { useProfile } from "@/contexts/ProfileContext"

export function NavbarUser() {
    const navigate = useNavigate();
    const { user, loadingUser } = useAuth();
    const { profile, loadingProfile } = useProfile();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    // console.log("Dialog state:", showLogoutDialog);
    // console.log("Profile:", profile);

    if (loadingUser) {
        return (
            <>
                <LoaderCircle className="animate-spin" />
            </>
        )
    } else if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Link to="/login" className={buttonVariants() + navigationMenuTriggerStyle() + "px-4"}>
                    Masuk
                </Link>
                <Link to="/login" className={buttonVariants({ variant: "secondary" }) + navigationMenuTriggerStyle() + "px-4"}>
                    Daftar
                </Link>
            </div>
        );
    } else {
        return (
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger render={
                        <Button variant="outline" size="lg" className="rounded-full gap-2">
                            <Avatar className="-ml-2">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            {profile?.name}
                        </Button>
                    } />
                    <DropdownMenuContent className="w-fit">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>{profile?.email}</DropdownMenuLabel>
                            <DropdownMenuItem className="text-sm px-4" render={<Link to="/profile" />}>
                                <User2 className="mr-2" />
                                Profil
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-sm px-4" render={<Link to="/profile/history" />}>
                                <History className="mr-2" />
                                Riwayat Pelaporan
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-sm px-4" render={<Link to="/profile/settings" />}>
                                <Settings className="mr-2" />
                                Pengaturan
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            variant="destructive"
                            className="text-sm px-4"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowLogoutDialog(true);
                            }}
                        >
                            <LogOut className="mr-2" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <LogoutAlertDialog
                    open={showLogoutDialog}
                    setOpen={setShowLogoutDialog}
                    afterLogout={() => navigate("/")}
                />
            </>
        );
    }
}