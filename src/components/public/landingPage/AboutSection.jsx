import Imageabout from "@/assets/safespace_about.svg?url";

export default function AboutSection() {
  return (
    <section className="bg-[#FEFAF5] py-24">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Illustration */}
        <div className="flex justify-center">
          <div className="w-72 h-72 relative">
            {/* Decorative blob */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
              src={Imageabout}
              alt="violent"
              className="w-100 h-100 object-contain"
            />
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div>
          <p className="text-[#2d6a9f] text-sm font-semibold mb-2 tracking-wide uppercase">
            Tentang SafeSpace
          </p>
          <h2 className="text-4xl font-bold text-[#1e3a5f] mb-6 leading-tight">
            Apa itu SafeSpace?
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            SafeSpace adalah platform digital yang diciptakan khusus untuk
            komunitas kampus — sebagai jembatan yang aman antara mahasiswa dan
            pihak yang berwenang untuk menangani kejadian serius.
          </p>
        </div>
      </div>
    </section>
  );
}
