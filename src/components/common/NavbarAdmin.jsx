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
import { History, Loader, LoaderCircle, LogOut, Settings, User2 } from "lucide-react"
import LogoutAlertDialog from "./LogoutAlertDialog"
import { useAdmin } from "@/contexts/AdminContext"

export function NavbarAdmin({
    onNavigateAction = () => { },
}) {
    const navigate = useNavigate();
    const { admin, loadingAdmin } = useAdmin();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    // console.log("Dialog state:", showLogoutDialog);
    // console.log("Admin:", admin);

    const handleNavigate = (path) => {
        navigate(path);
        if (onNavigateAction) onNavigateAction();
    };

    if (loadingAdmin) {
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
                                <AvatarImage src={admin?.profilePictureUrl} alt={"Foto profil " + admin?.name} className="bg-black" />
                                <AvatarFallback>
                                    {admin
                                        ? admin.admin.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .substring(0, 2)
                                            .toUpperCase()
                                        : "?"}
                                </AvatarFallback>
                            </Avatar>
                            {admin ?
                                <p className="w-full">{admin.admin.name}</p> :
                                <Loader className="animate-spin" />}
                        </Button>
                    } />
                    <DropdownMenuContent className="w-fit">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>{admin?.admin.email}</DropdownMenuLabel>
                            <DropdownMenuItem className="text-sm px-4" onClick={() => handleNavigate("/profile")}>
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