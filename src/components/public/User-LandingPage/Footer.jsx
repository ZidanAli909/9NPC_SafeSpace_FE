import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-base">SafeSpace</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Platform pelaporan kekerasan di lingkungan UPN "Veteran" Jakarta yang
              aman, rahasia, dan terintegrasi dengan unit pengaduan kampus.
            </p>
          </div>

          {/* Sumber Daya Kampus */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">
              Sumber Daya Kampus
            </h4>
            <ul className="space-y-2">
              {[
                "Unit Pengaduan Kampus",
                "Layanan Konseling Mahasiswa",
                "Keamanan Kampus",
                "Hotline Kampus",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-300 text-sm hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Utama */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">
              Menu Utama
            </h4>
            <ul className="space-y-2">
              {[
                "Buat Laporan",
                "Artikel Dukungan",
                "Info Bantuan Hukum",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-300 text-sm hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">Info</h4>
            <ul className="space-y-2">
              {["FAQ", "Panduan Pelaporan", "Kebijakan Privasi"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-300 text-sm hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-slate-400 text-xs text-center">
            © 2025 SafeSpace – UPN "Veteran" Jakarta. Platform laporan layanan kampus.
          </p>
        </div>
      </div>
    </footer>
  );
}
