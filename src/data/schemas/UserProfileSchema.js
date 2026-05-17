import * as z from "zod"

export const editUserProfileSchema = z.object({
    name: z
        .string("Nama harus berupa string!")
        .min(2, "Nama wajib diisi!")
        .max(50, "Nama tidak bisa lebih dari 50 karakter!"),
    phoneNumber: z
        .string("Nomor telepon harus berupa string!")
        .min(0, "Nomor telepon tidak boleh berupa angka negatif!")
        .max(25, "Nomor telepon tidak boleh lebih dari 25 digit!")
        .regex(/^\d+$/, "Nomor telepon harus berupa angka!"),
    nim: z
        .string("NIM harus berupa string!")
        .min(10, "NIM minimal 10 digit!")
        .max(15, "NIM maksimal 15 digit!")
        .regex(/^\d+$/, "NIM harus berupa angka!"),
    faculty: z
        .string()
        .min(2, "Nama fakultas wajib diisi!")
        .max(100, "Nama fakultas tidak boleh lebih dari 100 karakter!"),
    department: z
        .string()
        .min(2, "Nama departemen wajib diisi!")
        .max(100, "Nama departemen tidak boleh lebih dari 100 karakter!"),
    enrollmentYear: z
        .coerce.number()
        .min(1967, "Kamu lebih tua daripada UPN Veteran Jakarta itu sendiri!")
        .max(new Date().getFullYear(), "Apakah anda dari masa depan?"),
})

export const editUserProfileDefault = {
    name: "",
    phoneNumber: "",
    nim: "",
    faculty: "",
    department: "",
    enrollmentYear: "2026",
}

export const editUserPasswordSchema = z.object({
    oldPassword: z
        .string()
        .min(1, "Password wajib diisi"),
    password: z
        .string()
        .min(1, "Password wajib diisi"),
    confirmPassword: z
        .string()
        .min(1, "Password wajib diisi"),
})

export const editUserPasswordDefault = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
}