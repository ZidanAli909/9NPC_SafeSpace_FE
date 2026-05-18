import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Loader2 } from "lucide-react";
import { LoadingCard } from "../common/LoadingCard";

export const RegisteredRoute = () => {
    const { user, token, loadingAuth } = useAuth();

    if (loadingAuth) {
        return (
            <div className="h-screen flex items-center">
                <LoadingCard />
            </div>
        );
    }

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};