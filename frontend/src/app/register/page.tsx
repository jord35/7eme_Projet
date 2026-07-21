import Image from "next/image";
import Link from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";

export default function RegisterPage() {
    return (
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-5">
            {/* Colonne gauche : logo + formulaire */}
            <div className="flex flex-col bg-neutral-50 md:col-span-2">
                {/* Logo centré */}
                <div className="flex justify-center pt-[93px] px-6">
                    <Image
                        src="/logos/logo-orange.svg"
                        alt="Abricot"
                        width={252}
                        height={32}
                        priority
                    />
                </div>

                {/* Contenu principal avec padding 92 */}
                <div className="flex flex-1 flex-col justify-between px-6 pb-[92px]">
                    {/* Formulaire centré verticalement */}
                    <div className="flex flex-1 flex-col justify-center">
                        <div className="mx-auto w-full max-w-sm">
                            <h1 className="text-center text-h1 font-heading text-brand-orange-dark">Inscription</h1>

                            <div className="mt-[30px]">
                                <AuthForm mode="register" />
                            </div>
                        </div>
                    </div>

                    {/* Footer tout en bas */}
                    <p className="text-center text-body-s text-neutral-500">
                        Déjà un compte ?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-brand-orange-main hover:text-brand-orange-dark"
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
