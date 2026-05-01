import formImage from "@/assets/safespace_reportform.svg";

export default function FormHero() {
    return (
        <div className="bg-[#ddeef7] flex flex-col justify-center px-12 py-16">
            <h1 className="text-5xl font-bold text-[#1e3a5f] leading-tight mb-4">
                Formulir
                <br />
                Pelaporan
            </h1>
            <p className="text-slate-600 text-sm mb-10">
                Semua data dilindungi & terenkripsi
                <br />
                end-to-end
            </p>
            <div className="flex justify-center">
                <img
                    src={formImage}
                    alt="Form Illustration"
                    className="w-72 object-contain"
                />
            </div>
        </div>
    );
}
