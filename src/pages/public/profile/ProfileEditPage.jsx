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
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"
import { useProfile } from "@/contexts/ProfileContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserProfileDefault, editUserProfileSchema } from "@/data/schemas/UserProfileSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { ProfileService } from "@/services/ProfileService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

export function ProfileEditPage() {
    const { profile, loadingProfile, refreshProfile } = useProfile();
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(editUserProfileSchema),
        defaultValues: editUserProfileDefault,
    });

    useEffect(() => {
        if (profile) {
            reset({
                name: profile.name ?? editUserProfileDefault.name,
                phoneNumber: profile.phoneNumber ?? editUserProfileDefault.phoneNumber,
                nim: profile.nim ?? editUserProfileDefault.nim,
                faculty: profile.faculty ?? editUserProfileDefault.faculty,
                department: profile.department ?? editUserProfileDefault.department,
                enrollmentYear: profile.enrollmentYear ?? editUserProfileDefault.enrollmentYear,
            })
        }
    }, [profile, reset]);

    const onSubmit = async (data) => {
        // console.log(data);
        try {
            const response = await ProfileService.updateProfile(data);
            toast.success("Data pribadi berhasil diubah!");
            // refreshProfile();
            navigate("/profile");
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 422 && data.errors) {
                    Object.entries(data.errors).forEach(([field, messages]) => {
                        setError(field, {
                            type: "server",
                            message: Array.isArray(messages) ? messages[0] : messages, // Ambil error pertama jika lebih dari satu
                        });
                    });
                } else if (status === 401) {
                    toast.error("Sesi kamu sudah habis. Silahkan login ulang!");
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
            <div className={commonStyle_Section}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link to="/profile" />}>Profil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Ubah Data Pribadi</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className={commonStyle_Section + " max-w-4xl mx-auto"}>
                <p className="text-2xl font-semibold mb-4">Ubah Data Pribadi</p>
            </div>

            <div className="max-w-4xl mx-auto p-8 border rounded-lg">
                <form id="editUserProfile" onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup className="grid grid-cols-2 max-md:flex">
                        <Controller
                            name="name"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="col-span-2">
                                    <FieldLabel htmlFor={field.name}>
                                        Nama
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="John Doe Jane Doe"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Nomor Telepon
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="tel"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="081791876867"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="nim"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Nomor Induk Mahasiswa
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="2012345678"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="faculty"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Fakultas
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Ilmu Komputer"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="department"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Jurusan
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="S1 Informatika"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="enrollmentYear"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Tahun Masuk
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="number"
                                        aria-invalid={fieldState.invalid}
                                        placeholder={new Date().getFullYear().toString()}
                                    />
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
                        disabled={isSubmitting || loadingProfile}
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