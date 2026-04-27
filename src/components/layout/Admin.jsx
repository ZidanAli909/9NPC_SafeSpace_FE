import { Outlet } from "react-router-dom";
import { Navbar } from "../common/Navbar";
import { Footer } from "../common/Footer";

export function AdminLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar adminMode={true} />
            <main>
                <Outlet />
            </main>
            <Footer showFooterNav={false} />
        </div>
    )
}