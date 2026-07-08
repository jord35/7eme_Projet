"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { login } from "@/lib/api";
import { loginSchema, type LoginInput } from "@/lib/validators";

function LoginForm() {
    const router = useRouter();
    const { loginSuccess } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data: LoginInput) {
        try {
            const result = await login(data.email, data.password);
            loginSuccess(result.token, result.user);
            toast.success("Connexion réussie !");
            router.push("/dashboard");
        } catch {
            toast.error("Email ou mot de passe incorrect");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                Se connecter
            </Button>
        </form>
    );
}

export { LoginForm };
