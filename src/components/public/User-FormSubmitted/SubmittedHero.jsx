import { CheckCircle } from "lucide-react";

export default function SubmittedHero({ reportId = "SAFE24041004" }) {
    return (
        <div className="flex flex-col items-center text-center gap-4">
            <div className="bg-[#E0FCD9] rounded-full p-4">
                <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-[#1e3a5f]">Laporan Berhasil Terkirim</h1>
            <h2 className="text-2xl font-semibold text-[#1e3a5f]">ID Laporan: #{reportId}</h2>
            <p className="text-slate-600 max-w-lg leading-relaxed">
                Laporanmu telah terenkripsi dan disimpan dengan aman.<br />
                Admin akan mereview dalam 1x24 jam. Status laporan bisa kamu pantau melalui menu Status Laporan di Profilmu.<br />
                Jangan lupa simpan ID Laporan yang muncul di atas.
            </p>
        </div>
    );
}