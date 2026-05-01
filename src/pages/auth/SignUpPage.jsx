import SignUpHero from "@/components/public/User-SignUp/SignUpHero";
import SignUpForm from "@/components/public/User-SignUp/SignUpForm";

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
