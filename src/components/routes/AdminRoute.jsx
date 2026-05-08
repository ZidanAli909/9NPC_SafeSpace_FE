import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Loader2 } from "lucide-react";
import { useProfile } from "@/contexts/ProfileContext";

export const AdminRoute = () => {
    const { role, loadingProfile } = useProfile();
    const location = useLocation();

    if (loadingProfile) {
        return (
            <div className="h-screen flex items-center">
                <Card className="w-32 mx-auto">
                    <CardContent className="flex flex-col items-center gap-2 p-2">
                        <Loader2 className="animate-spin" />
                        <p>Loading...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (role !== "ADMIN") {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};