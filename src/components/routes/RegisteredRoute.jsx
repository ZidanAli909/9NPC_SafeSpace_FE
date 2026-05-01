import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const RegisteredRoute = () => {
    const { user } = useAuth();

    const token = localStorage.getItem("token");

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};