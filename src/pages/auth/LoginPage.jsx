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
} from "@/components/ui/field"
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles";
import { loginFormDefault, loginFormSchema } from "@/data/schemas/AuthSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { set } from "zod";
import { LoaderCircle } from "lucide-react";
import { AuthService } from "@/services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function LoginPage() {
    // NOTE: Temporary page. @Jihan may replace this page!
    const navigate = useNavigate();
    
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: loginFormDefault,
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const responseData = await AuthService.login(data);
            const token = responseData.data?.token || responseData.token;
            const user = responseData.data?.user || responseData.user; // Ambil data user untuk cek role

            if (token) {
                login(user, token);
                navigate("/");
            } else {
                console.error("Token tidak ditemukan.");
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={commonStyle_Page}>
            <div className={commonStyle_Section}>
                <p className="text-2xl font-semibold">Login</p>
            </div>

            <div className={commonStyle_Section + " max-w-sm mx-auto"}>
                <form id="login" onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
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
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="password"
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="••••••••"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
                <Button form="login" type="submit" disabled={loading} size="lg">
                    Login
                    {loading && <LoaderCircle className="animate-spin" />}
                </Button>
            </div>
        </div>
    )
}