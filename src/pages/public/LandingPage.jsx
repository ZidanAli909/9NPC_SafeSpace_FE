import { Footer } from "@/components/common/Footer"
import { Navbar } from "../../components/common/Navbar"

export function LandingPage() {
    return (
        <>
            <Navbar />

            <div className="p-10">
                Ini adalah landing page
            </div>

            <Footer />
        </>
    )
}