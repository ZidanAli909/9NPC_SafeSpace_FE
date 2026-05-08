// import LoginForm from "@/components/public/User-Login/LoginForm";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import {
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { loginFormDefault, loginFormSchema } from "@/data/schemas/AuthSchema";
import { AuthService } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login, refreshSession } = useAuth();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: loginFormDefault,
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await AuthService.login(data);
            const token = response.data?.token;
            const userData = response.data?.user; // Juga untuk cek role
            console.log(response);
            login(userData, token);
            if (response.data?.user.user_metadata.role === "ADMIN") navigate("/admin");
            else navigate("/");
        } catch (error) {
            if (error.response) { // Ada status code (400, 401, 500, dsb.)
                const status = error.response.status;
                const message = error.response.data?.message || "Terjadi kesalahan pada server";
                if (status === 401) { // Unauthorized
                    setError("root", { message: "Email atau password salah." });
                } else if (status === 422) { // Validation errors (mapped)
                    setError("email", { message: "Email tidak valid." });
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

    refreshSession();

    return (
        <div className="py-8 px-24 max-md:px-16 max-sm:px-8 bg-[#ddeef7]">
            <div className="max-w-md mx-auto p-8 bg-background rounded-2xl shadow-sm">
                <h1 className="text-2xl font-semibold text-primary mb-6">
                    Login to your account
                </h1>

                <form id="login" onSubmit={handleSubmit(onSubmit)} className="mb-4">
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={control}
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
                                    <Link to="/register" className="text-sm text-primary underline">
                                        Lupa password?
                                    </Link>
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

                <Button form="login" type="submit" disabled={loading} size="lg" className="w-full mb-4">
                    Login
                    {loading && <LoaderCircle className="animate-spin" />}
                </Button>

                <p className="w-full text-center text-sm text-muted-foreground">
                    Tidak punya akun?
                    <Link to="/register" className="text-primary underline ml-1">Daftar sekarang!</Link>
                </p>
            </div>
        </div>
    );
}
