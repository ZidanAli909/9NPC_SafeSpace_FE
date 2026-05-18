import HeroSection from "@/components/public/landingPage/HeroSection";
import AboutSection from "@/components/public/landingPage/AboutSection";
import ReportStepsSection from "@/components/public/landingPage/ReportStepsSection";
import HelpSection from "@/components/public/landingPage/HelpSection";
import FAQSection from "@/components/public/landingPage/FAQSection";

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
