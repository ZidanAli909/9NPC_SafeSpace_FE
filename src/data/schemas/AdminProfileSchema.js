import * as z from "zod"

export const editAdminProfileSchema = z.object({
    name: z
        .string("Nama harus berupa string!")
        .min(2, "Nama wajib diisi!")
        .max(50, "Nama tidak bisa lebih dari 50 karakter!"),
    unit: z
        .string()
        .min(2, "Nama unit wajib diisi!")
        .max(100, "Nama unit tidak bisa lebih dari 100 karakter!"),
})

export const editAdminProfileDefault = {
    name: "",
    unit: "",
}