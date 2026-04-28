import { Outlet } from "react-router-dom";
import { Navbar } from "../common/Navbar";
import { Footer } from "../common/Footer";

export function AdminLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar adminMode={true} />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer showFooterNav={false} />
        </div>
    )
}