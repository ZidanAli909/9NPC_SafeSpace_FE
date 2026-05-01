import signupImage from "@/assets/safespace_signup.svg";

export default function SignUpHero() {
    return (
        <div className="flex flex-col justify-center px-12 py-16">
            <h1 className="text-4xl font-bold text-[#1e3a5f] leading-tight mb-4">
                Selamat Datang di SafeSpace
            </h1>
            <p className="text-slate-600 text-base mb-10">
                Laporkan Tindak Kekerasan di Kampus. Bersuara dan lindungi dirimu dengan SafeSpace.
            </p>
            <div className="flex justify-center">
                <img
                    src={signupImage}
                    alt="SafeSpace Illustration"
                    className="w-80 object-contain"
                />
            </div>
        </div>
    );
}
