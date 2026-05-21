import FormHero from "@/components/public/report/FormHero";
import ReportForm from "@/components/public/report/ReportForm";

export default function ReportFormPage() {
    return (
        <main className="flex-1">
            <title>Safespace | Report</title>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] min-h-screen">
                <FormHero />
                <div className="bg-[#FEFAF5] py-8">
                    <ReportForm />
                </div>
            </div>
        </main>
    );
}
