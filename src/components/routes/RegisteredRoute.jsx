import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingCard } from "../common/LoadingCard";

export const RegisteredRoute = () => {
    const { isAuthenticated, loadingAuth } = useAuth();

    if (loadingAuth) {
        return (
            <div className="h-screen flex items-center">
                <LoadingCard />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};