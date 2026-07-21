"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { Avatar } from "@/components/ui/Avatar";

function Navigation() {
    const pathname = usePathname();
    const { user, isAuthenticated } = useAuth();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="border-b border-neutral-200 bg-neutral-white">
            <div className="mx-auto flex items-center justify-between px-[100px] py-3">
                {/* Logo */}
                <Link href="/dashboard">
                    <Image src="/logos/logo-orange.svg" alt="Abricot" width={147} height={19} />
                </Link>

                {/* Liens centrés */}
                {isAuthenticated && (
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className={`flex items-center gap-2 rounded-md px-4 py-2 text-body-s font-medium tracking-wide transition-colors ${isActive("/dashboard")
                                ? "bg-neutral-800 text-neutral-white"
                                : "text-brand-orange-main hover:bg-neutral-100"
                                }`}
                        >
                            <img
                                src={isActive("/dashboard") ? "/icons/dashboard-white.svg" : "/icons/dashboard.svg"}
                                alt=""
                                width={16}
                                height={16}
                            />
                            Tableau de bord
                        </Link>
                        <Link
                            href="/projects"
                            className={`flex items-center gap-2 rounded-md px-4 py-2 text-body-s font-medium tracking-wide transition-colors ${isActive("/projects")
                                ? "bg-neutral-800 text-neutral-white"
                                : "text-brand-orange-main hover:bg-neutral-100"
                                }`}
                        >
                            <img
                                src={isActive("/projects") ? "/icons/project-white.svg" : "/icons/project.svg"}
                                alt=""
                                width={16}
                                height={16}
                            />
                            Projets
                        </Link>
                    </div>
                )}

                {/* Avatar utilisateur */}
                <div className="flex items-center">
                    {isAuthenticated ? (
                        <Avatar
                            name={user?.name}
                            isCurrentUser={true}
                            linkToProfile={true}
                            size={65}
                            className="text-body-s"
                        />
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
