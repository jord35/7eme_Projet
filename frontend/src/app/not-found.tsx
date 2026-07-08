"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4">
            <h1 className="text-h1 font-heading text-neutral-950">404</h1>
            <p className="mt-2 text-body-l text-neutral-600">Page non trouvée</p>
            <p className="mt-1 text-body-s text-neutral-400">
                La page que vous cherchez n'existe pas ou a été déplacée.
            </p>
            <Link href={isAuthenticated ? "/dashboard" : "/login"} className="mt-6">
                <Button>Retour à l'accueil</Button>
            </Link>
        </div>
    );
}
