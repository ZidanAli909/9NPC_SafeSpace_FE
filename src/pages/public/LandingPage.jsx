<<<<<<< jihan
import HeroSection from "@/components/public/User-LandingPage/HeroSection";
import AboutSection from "@/components/public/User-LandingPage/AboutSection";
import ReportStepsSection from "@/components/public/User-LandingPage/ReportStepsSection";
import HelpSection from "@/components/public/User-LandingPage/HelpSection";
import FAQSection from "@/components/public/User-LandingPage/FAQSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ReportStepsSection />
        <HelpSection />
        <FAQSection />
      </main>
    </div>
  );
}
=======
import { commonStyle_Page } from "@/lib/commonStyles";

export function LandingPage() {
    return (
        <>
            <div className={commonStyle_Page}>
                Ini adalah landing page
            </div>
        </>
    )
}
>>>>>>> dev
