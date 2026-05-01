import React from "react"
import { Link } from "react-router-dom";

export function Footer({
    showFooterNav = true
}) {
    return (
        <footer className="p-8 text-background" style={{ background: 'linear-gradient(to top, #274662, #4E7489)' }}>
            {showFooterNav && (
                <div id="footer-nav" className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 md:divide-x md:divide-white/50">
                <div className="md:pr-8">
                    <p className="text-lg font-medium mb-4">Tentang SafeSpace</p>
                    <p className="text-sm font-light">
                        Platform pelaporan kekerasan di lingkungan UPN "Veteran" Jakarta yang aman, rahasia, dan terintegrasi dengan unit pengaduan kampus.
                    </p>
                </div>
                <div className="md:px-8">
                    <p className="text-lg font-medium mb-4">Sumber Daya Kampus</p>
                    <ul className="text-sm/6 font-light underline">
                        <li><Link to="/">Unit Pengaduan Kampus</Link></li>
                        <li><Link to="/">Layanan Konseling Mahasiswa</Link></li>
                        <li><Link to="/">Keamanan Kampus</Link></li>
                        <li><Link to="/">Hotline Kampus</Link></li>
                    </ul>
                </div>
                <div className="md:px-8">
                    <p className="text-lg font-medium mb-4">Menu Utama</p>
                    <ul className="text-sm/6 font-light underline">
                        <li><Link to="/report">Buat Laporan</Link></li>
                        <li><Link to="/artikel">Artikel Dukungan</Link></li>
                        <li><Link to="/hukum">Info Bantuan Hukum</Link></li>
                    </ul>
                </div>
                <div className="md:pl-8">
                    <p className="text-lg font-medium mb-4">Info</p>
                    <ul className="text-sm/6 font-light underline">
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/faq/guide">Panduan Pelaporan</Link></li>
                        <li><Link to="/faq/privacy">Kebijakan Privasi</Link></li>
                    </ul>
                </div>
            </div>
            )}
            <div id="footer-copyright" className="text-xs font-light flex justify-end">
                © 2026 SafeSpace - UPN “Veteran” Jakarta. Platform ini bukan layanan darurat.
            </div>
        </footer>
    )
}