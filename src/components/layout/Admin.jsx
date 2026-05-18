import { Outlet } from "react-router-dom";
import { Navbar } from "../common/Navbar";
import { Footer } from "../common/Footer";
import { Toaster } from "@/components/ui/sonner";

export function AdminLayout() {
    return (
        <>
            <main className="min-h-screen flex flex-col bg-background text-foreground">
                <Navbar adminMode={true} />
                <div className="flex-1">
                    <Outlet />
                </div>
                <Footer showFooterNav={false} />
            </main>
            <Toaster />
        </>
    )
}