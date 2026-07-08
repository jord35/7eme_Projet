"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { updateProfile, updatePassword } from "@/lib/api";
import { profileSchema, passwordSchema, type ProfileInput, type PasswordInput } from "@/lib/validators";

function ProfileForm() {
    const { user, loginSuccess } = useAuth();

    const nameParts = (user?.name || "").split(" ");
    const defaultFirstName = nameParts[0] || "";
    const defaultLastName = nameParts.slice(1).join(" ") || "";

    const profileForm = useForm<ProfileInput>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: defaultFirstName,
            lastName: defaultLastName,
            email: user?.email || "",
        },
    });

    const passwordForm = useForm<PasswordInput>({
        resolver: zodResolver(passwordSchema),
    });

    async function onProfileSubmit(data: ProfileInput) {
        try {
            const fullName = `${data.firstName} ${data.lastName}`;
            const updated = await updateProfile({ name: fullName, email: data.email });
            loginSuccess(sessionStorage.getItem("token")!, updated);
            toast.success("Profil mis à jour !");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erreur de mise à jour");
        }
    }

    async function onPasswordSubmit(data: PasswordInput) {
        try {
            await updatePassword(data.currentPassword, data.newPassword);
            toast.success("Mot de passe changé !");
            passwordForm.reset();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erreur de changement");
        }
    }

    return (
        <div className="space-y-8">
            {/* Infos personnelles */}
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <h2 className="text-h5 font-heading text-neutral-950">Informations personnelles</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Prénom"
                        error={profileForm.formState.errors.firstName?.message}
                        {...profileForm.register("firstName")}
                    />
                    <Input
                        label="Nom"
                        error={profileForm.formState.errors.lastName?.message}
                        {...profileForm.register("lastName")}
                    />
                </div>
                <Input
                    label="Email"
                    type="email"
                    error={profileForm.formState.errors.email?.message}
                    {...profileForm.register("email")}
                />
                <Button type="submit" isLoading={profileForm.formState.isSubmitting}>
                    Enregistrer
                </Button>
            </form>

            {/* Mot de passe */}
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <h2 className="text-h5 font-heading text-neutral-950">Changer le mot de passe</h2>
                <Input
                    label="Mot de passe actuel"
                    type="password"
                    error={passwordForm.formState.errors.currentPassword?.message}
                    {...passwordForm.register("currentPassword")}
                />
                <Input
                    label="Nouveau mot de passe"
                    type="password"
                    error={passwordForm.formState.errors.newPassword?.message}
                    {...passwordForm.register("newPassword")}
                />
                <Input
                    label="Confirmer le nouveau mot de passe"
                    type="password"
                    error={passwordForm.formState.errors.confirmNewPassword?.message}
                    {...passwordForm.register("confirmNewPassword")}
                />
                <Button type="submit" isLoading={passwordForm.formState.isSubmitting}>
                    Changer le mot de passe
                </Button>
            </form>
        </div>
    );
}

export { ProfileForm };
