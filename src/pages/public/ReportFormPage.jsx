import FormHero from "@/components/public/User-Form/FormHero";
import ReportForm from "@/components/public/User-Form/ReportForm";

export default function ReportFormPage() {
    return (
        <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] min-h-screen">
                <FormHero />
                <div className="bg-[#FEFAF5] py-8">
                    <ReportForm />
                </div>
            </div>
        </main>
    );
}
