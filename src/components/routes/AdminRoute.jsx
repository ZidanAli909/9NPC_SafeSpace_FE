import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Loader2 } from "lucide-react";
import { useProfile } from "@/contexts/ProfileContext";
import { LoadingCard } from "../common/LoadingCard";

export const AdminRoute = () => {
    const { role, loadingProfile } = useProfile();
    const location = useLocation();

    if (loadingProfile) {
        return (
            <div className="h-screen flex items-center">
                <LoadingCard />
            </div>
        );
    }

    if (role !== "ADMIN") {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Outlet />;
};