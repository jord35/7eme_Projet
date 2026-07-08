"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { register as registerUser } from "@/lib/api";
import { registerSchema, type RegisterInput } from "@/lib/validators";

function RegisterForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    async function onSubmit(data: RegisterInput) {
        try {
            const fullName = `${data.firstName} ${data.lastName}`;
            await registerUser(data.email, data.password, fullName);
            toast.success("Compte créé avec succès !");
            router.push("/login");
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Erreur lors de l'inscription";
            toast.error(message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Prénom"
                    placeholder="Alice"
                    error={errors.firstName?.message}
                    {...register("firstName")}
                />
                <Input
                    label="Nom"
                    placeholder="Dupont"
                    error={errors.lastName?.message}
                    {...register("lastName")}
                />
            </div>
            <Input
                label="Email"
                type="email"
                placeholder="alice@example.com"
                error={errors.email?.message}
                {...register("email")}
            />
            <Input
                label="Mot de passe"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password")}
            />
            <Input
                label="Confirmer le mot de passe"
                type="password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
            />
            <Button type="submit" isLoading={isSubmitting} className="w-full">
                Créer un compte
            </Button>
        </form>
    );
}

export { RegisterForm };
