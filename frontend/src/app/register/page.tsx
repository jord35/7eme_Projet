"use client";

import Link from "next/link";
import { RegisterForm } from "@/components/forms/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
            <div className="w-full max-w-sm rounded-lg bg-neutral-white p-8 shadow-sm ring-1 ring-neutral-200">
                <h1 className="text-h4 font-heading text-neutral-950">Inscription</h1>
                <p className="mt-2 text-body-s text-neutral-600">
                    Créez un compte pour commencer à gérer vos projets.
                </p>

                <div className="mt-6">
                    <RegisterForm />
                </div>

                <p className="mt-4 text-center text-body-s text-neutral-500">
                    Déjà un compte ?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-brand-orange-main hover:text-brand-orange-dark"
                    >
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}
