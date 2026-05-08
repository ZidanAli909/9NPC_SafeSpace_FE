import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAdmin } from "@/contexts/AdminContext";
import { useAuth } from "@/contexts/AuthContext"

export default function LogoutAlertDialog({
    open,
    setOpen,
    afterLogout,
}) {
    const { logout } = useAuth();
    const { adminLogout } = useAdmin();

    const handleLogout = () => {
        adminLogout();
        logout();
        if (afterLogout) afterLogout();
        setOpen(false);
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah Anda yakin ingin keluar?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleLogout}
                    >
                        Keluar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}