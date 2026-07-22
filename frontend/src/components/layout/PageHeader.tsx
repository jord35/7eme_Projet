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
        <div className="mb-6">
            <div className="flex items-start gap-4">
                {/* Bouton retour (carré blanc avec flèche) */}
                {backLink && (
                    <Link
                        href={backLink}
                        className="flex items-center justify-center rounded-[10px] bg-neutral-white shadow-sm ring-1 ring-neutral-200 hover:ring-brand-orange-main transition-all"
                        style={{ width: 57, height: 57, padding: 24 }}
                    >
                        <Image src="/icons/arrow-back.svg" alt="Retour" width={16} height={8} />
                    </Link>
                )}

                {/* Titre + description */}
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-h3 font-heading text-neutral-950">{title}</h1>
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
                        <p className="mt-1 text-body-s text-neutral-600">{description}</p>
                    )}
                </div>

                {/* Boutons d'action */}
                <div className="flex items-center gap-2">
                    {action && (
                        <Button onClick={action.onClick}>{action.label}</Button>
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
