import React, { useState } from "react"
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
import { Loader, LoaderCircle, LogOut, Settings, User2 } from "lucide-react"
import LogoutAlertDialog from "./LogoutAlertDialog"
import { useProfile } from "@/contexts/ProfileContext"

export function NavbarAdmin({
    onNavigateAction = () => { },
}) {
    const navigate = useNavigate();
    const { profile, loadingProfile } = useProfile();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    // console.log("Dialog state:", showLogoutDialog);
    // console.log("Admin:", admin);

    const handleNavigate = (path) => {
        navigate(path);
        if (onNavigateAction) onNavigateAction();
    };

    if (loadingProfile) {
        return (
            <>
                <LoaderCircle className="animate-spin" />
            </>
        )
    } else {
        return (
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger render={
                        <Button variant="outline" size="lg" className="rounded-full gap-2 flex flex-row justify-between">
                            <Avatar className="-ml-2">
                                <AvatarImage src={profile?.profilePictureUrl} alt={"Foto profil " + profile?.name} className="bg-black" />
                                <AvatarFallback>
                                    {profile && profile.admin
                                        ? profile.admin.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .substring(0, 2)
                                            .toUpperCase()
                                        : "?"}
                                </AvatarFallback>
                            </Avatar>
                            {profile ?
                                <p className="w-full">{profile.admin.name ? profile.admin.name : "Admin"}</p> :
                                <Loader className="animate-spin" />}
                        </Button>
                    } />
                    <DropdownMenuContent className="w-fit">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>{profile?.admin.email}</DropdownMenuLabel>
                            <DropdownMenuItem className="text-sm px-4" onClick={() => handleNavigate("/admin/profile")}>
                                <User2 className="mr-2" />
                                Profil
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