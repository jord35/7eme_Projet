import Link from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";
import { AuthLayout } from "@/components/layout/AuthLayout";

export default function LoginPage() {
    return (
        <AuthLayout
            title="Connexion"
            footer={
                <>
                    Pas encore de compte ?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-brand-orange-main hover:text-brand-orange-dark"
                    >
                        S'inscrire
                    </Link>
                </>
            }
        >
            <AuthForm mode="login" />
            <p className="mt-[21px] text-center text-body-s">
                <Link
                    href="#"
                    className="text-brand-orange-main hover:text-brand-orange-dark transition-colors"
                >
                    Mot de passe oublié ?
                </Link>
            </p>
        </AuthLayout>
    );
}
