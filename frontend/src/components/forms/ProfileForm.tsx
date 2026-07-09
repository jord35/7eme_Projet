"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { updateProfile, updatePassword } from "@/lib/api";
import { profileSchema, type ProfileInput } from "@/lib/validators";

function ProfileForm() {
    const { user, loginSuccess } = useAuth();

    const nameParts = (user?.name || "").split(" ");
    const defaultFirstName = nameParts[0] || "";
    const defaultLastName = nameParts.slice(1).join(" ") || "";

    const form = useForm<ProfileInput>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: defaultFirstName,
            lastName: defaultLastName,
            email: user?.email || "",
            password: "",
        },
    });

    async function onSubmit(data: ProfileInput) {
        try {
            // Mettre à jour le profil (nom + email)
            const fullName = `${data.firstName} ${data.lastName}`;
            const updated = await updateProfile({
                name: fullName,
                email: data.email,
            });
            loginSuccess(sessionStorage.getItem("token")!, updated);

            // Si un mot de passe est fourni, le changer
            if (data.password) {
                // Le backend attend currentPassword + newPassword
                // On utilise le même mot de passe pour les deux
                await updatePassword(data.password, data.password);
            }

            toast.success("Profil mis à jour !");
            form.reset({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: "",
            });
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : "Erreur de mise à jour"
            );
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
        >
            <h2 className="text-h5 font-heading text-neutral-950">
                Modifier les informations
            </h2>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Prénom"
                    error={form.formState.errors.firstName?.message}
                    {...form.register("firstName")}
                />
                <Input
                    label="Nom"
                    error={form.formState.errors.lastName?.message}
                    {...form.register("lastName")}
                />
            </div>

            <Input
                label="Email"
                type="email"
                error={form.formState.errors.email?.message}
                {...form.register("email")}
            />

            <Input
                label="Mot de passe"
                type="password"
                placeholder="Nouveau mot de passe (optionnel)"
                error={form.formState.errors.password?.message}
                {...form.register("password")}
            />

            <Button
                type="submit"
                isLoading={form.formState.isSubmitting}
                className="w-full"
            >
                Enregistrer
            </Button>
        </form>
    );
}

export { ProfileForm };
