import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, CloudUpload, Calendar } from "lucide-react";
import { ReportService } from "@/services/ReportService";

export default function ReportForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        jenisKejadian: "",
        tanggalKejadian: "",
        lokasi: "",
        deskripsiKejadian: "",
        deskripsiPelaku: "",
        uploadBukti: null,
    });

    const [fileName, setFileName] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setFormData((prev) => ({ ...prev, uploadBukti: file }));
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setFileName(file.name);
            setFormData((prev) => ({ ...prev, uploadBukti: file }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        
        const token = localStorage.getItem("token")
        if (!token) {
            alert("Kamu harus login dulu!")
            navigate("/login")
            return
        }

        try {
            let evidencePaths = [];
            if (formData.uploadBukti) {
                const path = await ReportService.uploadEvidence(formData.uploadBukti);
                evidencePaths = [path];
            }

            const payload = {
                incident: formData.jenisKejadian,
                date: new Date(formData.tanggalKejadian).toISOString(),
                location: formData.lokasi,
                incidentDesc: formData.deskripsiKejadian,
                perpetratorDesc: formData.deskripsiPelaku,
                evidencePaths
            };

            const response = await ReportService.createReport(payload);
            if (response.success) navigate("/submitted");
        } catch (error) {
            console.error(error);
            alert("Gagal mengirim laporan.");
        }
    }

    return (
        <div className="bg-[#FEFAF5] px-6 py-3">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="text-slate-400 hover:text-[#1e3a5f] transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <p className="text-sm text-slate-500">
                    Buat Laporan /{" "}
                    <span className="text-[#2d6a9f] font-medium">Form Pelaporan</span>
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-[#FEFAF5] border border-[#00121D] rounded-2xl p-5">
                <div className="flex flex-col gap-3">
                    {/* Jenis Kejadian */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-sm font-semibold text-slate-700">
                            Jenis Kejadian <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            name="jenisKejadian"
                            placeholder="Kekerasan dll..."
                            value={formData.jenisKejadian}
                            onChange={handleChange}
                            className="rounded-lg border-[#00121D] h-8 text-sm"
                        />
                    </div>

                    {/* Tanggal Kejadian + Lokasi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <Label className="text-sm font-semibold text-slate-700">
                                Tanggal Kejadian <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    name="tanggalKejadian"
                                    type="date"
                                    placeholder="dd/mm/yyyy"
                                    value={formData.tanggalKejadian}
                                    onChange={handleChange}
                                    className="rounded-lg border-[#00121D] h-8 text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-sm font-semibold text-slate-700">
                                Lokasi <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                name="lokasi"
                                placeholder="Gedung/Area..."
                                value={formData.lokasi}
                                onChange={handleChange}
                                className="rounded-lg border-[#00121D] h-8 text-sm"
                            />
                        </div>
                    </div>

                    {/* Deskripsi Kejadian */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-sm font-semibold text-slate-700">
                            Deskripsi Kejadian <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            name="deskripsiKejadian"
                            placeholder="Ceritakan apa saja yang terjadi dengan sedetail mungkin..."
                            value={formData.deskripsiKejadian}
                            onChange={handleChange}
                            className="rounded-lg border-[#00121D] min-h-20 resize-none text-sm"
                        />
                    </div>

                    {/* Deskripsi Pelaku */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-sm font-semibold text-slate-700">
                            Deskripsi Pelaku <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            name="deskripsiPelaku"
                            placeholder="Ceritakan ciri-ciri pelaku dengan sedetail mungkin..."
                            value={formData.deskripsiPelaku}
                            onChange={handleChange}
                            className="rounded-lg border-[#00121D] h-8 text-sm"
                        />
                    </div>

                    {/* Upload Bukti */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-sm font-semibold text-slate-700">
                            Upload Bukti{" "}
                            <span className="font-bold text-slate-700">(Opsional)</span>
                        </Label>
                        <label
                            htmlFor="uploadBukti"
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            className="border border-[#00121D]/30 rounded-lg px-4 py-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors"
                        >
                            <CloudUpload className="w-4 h-4 text-slate-400" />
                            <p className="text-sm text-slate-500">
                                {fileName ? (
                                    <span className="text-[#1e3a5f] font-medium">{fileName}</span>
                                ) : (
                                    <>
                                        <span className="text-[#2d6a9f] font-semibold">Choose a file</span>{" "}
                                        or drag it here.
                                    </>
                                )}
                            </p>
                            <input
                                id="uploadBukti"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*,.pdf,.doc,.docx"
                            />
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-1">
                        <Button
                            onClick={handleSubmit}
                            className="bg-[#4E7489] hover:bg-[#1e3a5f] text-white px-8 py-2 text-sm rounded-lg"
                        >
                            Kirim Laporan dengan Aman
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
