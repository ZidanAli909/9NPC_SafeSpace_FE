import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
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
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit2, Image, Info, Loader2, Lock, LucideKeyRound, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { commonStyle_Page, commonStyle_Section } from "@/lib/commonStyles"
import { useProfile } from "@/contexts/ProfileContext"
import { Skeleton } from "@/components/ui/skeleton"
import { formatTimestamp } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editAdminProfileDefault, editAdminProfileSchema } from "@/data/schemas/AdminProfileSchema"
import { ProfileService } from "@/services/ProfileService"
import { toast } from "sonner"
import { ProfilePictureUploadDialog } from "@/components/public/profile/ProfilePictureUploadDialog"
import { ProfilePictureDeleteDialog } from "@/components/public/profile/ProfilePictureDeleteDialog"

function DetailsProfileSkeleton() {
    return (
        <>
            <div className="mb-4">
                <Skeleton className="h-5 w-full" />
                <div className="text-sm flex flex-col gap-2 p-4">
                    <div className="flex flex-row">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                    </div>
                    <div className="flex flex-row">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                    </div>
                    <div className="flex flex-row">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                    </div>
                    <div className="flex flex-row">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                    </div>
                    <div className="flex flex-row">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <Skeleton className="h-5 w-full" />
                <div className="text-sm flex flex-col gap-2 p-4">
                    <div className="flex flex-row">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                    </div>
                    <div className="flex flex-row">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                    </div>
                </div>
            </div>
        </>
    )
}

function DetailsProfile({
    profile,
    activity,
}) {
    const { loadingProfile, refreshProfile } = useProfile();
    const [editMode, setEditMode] = useState(false);

    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(editAdminProfileSchema),
        defaultValues: editAdminProfileDefault
    });

    useEffect(() => {
        if (profile) {
            reset({
                name: profile.name ?? editAdminProfileDefault.name,
                unit: profile.unit ?? editAdminProfileDefault.unit,
            })
        }
    }, [profile, reset]);

    const handleSubmitChanges = async (data) => {
        // console.log(data);
        try {
            const response = await ProfileService.updateAdminProfile(data);
            toast.success("Data pribadi admin berhasil diubah!");
            setEditMode(false);
            refreshProfile();
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
    };

    const handleCancel = () => {
        reset();
        setEditMode(false);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    return (
        <>
            <div className="mb-4">
                <p className="font-medium text-lg">Informasi Akun</p>
                <div className="text-sm flex flex-col gap-2 p-4">
                    <div className="flex flex-row">
                        <p className="font-semibold basis-32">ID Admin</p>
                        <p className="font-light flex-1">{profile?.id ?? "-"}</p>
                    </div>
                    <div className="flex flex-row">
                        <p className="font-semibold basis-32">Tanggal Dibuat</p>
                        <p className="font-light flex-1">{formatTimestamp(profile?.createdAt) ?? "-"}</p>
                    </div>
                    <div className="flex flex-row">
                        <p className="font-semibold basis-32">Email</p>
                        <p className="font-light flex-1">{profile?.email ?? "-"}</p>
                    </div>
                    <form
                        onSubmit={handleSubmit(handleSubmitChanges)}
                        className={"flex flex-col gap-3 rounded-lg " + (editMode && "border p-4")}
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Nama</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        readOnly={!editMode}
                                        id={field.name}
                                        type="text"
                                    />
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                </Field>
                            )}
                        />
                        <Controller
                            name="unit"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Unit</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        readOnly={!editMode}
                                        id={field.name}
                                        type="text"
                                    />
                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                </Field>
                            )}
                        />
                        {errors.root &&
                            <Alert variant="destructive" className="mt-8">
                                <AlertCircle />
                                <AlertTitle>Error!</AlertTitle>
                                <AlertDescription>{errors.root.message}</AlertDescription>
                            </Alert>
                        }
                        {editMode && (
                            <div className="flex flex-row gap-4 justify-end">
                                <Button
                                    variant="default"
                                    className="lg:h-9"
                                    disabled={isSubmitting || loadingProfile}
                                    type="submit"
                                >
                                    {isSubmitting && <Loader2 className="mr-1 animate-spin" />}
                                    Simpan
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="lg:h-9"
                                    onClick={handleCancel}
                                    disabled={isSubmitting}
                                >
                                    Batal
                                </Button>
                            </div>
                        )}
                    </form>
                </div>
                {!editMode && (
                    <Button
                        variant="outline"
                        className="mb-4 lg:h-9"
                        onClick={handleEdit}
                    >
                        <Edit2 className="mr-2" />
                        Ubah Data Akun
                    </Button>
                )}
            </div>

            <div className="mb-4">
                <p className="font-medium text-lg">Aktivitas Terakhir</p>
                <div className="text-sm flex flex-col gap-2 p-4">
                    <div>
                        <p className="font-semibold mb-2">Terakhir Login</p>
                        <p className="font-light">{formatTimestamp(activity?.lastLogin) ?? "-"}</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-2">Laporan Tinjauan Minggu Ini</p>
                        <p className="font-light">{activity?.WeeklyReportCount + " laporan" ?? "-"}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

function ProfilePicture({
    profile,
}) {
    const { refreshProfile } = useProfile();
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    
    return (
        <>
            <Avatar className="w-32 h-32 md:mx-auto">
                <AvatarImage src={profile?.profilePictureUrl} alt={"Foto profil " + profile?.name} className="bg-black" />
                <AvatarFallback className="text-6xl">
                    {profile && profile.name != null
                        ? profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase()
                        : "?"}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-4 max-lg:gap-2 lg:mx-auto">
                <Button
                    variant="outline"
                    className="lg:h-9"
                    onClick={() => setIsUploadOpen(true)}
                >
                    <Image />
                    Ganti Foto Profil
                </Button>
                <Button
                    variant="outline"
                    className="lg:h-9 text-destructive"
                    onClick={() => setIsDeleteOpen(true)}
                >
                    <Trash />
                    Hapus Foto Profil
                </Button>
            </div>

            <ProfilePictureUploadDialog
                open={isUploadOpen}
                onOpenChange={setIsUploadOpen}
            />
            <ProfilePictureDeleteDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
            />
        </>
    )
}

export function AdminProfileDetailsPage() {
    const { profile, loadingProfile } = useProfile();

    return (
        <div className={commonStyle_Page}>
            <title>Safespace | Profile</title>

            <div className={commonStyle_Section}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>Profile</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Detail Profil</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className={commonStyle_Section + " max-w-4xl mx-auto"}>
                <p className="text-2xl font-semibold mb-4">Detail Profil</p>
            </div>

            <div className="flex max-md:flex-col flex-row gap-4 max-w-4xl mx-auto">

                {/* Side Page */}
                {/* TODO: Responsive */}
                <div className="md:basis-48 lg:basis-64 flex flex-col max-md:flex-row gap-8 max-md:mx-auto items-center md:pt-4">
                    <ProfilePicture profile={profile} />
                </div>

                {/* Main Page */}
                <div className="flex-1 border rounded-lg p-8 max-w-3xl">
                    {!loadingProfile ? <DetailsProfile profile={profile.admin} activity={profile.activity} /> : <DetailsProfileSkeleton />}
                </div>
            </div>
        </div>
    )
}