import SubmittedHero from "@/components/public/report/SubmittedHero";
import SubmittedActions from "@/components/public/report/SubmittedActions";

export default function SubmittedPage() {
    return (
        <main className="min-h-[calc(100vh-65px)] bg-[#e8f5e9] flex flex-col items-center justify-center gap-8 px-6 py-16">
            <SubmittedHero reportId="SAFE24041004" />
            <SubmittedActions />
        </main>
    );
}