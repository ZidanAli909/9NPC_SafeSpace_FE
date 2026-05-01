import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Buat Laporan", href: "#laporan" },
    { label: "Bantuan", href: "#bantuan" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-[#1e3a5f] text-lg">SafeSpace</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-slate-600 hover:text-[#1e3a5f] font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Login Button */}
        <div className="hidden md:block">
          <Button className="bg-[#1e3a5f] hover:bg-[#152d4a] text-white text-sm px-5 rounded-md">
            Login
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-slate-600 hover:text-[#1e3a5f] font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button className="bg-[#1e3a5f] hover:bg-[#152d4a] text-white text-sm w-full">
            Login
          </Button>
        </div>
      )}
    </nav>
  );
}
