import * as z from "zod"

export const loginFormSchema = z.object({
  email: z
    .email("Email tidak valid")
    .min(1, "Email wajib diisi"),
  password: z
    .string()
    .min(1, "Password wajib diisi"),
})

export const loginFormDefault = {
    email: "",
    password: "",
}

export const registerFormSchema = z.object({
  email: z
    .email("Email tidak valid")
    .min(1, "Email wajib diisi"),
  password: z
    .string()
    .min(1, "Password wajib diisi"),
  confirmPassword: z
    .string()
    .min(1, "Password wajib diisi"),
})

export const registerFormDefault = {
    email: "",
    password: "",
    confirmPassword: "",
}

export const passwordFormSchema = z.object({
    currentPassword: z
        .string()
        .min(1, "Password wajib diisi"),
    newPassword: z
        .string()
        .min(8, "Password wajib diisi dan minimal 8 karakter")
        .max(50, "Password tidak boleh lebih dari 50 karakter!")
        .regex(/[A-Z]/, "Password harus mengandung minimal satu huruf besar")
        .regex(/[a-z]/, "Password harus mengandung minimal satu huruf kecil")
        .regex(/[0-9]/, "Password harus mengandung minimal satu angka"),
    confirmPassword: z
        .string()
        .min(1, "Password wajib diisi"),
})

export const passwordFormDefault = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
}