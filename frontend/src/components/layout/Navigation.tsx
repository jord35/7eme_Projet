"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

function Navigation() {
    const pathname = usePathname();
    const { user, isAuthenticated, logout } = useAuth();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="border-b border-neutral-200 bg-neutral-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                {/* Logo + Liens */}
                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Image src="/icons/logo-orange.svg" alt="Abricot" width={32} height={32} />
                    </Link>

                    {isAuthenticated && (
                        <div className="flex gap-4">
                            <Link
                                href="/dashboard"
                                className={`text-body-s font-medium transition-colors ${isActive("/dashboard")
                                        ? "text-brand-orange-main"
                                        : "text-neutral-600 hover:text-neutral-950"
                                    }`}
                            >
                                Tableau de bord
                            </Link>
                            <Link
                                href="/projects"
                                className={`text-body-s font-medium transition-colors ${isActive("/projects")
                                        ? "text-brand-orange-main"
                                        : "text-neutral-600 hover:text-neutral-950"
                                    }`}
                            >
                                Projets
                            </Link>
                        </div>
                    )}
                </div>

                {/* Utilisateur */}
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link
                                href="/profile"
                                className="text-body-s font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
                            >
                                {user?.name}
                            </Link>
                            <button
                                onClick={logout}
                                className="text-body-s text-neutral-400 hover:text-error-main transition-colors"
                            >
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <div className="flex gap-4">
                            <Link
                                href="/login"
                                className="text-body-s font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
                            >
                                Connexion
                            </Link>
                            <Link
                                href="/register"
                                className="text-body-s font-medium text-brand-orange-main hover:text-brand-orange-dark transition-colors"
                            >
                                Inscription
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export { Navigation };
