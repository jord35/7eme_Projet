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
    /** Afficher le bouton d'édition (icône crayon) ? */
    showEditButton?: boolean;
    /** Afficher le bouton IA (désactivé) ? */
    showIAButton?: boolean;
    /** Callback du clic sur le bouton d'édition */
    onEditClick?: () => void;
}

/**
 * En-tête de page réutilisable.
 * Gère : titre, description, lien retour, bouton d'action,
 * bouton d'édition (admin), et bouton IA (placeholder).
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
        <div className="mb-6">
            {/* Lien retour */}
            {backLink && (
                <Link
                    href={backLink}
                    className="mb-2 inline-flex items-center gap-1 text-body-s text-neutral-600 hover:text-neutral-950 transition-colors"
                >
                    <Image src="/icons/chevron-down.svg" alt="" width={12} height={12} className="rotate-90" />
                    Retour
                </Link>
            )}

            {/* Titre + actions */}
            <div className="flex items-center justify-between gap-4">
                {/* Titre + description */}
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-h3 font-heading text-neutral-950">{title}</h1>
                        {showEditButton && (
                            <button
                                onClick={onEditClick}
                                className="inline-flex items-center justify-center rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
                                aria-label="Modifier"
                            >
                                <Image src="/icons/edit.svg" alt="" width={16} height={16} />
                            </button>
                        )}
                    </div>
                    {description && (
                        <p className="mt-1 text-body-s text-neutral-600">{description}</p>
                    )}
                </div>

                {/* Bouton d'action */}
                <div className="flex items-center gap-2">
                    {showIAButton && (
                        <button
                            disabled
                            className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-3 py-2 text-body-s font-medium text-neutral-400 cursor-not-allowed"
                            title="Fonctionnalité à venir"
                        >
                            <span>✨</span> IA
                        </button>
                    )}
                    {action && (
                        <Button onClick={action.onClick}>+ {action.label}</Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export { PageHeader };
export type { PageHeaderProps };
