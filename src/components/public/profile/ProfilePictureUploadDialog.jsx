import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AlertCircle, Info, Loader2 } from "lucide-react"
import { ProfilePictureService } from "@/services/ProfilePictureService"
import { toast } from "sonner"
import { useProfile } from "@/contexts/ProfileContext"

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_SIZE_MB = 2

export function ProfilePictureUploadDialog({
    open,
    onOpenChange,
}) {
    const { role, refreshProfile } = useProfile();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const newFile = e.target.files[0];
        setError("");
        setPreview(null);
        setFile(null);
        // Persyaratan file
        if (!newFile) return;
        if (!ACCEPTED_TYPES.includes(newFile.type)) {
            setError("Hanya file JPG, PNG, atau WEBP yang diizinkan!");
            return;
        }
        if (newFile.size > MAX_SIZE_MB * 1024 * 1024) {
            setError(`Ukuran file maksimal ${MAX_SIZE_MB}MB!`);
            return;
        }
        setFile(newFile);
        // Preview URL
        const url = URL.createObjectURL(newFile);
        setPreview(url);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(file);
        if (!file) return;
        setLoading(true);
        setError("");
        // console.log("Fungsi dipanggil, file:", file);
        try {
            const response = await ProfilePictureService.uploadProfilePicture(file, role);
            // console.log(response);
            toast.success("Sukses mengubah foto profil baru!");
            refreshProfile();
            onOpenChange(false);
        } catch (error) {
            toast.error("Terjadi kesalahan dalam mengubah foto profil.");
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleCancle = async (e) => {
        e.preventDefault();
        setError("");
        setPreview(null);
        setFile(null);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle>Upload Foto Profil</DialogTitle>
                    <DialogDescription>
                        Silahkan upload foto profil Anda dengan memilih langsung atau tarik dan lepaskan ke kotak ini.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {!preview && <Alert className="mb-4">
                        <Info />
                        <AlertTitle>Persyaratan Foto Profil</AlertTitle>
                        <AlertDescription>
                            Format: JPG/JPEG, PNG<br/>Ukuran maksimal: 2,0MB
                        </AlertDescription>
                    </Alert>}
                    <Input
                        id="file"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    {error && <Alert className="mt-4 text-destructive">
                        <AlertCircle />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>}
                    {preview && <div className="mx-auto mt-4 size-64 border rounded-full overflow-clip">
                        <img
                            src={preview}
                            alt="Profile picture preview"
                            className="object-cover rounded-md"
                        />
                    </div>}
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleCancle}
                        variant="secondary"
                        disabled={loading}
                    >
                        Batal
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || !preview}
                    >
                        {loading && <Loader2 className="mr-1 animate-spin" />}
                        Simpan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}