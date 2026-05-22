
import { useState } from "react"
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
import { ProfilePictureService } from "@/services/ProfilePictureService";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useProfile } from "@/contexts/ProfileContext";

export function ProfilePictureDeleteDialog({
    open,
    onOpenChange,
}) {
    const { role, refreshProfile } = useProfile();
    const [loading, setLoading] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await ProfilePictureService.deleteProfilePicture(role);
            // console.log(response);
            toast.success(response.message);
            refreshProfile();
        } catch (error) {
            toast.error("Terjadi kesalahan dalam menghapus foto profil.")
            console.error(error);
        } finally {
            setLoading(false);
            onOpenChange(false);
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Menghapus Foto Profil</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus foto profil? Foto profil yang telah dihapus tidak dapat dikembalikan.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={loading}
                    >
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading && <Loader2 className="animate-spin mr-1" />}
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}