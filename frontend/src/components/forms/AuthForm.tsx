"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { login, register as registerUser } from "@/lib/api";
import { loginSchema, registerSchema } from "@/lib/validators";
import type { LoginInput, RegisterInput } from "@/lib/validators";

interface AuthFormProps {
    mode: "login" | "register";
}

const CONFIG = {
    login: {
        title: "Connexion",
        description: "Connectez-vous pour accéder à vos projets.",
        buttonLabel: "Se connecter",
        schema: loginSchema,
        apiCall: (data: LoginInput) => login(data.email, data.password),
        successMessage: "Connexion réussie !",
        successRedirect: "/dashboard",
        footer: {
            text: "Pas encore de compte ?",
            linkText: "S'inscrire",
            linkHref: "/register",
        },
    },
    register: {
        title: "Inscription",
        description: "Créez un compte pour commencer à gérer vos projets.",
        buttonLabel: "Créer un compte",
        schema: registerSchema,
        apiCall: (data: RegisterInput) => registerUser(data.email, data.password),
        successMessage: "Compte créé avec succès !",
        successRedirect: "/login",
        footer: {
            text: "Déjà un compte ?",
            linkText: "Se connecter",
            linkHref: "/login",
        },
    },
} as const;

function AuthForm({ mode }: AuthFormProps) {
    const router = useRouter();
    const { loginSuccess } = useAuth();
    const config = CONFIG[mode];

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput | RegisterInput>({
        resolver: zodResolver(config.schema),
    });

    async function onSubmit(data: LoginInput | RegisterInput) {
        try {
            const result = await config.apiCall(data as any);
            if (mode === "login") {
                loginSuccess(result.token, result.user);
            }
            toast.success(config.successMessage);
            router.push(config.successRedirect);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Une erreur est survenue";
            toast.error(message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-[30px]">
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
            <Button type="submit" isLoading={isSubmitting} className="w-full">
                {config.buttonLabel}
            </Button>
        </form>
    );
}

export { AuthForm };
export type { AuthFormProps };
