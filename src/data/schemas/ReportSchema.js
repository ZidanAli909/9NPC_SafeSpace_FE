import * as z from "zod"

export const reportFormSchema = z.object({
    jenisKejadian: z
        .string()
        .min(1, "Jenis kejadian wajib diisi"),
    tanggalKejadian: z
        .string()
        .min(1, "Tanggal kejadian wajib diisi"),
    lokasi: z
        .string()
        .min(1, "Lokasi wajib diisi"),
    deskripsiKejadian: z
        .string()
        .min(10, "Deskripsi kejadian minimal 10 karakter"),
    deskripsiPelaku: z
        .string()
        .min(1, "Deskripsi pelaku wajib diisi"),
})

export const reportFormDefault = {
    jenisKejadian: "",
    tanggalKejadian: "",
    lokasi: "",
    deskripsiKejadian: "",
    deskripsiPelaku: "",
}