import SignUpHero from "@/components/public/signup/SignUpHero";
import SignUpForm from "@/components/public/signup/SignUpForm";

export default function SignUpPage() {
    return (
        <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[90vh] bg-[#ddeef7]">
                <SignUpHero />
                <SignUpForm />
            </div>
        </main>
    );
}
