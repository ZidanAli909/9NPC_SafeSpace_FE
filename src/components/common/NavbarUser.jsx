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
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { History, Loader, LoaderCircle, LogOut, Settings, User2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import LogoutAlertDialog from "./LogoutAlertDialog"
import { useProfile } from "@/contexts/ProfileContext"

export function NavbarUser({
    onNavigateAction = () => { },
}) {
    const navigate = useNavigate();
    const { user, loadingUser } = useAuth();
    const { profile, loadingProfile } = useProfile();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    // console.log("Dialog state:", showLogoutDialog);
    // console.log("Profile:", profile);

    const handleNavigate = (path) => {
        navigate(path);
        if (onNavigateAction) onNavigateAction();
    };

    if (loadingUser) {
        return (
            <>
                <LoaderCircle className="animate-spin" />
            </>
        )
    } else if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Button onClick={() => handleNavigate("/login")} className={navigationMenuTriggerStyle() + "px-4"}>
                    Masuk
                </Button>
                <Button onClick={() => handleNavigate("/signup")} variant="secondary" className={navigationMenuTriggerStyle() + "px-4"}>
                    Daftar
                </Button>
            </div>
        );
    } else {
        return (
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger render={
                        <Button variant="outline" size="lg" className="rounded-full gap-2 flex flex-row justify-between">
                            <Avatar className="-ml-2">
                                <AvatarImage src={profile?.profilePictureUrl} alt={"Foto profil " + profile?.name} className="bg-black" />
                                <AvatarFallback>
                                    {profile && profile.name != null
                                        ? profile.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .substring(0, 2)
                                            .toUpperCase()
                                        : "?"}
                                </AvatarFallback>
                            </Avatar>
                            {profile ?
                                <p className="w-full">{profile.name ? profile.name : "?"}</p> :
                                <Loader className="animate-spin" />}
                        </Button>
                    } />
                    <DropdownMenuContent className="w-fit">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>{profile?.email}</DropdownMenuLabel>
                            <DropdownMenuItem className="text-sm px-4" onClick={() => handleNavigate("/profile")}>
                                <User2 className="mr-2" />
                                Profil
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-sm px-4" onClick={() => handleNavigate("/profile/history")}>
                                <History className="mr-2" />
                                Riwayat Pelaporan
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-sm px-4" onClick={() => handleNavigate("/profile/settings")}>
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
                    afterLogout={() => handleNavigate("/")}
                />
            </>
        );
    }
}