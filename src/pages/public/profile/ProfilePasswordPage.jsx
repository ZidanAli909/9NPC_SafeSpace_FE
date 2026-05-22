import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordFormSchema, passwordFormDefault } from "@/data/schemas/AuthSchema";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, EyeClosed, Eye } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { AuthService } from "@/services/AuthService";

export function ProfilePasswordPage() {
    const [ showCurrentPassword, setShowCurrentPassword ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: passwordFormDefault,
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        console.log(data);
        setShowCurrentPassword(false);
        setShowPassword(false);
        setShowConfirmPassword(false);
        try {
            const response = await AuthService.updatePassword(data);
            toast.success("Password berhasil diubah!");
            // console.log(response);
            // refreshProfile();
            navigate("/profile");
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400 && data.errors) {
                    Object.entries(data.errors).forEach(([field, messages]) => {
                        setError(field, {
                            type: "server",
                            message: Array.isArray(messages) ? messages[0] : messages, // Ambil error pertama jika lebih dari satu
                        });
                    });
                } else if (status === 401) {
                    toast.error("Sesi sudah habis. Silahkan login ulang!");
                } else if (status >= 500) {
                    toast.error("Server sedang mengalami masalah. Silahkan coba lagi nanti!");
                } else {
                    toast.error("Terjadi suatu kesalahan. Silahkan coba lagi!");
                }
            } else { // Network error, timeout, dll.
                toast.error("Tidak dapat terhubung ke server. Silahkan coba periksa koneksi internet!");
            }
            console.log("Error:", error);
        }
    }

    return (
        <div className={commonStyle_Page}>
            <title>Safespace | Edit Password</title>

            <div className={commonStyle_Section}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link to="/profile" />}>Profil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Ubah Password</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className={commonStyle_Section + " max-w-4xl mx-auto"}>
                <p className="text-2xl font-semibold mb-4">Ubah Password</p>
            </div>

            <div className="max-w-4xl mx-auto p-8 border rounded-lg">
                <form id="editUserProfile" onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup className="md:max-w-sm md:mx-auto">
                        <Controller
                            name="currentPassword"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="currentPassword">
                                        Password Sekarang
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            {...field}
                                            id="password-current"
                                            type={showCurrentPassword ? "text" : "password"}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="••••••••"
                                            disabled={isSubmitting}
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                                aria-label="Show Password"
                                                title="Show Password"
                                                size="icon-xs"
                                                onClick={() => { setShowCurrentPassword(showCurrentPassword => !showCurrentPassword); }}
                                            >
                                                {showCurrentPassword ? (<Eye />) : (<EyeClosed />)}
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
                            name="newPassword"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="newPassword">
                                        Password Baru
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            {...field}
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="••••••••"
                                            disabled={isSubmitting}
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
                                            id="password-confirm"
                                            type={showConfirmPassword ? "text" : "password"}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="••••••••"
                                            disabled={isSubmitting}
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                                aria-label="Show Password"
                                                title="Show Password"
                                                size="icon-xs"
                                                onClick={() => { setShowConfirmPassword(showConfirmPassword => !showConfirmPassword); }}
                                            >
                                                {showConfirmPassword ? (<Eye />) : (<EyeClosed />)}
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
                </form>

                {errors.root &&
                    <Alert variant="destructive" className="mt-8">
                        <AlertCircle />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{errors.root.message}</AlertDescription>
                    </Alert>
                }

                <div className="flex max-md:flex-col justify-end gap-2 mt-8">
                    <Button
                        size="lg"
                        type="submit"
                        form="editUserProfile"
                        disabled={isSubmitting}
                    >
                        Simpan
                        {isSubmitting && (<Loader2 className="animate-spin ml-1" />)}
                    </Button>
                    <Button
                        size="lg"
                        variant="secondary"
                        onClick={() => navigate("/profile")}
                        disabled={isSubmitting}
                    >
                        Batal
                    </Button>
                </div>
            </div>
        </div>
    )
}