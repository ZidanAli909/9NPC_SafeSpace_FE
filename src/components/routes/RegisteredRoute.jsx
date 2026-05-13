import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Loader2 } from "lucide-react";

export const RegisteredRoute = () => {
    const { user, token, loadingAuth } = useAuth();

    if (loadingAuth) {
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

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};