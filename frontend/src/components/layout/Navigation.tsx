"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { Avatar } from "@/components/ui/Avatar";

function Navigation() {
    const pathname = usePathname();
    const { user, isAuthenticated } = useAuth();

    const isActive = (path: string) =>
        pathname === path || (path === "/projects" && pathname.startsWith("/projects/"));

    return (
        <nav className="border-b border-neutral-200 bg-neutral-white">
            <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-[100px] py-2 max-md:px-0">
                {/* Logo */}
                <Link href="/dashboard">
                    <Image src="/logos/logo-orange.svg" alt="Abricot" width={147} height={18.72} className="shrink-0 max-md:w-[74px]" />
                </Link>

                {/* Liens centrés */}
                {isAuthenticated && (
                    <div className="flex items-center gap-4 md:gap-2 max-md:gap-0">
                        <Link
                            href="/dashboard"
                            className={`flex items-center justify-center gap-2 rounded-md px-4 h-[50px] min-w-[50px] md:h-[78px] md:min-w-0 text-body-s font-medium tracking-wide transition-colors ${isActive("/dashboard")
                                ? "bg-neutral-800 text-neutral-white"
                                : "text-brand-orange-main hover:bg-neutral-100"
                                }`}
                        >
                            {isActive("/dashboard") ? (
                                <>
                                    <img src="/icons/dashboard-white.svg" alt="Tableau de bord" width={16} height={16} className="shrink-0" />
                                    <span className="hidden md:inline">Tableau de bord</span>
                                </>
                            ) : (
                                <>
                                    <span className="hidden md:inline">Tableau de bord</span>
                                    <img src="/icons/dashboard.svg" alt="Tableau de bord" width={16} height={16} className="shrink-0" />
                                </>
                            )}
                        </Link>
                        <Link
                            href="/projects"
                            className={`flex items-center justify-center gap-2 rounded-md px-4 h-[50px] min-w-[50px] md:h-[78px] md:w-[140px] md:min-w-0 text-body-s font-medium tracking-wide transition-colors ${isActive("/projects")
                                ? "bg-neutral-800 text-neutral-white"
                                : "text-brand-orange-main hover:bg-neutral-100"
                                }`}
                        >
                            <img
                                src={isActive("/projects") ? "/icons/project-white.svg" : "/icons/project.svg"}
                                alt="Projets"
                                width={16}
                                height={16}
                                className="shrink-0"
                            />
                            <span className="hidden md:inline">Projets</span>
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
                            className={`text-body-s tracking-wide ${pathname === "/profile" ? "!bg-brand-orange-dark !text-neutral-white" : ""}`}
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
