import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { LoadingCard } from "../common/LoadingCard";

export const AdminRoute = () => {
    const { isAuthenticated, loadingAuth } = useAuth();
    const { role, loadingProfile } = useProfile();
    const location = useLocation();

    if (loadingProfile || loadingAuth) {
        return (
            <div className="h-screen flex items-center">
                <LoadingCard />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role !== "ADMIN") {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Outlet />;
};