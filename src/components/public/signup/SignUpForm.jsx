import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Eye, EyeClosed, EyeOff, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthService } from "@/services/AuthService";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormDefault, registerFormSchema } from "@/data/schemas/AuthSchema";

export default function SignUpForm() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerFormSchema),
        defaultValues: registerFormDefault,
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await AuthService.register(data);
            console.log(response);
            if (response.success) {
                alert("Registrasi berhasil! Cek email kamu untuk verifikasi.");
                navigate("/login");
            }
        } catch (error) {
            if (error.response) { // Ada status code (400, 401, 500, dsb.)
                const status = error.response.status;
                const message = error.response.data?.message || "Terjadi kesalahan pada server";
                if (status === 401) { // Unauthorized
                    setError("root", { message: "Pastikan anda mengisi formulir dengan benar!" });
                } else if (status === 422) { // Validation errors (mapped)
                    setError("email", { message: "Tidak bisa registrasi. Email mungkin sudah terdaftar." });
                } else {
                    setError("root", { message });
                }
            } else { // Network error?
                setError("root", { message: "Koneksi gagal. Periksa internet Anda." });
            }
        } finally {
            setLoading(false);
        }
    }

    function handleGoogleSignUp() {
        // TODO: handle Google OAuth
        console.log("Continue with Google");
    }

    return (
        <div className="flex items-center justify-center px-8 py-16 bg-[#FEFAF5]">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-semibold text-[#1e3a5f] mb-6">
                    Registrasi ke SafeSpace
                </h1>

                <form id="register" onSubmit={handleSubmit(onSubmit)} className="mb-4">
                    <FieldGroup>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="johndoe@mail.com"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            {...field}
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="••••••••"
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                                aria-label="Show Password"
                                                title="Show Password"
                                                size="icon-xs"
                                                onClick={() => { setShowPassword(showPassword => !showPassword); }}
                                            >
                                                {showPassword ? (<Eye />) : (<EyeClosed />)}
                                            </InputGroupButton>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="confirmPassword">
                                        Konfirmasi Password
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            {...field}
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="••••••••"
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                                aria-label="Show Password"
                                                title="Show Password"
                                                size="icon-xs"
                                                onClick={() => { setShowConfirmPassword(showConfirmPassword => !showConfirmPassword); }}
                                            >
                                                {showPassword ? (<Eye />) : (<EyeClosed />)}
                                            </InputGroupButton>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    {errors.root && 
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle/>
                            <AlertTitle>Error!</AlertTitle>
                            <AlertDescription>{errors.root.message}</AlertDescription>
                        </Alert>
                    }
                </form>

                <Button
                    form="register" type="submit" disabled={loading} size="lg"
                    className="w-full bg-[#4E7489] hover:bg-[#1e3a5f] text-white rounded-lg py-5 mb-4"
                >
                    Registrasi akun
                    {loading && <LoaderCircle className="animate-spin" />}
                </Button>

                {/* Google OAuth */}
                <Button
                    variant="outline" size="lg" disabled={loading}
                    onClick={handleGoogleSignUp}
                    className="w-full border-slate-300 text-slate-700 rounded-lg py-5 flex items-center gap-2 mb-4"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Lanjut dengan Google
                </Button>

                {/* Log in link */}
                <p className="text-center text-sm text-muted-foreground">
                    Sudah memiliki akun?{" "}
                    <Link to="/login" className="text-primary hover:underline hover:font-medium">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
