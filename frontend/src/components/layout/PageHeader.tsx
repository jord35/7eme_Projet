"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface PageHeaderProps {
    /** Titre de la page */
    title: string;
    /** Description optionnelle sous le titre */
    description?: string;
    /** Lien de retour (flèche ←) */
    backLink?: string;
    /** Bouton d'action principal (ex: "Créer un projet", "Créer une tâche") */
    action?: {
        label: string;
        onClick: () => void;
    };
    /** Afficher le bouton d'édition (lien "Modifier") ? */
    showEditButton?: boolean;
    /** Afficher le bouton IA (désactivé) ? */
    showIAButton?: boolean;
    /** Callback du clic sur le bouton d'édition */
    onEditClick?: () => void;
}

/**
 * En-tête de page réutilisable.
 * Gère : titre, description, bouton retour, bouton d'action,
 * lien d'édition (admin), et bouton IA (placeholder).
 *
 * Utilisé dans : Dashboard, Projets, Détail projet.
 */
function PageHeader({
    title,
    description,
    backLink,
    action,
    showEditButton,
    showIAButton,
    onEditClick,
}: PageHeaderProps) {
    return (
        <div className="mb-[60px] mt-[32px] mx-4 sm:mx-6 lg:mx-[125px]">
            <div className="flex items-center gap-4">
                {/* Bouton retour (carré blanc avec flèche) */}
                {backLink && (
                    <Link
                        href={backLink}
                        className="flex items-center justify-center rounded-[10px] bg-neutral-white shadow-sm ring-1 ring-neutral-200 hover:ring-brand-orange-main transition-all size-14 p-6"
                    >
                        <Image src="/icons/arrow-back.svg" alt="Retour" width={16} height={8} />
                    </Link>
                )}

                {/* Titre + description — caché en mobile */}
                <div className="hidden md:block flex-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-h4 font-heading text-neutral-800">{title}</h1>
                        {showEditButton && (
                            <button
                                onClick={onEditClick}
                                className="text-body-s text-brand-orange-main underline hover:text-brand-orange-dark transition-colors"
                            >
                                Modifier
                            </button>
                        )}
                    </div>
                    {description && (
                        <p className="mt-1 text-body-l text-neutral-800">{description}</p>
                    )}
                </div>

                {/* Boutons d'action — centré en mobile */}
                <div className="flex flex-1 items-center justify-center gap-2 md:flex-none">
                    {action && (
                        <Button onClick={action.onClick} className="px-[27px] h-[50px] text-body-m font-normal">
                            {action.label}
                        </Button>
                    )}
                    {showIAButton && (
                        <button
                            disabled
                            className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-3 py-2 text-body-s font-medium text-neutral-400 cursor-not-allowed"
                            title="Fonctionnalité à venir"
                        >
                            <span>✨</span> IA
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export { PageHeader };
export type { PageHeaderProps };
