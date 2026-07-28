import Link from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";
import { AuthLayout } from "@/components/layout/AuthLayout";

export default function RegisterPage() {
    return (
        <AuthLayout
            title="Inscription"
            illustrationSrc="/Sign In.webp"
            footer={
                <>
                    Déjà un compte ?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-brand-orange-main hover:text-brand-orange-dark"
                    >
                        Se connecter
                    </Link>
                </>
            }
        >
            <AuthForm mode="register" />
        </AuthLayout>
    );
}
