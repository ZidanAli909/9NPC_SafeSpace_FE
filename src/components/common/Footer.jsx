import React from "react"

export function Footer() {
    return (
        <footer className="p-8 text-background" style={{ background: 'linear-gradient(to top, #274662, #A2CEDB)' }}>
            <div className="flex gap-3 divide-x divide-background">
                <div className="basis-full pr-3">
                    <p className="text-lg font-medium">Tentang SafeSpace</p>
                    <p className="text-sm font-light">
                        Platform pelaporan kekerasan di lingkungan UPN “Veteran” Jakarta yang aman, rahasia, dan terintegrasi dengan unit pengaduan kampus.
                    </p>
                </div>
                <div className="basis-full pr-3">
                    <p className="text-lg font-medium">Sumber Daya Kampus</p>
                    <ul className="text-sm/6 font-light underline list-disc list-inside">
                        <li><a href="" target="_blank">Unit Pengaduan Kampus</a></li>
                        <li><a href="" target="_blank">Layanan Konseling Mahasiswa</a></li>
                        <li><a href="" target="_blank">Keamanan Kampus</a></li>
                        <li><a href="" target="_blank">Hotline Kampus</a></li>
                    </ul>
                </div>
                <div className="basis-full pr-3 flex gap-4">
                    <div>
                        <p className="text-lg font-medium">Menu Utama</p>
                        <ul className="text-sm/6 font-light underline list-disc list-inside">
                            <li>Buat Laporan</li>
                            <li>Artikel Dukungan</li>
                            <li>Info Bantuan Hukum</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-lg font-medium">Info</p>
                        <ul className="text-sm/6 font-light underline list-disc list-inside">
                            <li>FAQ</li>
                            <li>Panduan Pelaporan</li>
                            <li>Kebijakan Privasi</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-xs font-light mt-8">
                © 2026 SafeSpace - UPN “Veteran” Jakarta. Platform ini bukan layanan darurat.
            </div>
        </footer>
    )
}