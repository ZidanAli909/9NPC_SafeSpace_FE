import HeroSection from "@/components/public/User-LandingPage/HeroSection";
import AboutSection from "@/components/public/User-LandingPage/AboutSection";
import ReportStepsSection from "@/components/public/User-LandingPage/ReportStepsSection";
import HelpSection from "@/components/public/User-LandingPage/HelpSection";
import FAQSection from "@/components/public/User-LandingPage/FAQSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection />
      <AboutSection />
      <ReportStepsSection />
      <HelpSection />
      <FAQSection />
    </main>
  );
}