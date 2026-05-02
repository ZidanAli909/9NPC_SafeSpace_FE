import React from "react"

export function Footer({
    showFooterNav = true
}) {
    return (
        <footer className="p-8 text-background" style={{ background: 'linear-gradient(to top, #274662, #4E7489)' }}>
            {showFooterNav && (
                <div id="footer-nav" className="flex max-md:flex-col gap-3 md:divide-x divide-muted mb-8">
                    <div className="basis-full pr-3">
                        <p className="text-lg font-medium mb-4 max-lg:mb-2">Tentang SafeSpace</p>
                        <p className="text-sm font-light">
                            Platform pelaporan kekerasan di lingkungan UPN “Veteran” Jakarta yang aman, rahasia, dan terintegrasi dengan unit pengaduan kampus.
                        </p>
                    </div>
                    <div className="basis-full pr-3">
                        <p className="text-lg font-medium mb-4 max-lg:mb-2">Sumber Daya Kampus</p>
                        <ul className="text-sm/6 max-lg:text-xs/5 font-light underline list-disc list-inside ml-1">
                            <li><a href="" target="_blank">Unit Pengaduan Kampus</a></li>
                            <li><a href="" target="_blank">Layanan Konseling Mahasiswa</a></li>
                            <li><a href="" target="_blank">Keamanan Kampus</a></li>
                            <li><a href="" target="_blank">Hotline Kampus</a></li>
                        </ul>
                    </div>
                    <div className="flex max-lg:flex-col basis-full pr-3 gap-4 max-lg:gap-2">
                        <div>
                            <p className="text-lg font-medium mb-4 max-lg:mb-2">Menu Utama</p>
                            <ul className="text-sm/6 max-lg:text-xs/5 font-light underline list-disc list-inside ml-1">
                                <li>Buat Laporan</li>
                                <li>Artikel Dukungan</li>
                                <li>Info Bantuan Hukum</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-lg font-medium mb-4 max-lg:mb-2">Info</p>
                            <ul className="text-sm/6 max-lg:text-xs/5 font-light underline list-disc list-inside ml-1">
                                <li>FAQ</li>
                                <li>Panduan Pelaporan</li>
                                <li>Kebijakan Privasi</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            <div id="footer-copyright" className="text-xs font-light">
                © 2026 SafeSpace - UPN “Veteran” Jakarta. Platform ini bukan layanan darurat.
            </div>
        </footer>
    )
}