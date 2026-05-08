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
  name: z
    .string()
    .min(1, "Nama wajib diisi"),
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