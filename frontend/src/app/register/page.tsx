"use client";

import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/components/forms/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-5">
            {/* Colonne gauche : logo + formulaire */}
            <div className="flex flex-col bg-neutral-50 px-6 md:col-span-2">
                {/* Logo centré avec padding top */}
                <div className="flex justify-center pt-[93px]">
                    <Image
                        src="/logos/logo-orange.svg"
                        alt="Abricot"
                        width={252}
                        height={32}
                        priority
                    />
                </div>

                {/* Formulaire */}
                <div className="mx-auto mt-12 w-full max-w-sm">
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

            {/* Image à droite */}
            <div className="relative hidden md:col-span-3 md:block">
                <Image
                    src="/auth-illustration.png"
                    alt="Illustration de bienvenue"
                    fill
                    sizes="50vw"
                    className="object-cover"
                    priority
                />
            </div>
        </div>
    );
}
