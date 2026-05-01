import { useAdmin } from "@/contexts/AdminContext";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Loader2 } from "lucide-react";

export const AdminRoute = () => {
    const { isAdmin, loadingAdmin } = useAdmin();
    const location = useLocation();

    if (loadingAdmin) {
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

    if (!isAdmin) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};