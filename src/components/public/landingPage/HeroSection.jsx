import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Search } from "lucide-react";
import heroImage from "@/assets/safespace_hero.svg?url";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-[#ddeef7] min-h-[90vh] flex items-center">
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <Badge
            variant="outline"
            className="mb-6 text-[#1e3a5f] border-[#1e3a5f]/30 bg-white/60 text-xs px-3 py-1"
          >
            ✦ Platform Pelaporan Kampus
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] leading-tight mb-4">
            Setiap Suaramu
            <br />
            <span className="italic text-[#2d6a9f]">Berhak Didengar</span>
            <br />
            dan Dilindungi
          </h1>

          <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-md">
            SafeSpace hadir sebagai ruang aman bagi mahasiswa untuk melaporkan
            tindak pelecehan, kekerasan, dan situasi tidak aman di kampus secara
            mudah, aman, dan terjamin kerahasiaannya.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/report">
                <Button className="bg-[#4E7489] hover:bg-[#152d4a] text-white px-6 py-5 rounded-lg flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Laporkan Sekarang
                </Button>
            </Link>
            <Button
              variant="outline"
              className="border-[#4E7489]/30 text-[#1e3a5f] hover:bg-[#FEFAF5] px-6 py-5 rounded-lg flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Cari Bantuan
            </Button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex justify-center items-center">
          <div className="w-72 h-72 md:w-96 md:h-96 relative">
            {/* Decorative background circle */}
            <div className="absolute inset-0 rounded-full bg-[#b8d8ee]/40 blur-3xl" />
            {/* Placeholder illustration - replace with your actual SVG/image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-60 h-60 md:w-80 md:h-80 bg-[#c5dff0] rounded-full flex items-center justify-center opacity-80">
                <img
                  src={heroImage}
                  alt="Gender Violation"
                  className="w-60 h-60 md:w-80 md:h-80 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
