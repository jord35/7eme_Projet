"use client";

import Link from "next/link";
import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
            <div className="w-full max-w-sm rounded-lg bg-neutral-white p-8 shadow-sm ring-1 ring-neutral-200">
                <h1 className="text-h4 font-heading text-neutral-950">Connexion</h1>
                <p className="mt-2 text-body-s text-neutral-600">
                    Connectez-vous pour accéder à vos projets.
                </p>

                <div className="mt-6">
                    <LoginForm />
                </div>

                <p className="mt-4 text-center text-body-s text-neutral-500">
                    Pas encore de compte ?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-brand-orange-main hover:text-brand-orange-dark"
                    >
                        S'inscrire
                    </Link>
                </p>
            </div>
        </div>
    );
}
