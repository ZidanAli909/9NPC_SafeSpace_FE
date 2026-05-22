import { useNavigate } from "react-router-dom"
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"
import { Button } from "@/components/ui/button";

export function MissingPage() {
    const navigate = useNavigate()

    return (
        <div className={commonStyle_Page}>
            <title>Safespace | 404</title>

            <div className="mb-4 max-w-4xl mx-auto">
                <p className="text-4xl font-semibold mb-4">
                    404
                </p>
                <p className="text-md">
                    Oops! Halaman yang kamu cari sepertinya tidak ada...
                </p>
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => navigate(-1)}
                >
                    Kembali ke halaman sebelumnya
                </Button>
            </div>
        </div>
    );
}