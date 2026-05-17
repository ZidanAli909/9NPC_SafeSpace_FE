import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../common/Navbar";
import { Footer } from "../common/Footer";
import { Toaster } from "../ui/sonner";

export function PublicLayout() {
    return (
        <>
            <main className="min-h-screen bg-background text-foreground flex flex-col">
                <Navbar />
                <div className="flex-1">
                    <Outlet />
                </div>
                <Footer />
            </main>
            <Toaster />
        </>
    )
}