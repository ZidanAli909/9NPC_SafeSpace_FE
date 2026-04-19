import { Outlet } from "react-router-dom";
import { Navbar } from "../common/Navbar";
import { Footer } from "../common/Footer";

export function PublicLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}