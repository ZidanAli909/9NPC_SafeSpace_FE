import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../common/Navbar";
import { Footer }from "../common/Footer";

export function PublicLayout() {
    const location = useLocation()
    const isAuthPage = location.pathname === "/login" || location.pathname === "/signup"

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </main>
    )
}