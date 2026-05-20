
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
} from "@/components/ui/alert-dialog"
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ProfilePictureDeleteDialog({
    open,
    onOpenChange,
}) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            
            toast.success(response.message);
        } catch (error) {
            toast.error("Terjadi kesalahan dalam menghapus laporan.")
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
                    <AlertDialogTitle>Menghapus Laporan</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah anda yakin ingin menghapus laporan ini? Laporan yang dihapus akan hilang selamanya.
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