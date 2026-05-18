import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, CloudUpload } from "lucide-react";
import { ReportService } from "@/services/ReportService";
import { reportFormSchema, reportFormDefault } from "@/data/schemas/ReportSchema";

export default function ReportForm() {
    const navigate = useNavigate();
    const [fileName, setFileName] = useState("");
    const [uploadBukti, setUploadBukti] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(reportFormSchema),
        defaultValues: reportFormDefault,
    });

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setUploadBukti(file);
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setFileName(file.name);
            setUploadBukti(file);
        }
    }

    async function onSubmit(data) {
        const token = localStorage.getItem("token")
        if (!token) {
            alert("Kamu harus login dulu!")
            navigate("/login")
            return
        }

        try {
            let evidencePaths = [];
            if (uploadBukti) {
                const path = await ReportService.uploadEvidence(uploadBukti);
                evidencePaths = [path];
            }

            const payload = {
                incident: data.jenisKejadian,
                date: new Date(data.tanggalKejadian).toISOString(),
                location: data.lokasi,
                incidentDesc: data.deskripsiKejadian,
                perpetratorDesc: data.deskripsiPelaku,
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
                            {...register("jenisKejadian")}
                            placeholder="Kekerasan dll..."
                            className="rounded-lg border-[#00121D] h-8 text-sm"
                        />
                        {errors.jenisKejadian && (
                            <p className="text-red-500 text-xs">{errors.jenisKejadian.message}</p>
                        )}
                    </div>

                    {/* Tanggal Kejadian + Lokasi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <Label className="text-sm font-semibold text-slate-700">
                                Tanggal Kejadian <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                {...register("tanggalKejadian")}
                                type="date"
                                className="rounded-lg border-[#00121D] h-8 text-sm"
                            />
                            {errors.tanggalKejadian && (
                                <p className="text-red-500 text-xs">{errors.tanggalKejadian.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-sm font-semibold text-slate-700">
                                Lokasi <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                {...register("lokasi")}
                                placeholder="Gedung/Area..."
                                className="rounded-lg border-[#00121D] h-8 text-sm"
                            />
                            {errors.lokasi && (
                                <p className="text-red-500 text-xs">{errors.lokasi.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Deskripsi Kejadian */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-sm font-semibold text-slate-700">
                            Deskripsi Kejadian <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            {...register("deskripsiKejadian")}
                            placeholder="Ceritakan apa saja yang terjadi dengan sedetail mungkin..."
                            className="rounded-lg border-[#00121D] min-h-20 resize-none text-sm"
                        />
                        {errors.deskripsiKejadian && (
                            <p className="text-red-500 text-xs">{errors.deskripsiKejadian.message}</p>
                        )}
                    </div>

                    {/* Deskripsi Pelaku */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-sm font-semibold text-slate-700">
                            Deskripsi Pelaku <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            {...register("deskripsiPelaku")}
                            placeholder="Ceritakan ciri-ciri pelaku dengan sedetail mungkin..."
                            className="rounded-lg border-[#00121D] h-8 text-sm"
                        />
                        {errors.deskripsiPelaku && (
                            <p className="text-red-500 text-xs">{errors.deskripsiPelaku.message}</p>
                        )}
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
                                accept="image/jpeg,image/png,image/jpg,application/pdf,video/mp4,video/mkv"
                            />
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-1">
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            className="bg-[#4E7489] hover:bg-[#1e3a5f] text-white px-8 py-2 text-sm rounded-lg"
                        >
                            {isSubmitting ? "Mengirim..." : "Kirim Laporan dengan Aman"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}