import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function SubmittedActions() {
    return (
        <div className="flex items-center gap-4">
            <Link to="/">
                <Button variant="outline" className="border-[#1e3a5f] text-[#1e3a5f] px-6 py-5 flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Back to Home Page
                </Button>
            </Link>
            <Link to="/profile/history">
                <Button className="bg-[#4E7489] hover:bg-[#1e3a5f] text-white px-6 py-5">
                    Lihat Status Pelaporan
                </Button>
            </Link>
        </div>
    );
}