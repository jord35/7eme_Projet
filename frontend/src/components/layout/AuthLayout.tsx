import Image from "next/image";
import type { ReactNode } from "react";

interface AuthLayoutProps {
    title: string;
    children: ReactNode;
    footer: ReactNode;
    illustrationSrc?: string;
}

export function AuthLayout({
    title,
    children,
    footer,
    illustrationSrc = "/auth-illustration.webp",
}: AuthLayoutProps) {
    return (
        <div className="flex flex-col md:flex-row">
            {/* Colonne gauche : logo + formulaire */}
            <div className="flex w-full flex-col bg-neutral-50 md:h-screen md:w-[562px] md:min-w-[562px]">
                {/* Logo centré */}
                <div className="flex justify-center pt-[93px]">
                    <Image
                        src="/logos/logo-orange.svg"
                        alt="Abricot"
                        width={252}
                        height={32}
                        priority
                    />
                </div>

                {/* Contenu principal */}
                <div className="flex flex-1 flex-col pb-[93px]">
                    <div className="mx-auto mt-[202px] w-[282px]">
                        <h1 className="text-center text-h1 font-heading text-brand-orange-dark">
                            {title}
                        </h1>

                        <div className="mt-[30px]">{children}</div>
                    </div>

                    {/* Espaceur flexible pour pousser le footer en bas */}
                    <div className="flex-1" />

                    {/* Footer tout en bas */}
                    <p className="text-center text-body-s text-neutral-500">
                        {footer}
                    </p>
                </div>
            </div>

            {/* Image à droite */}
            <div className="relative hidden flex-1 md:block">
                <Image
                    src={illustrationSrc}
                    alt="Illustration de bienvenue"
                    fill
                    sizes="50vw"
                    className="object-cover object-right"
                    priority
                />
            </div>
        </div>
    );
}
