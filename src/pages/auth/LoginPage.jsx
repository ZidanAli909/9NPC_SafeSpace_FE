// import LoginForm from "@/components/public/User-Login/LoginForm";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { loginFormDefault, loginFormSchema } from "@/data/schemas/AuthSchema";
import { AuthService } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";

export default function LoginPage() {
    const { login, isAuthenticated } = useAuth();
    const { profile, loadingProfile, role } = useProfile();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(isAuthenticated);

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
            const userData = response.data?.user;
            // console.log(response);
            setIsLoggingIn(true);
            login(userData, token);
            // Redirecting sekarang ada di useEffect!
        } catch (error) {
            setIsLoggingIn(false);
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
            } else { // Network error, dsb?
                setError("root", { message: "Koneksi gagal. Periksa internet Anda." });
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (loadingProfile || !isLoggingIn) return; // Ignore jika masih loading
        if (profile) {
            if (role === "ADMIN") {
                navigate("/admin");
            } else {
                const isFirstTime = !profile.name ||
                    !profile.phoneNumber ||
                    !profile.nim ||
                    !profile.faculty ||
                    !profile.department ||
                    !profile.enrollmentYear;
                if (isFirstTime) navigate("/setup");
                else navigate("/");
            }
        }
        // setIsLoggingIn(false);
    }, [profile, loadingProfile, isLoggingIn, navigate]);

    return (
        <div className="py-8 px-24 max-md:px-16 max-sm:px-8 bg-[#ddeef7]">
            <title>Safespace | Log In</title>

            <div className="max-w-md mx-auto p-8 bg-background rounded-2xl shadow-sm">
                <h1 className="text-2xl font-semibold text-primary mb-6">
                    Login ke SafeSpace
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
                                        disabled={loading || isLoggingIn}
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
                                            disabled={loading || isLoggingIn}
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
                                    <Link to="/signup" className="text-sm text-primary hover:underline hover:font-medium">
                                        Lupa password?
                                    </Link>
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    {errors.root &&
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle />
                            <AlertTitle>Error!</AlertTitle>
                            <AlertDescription>{errors.root.message}</AlertDescription>
                        </Alert>
                    }
                </form>

                <Button
                    form="login"
                    type="submit"
                    disabled={loading || isLoggingIn}
                    size="lg"
                    className="w-full mb-4"
                >
                    Login
                    {loading || isLoggingIn && <LoaderCircle className="animate-spin" />}
                </Button>

                <p className="w-full text-center text-sm text-muted-foreground">
                    Tidak punya akun?{" "}
                    <Link to="/signup" className="text-primary hover:underline hover:font-medium">Daftar sekarang!</Link>
                </p>
            </div>
        </div>
    );
}
