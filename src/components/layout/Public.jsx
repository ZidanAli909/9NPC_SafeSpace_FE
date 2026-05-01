import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../common/Navbar";
import { Footer }from "../common/Footer";

export function PublicLayout() {
    const location = useLocation()
    const isAuthPage = location.pathname === "/login" || location.pathname === "/signup"

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar isAuthPage={isAuthPage} />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}