"use client";

import { Modal } from "@/components/ui/Modal";

interface ConfirmDeleteModalProps {
    /** Contrôle l'ouverture de la modale */
    isOpen: boolean;
    /** Callback appelé quand l'utilisateur confirme la suppression */
    onConfirm: () => void;
    /** Callback appelé quand l'utilisateur annule */
    onCancel: () => void;
    /** État de chargement pendant la suppression */
    isDeleting: boolean;
    /** Titre de la modale */
    title?: string;
    /** Message de confirmation */
    message?: string;
}

/**
 * Modale de confirmation générique pour la suppression.
 * Utilisée pour les projets et les tâches.
 */
function ConfirmDeleteModal({
    isOpen,
    onConfirm,
    onCancel,
    isDeleting,
    title = "Supprimer",
    message = "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.",
}: ConfirmDeleteModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onCancel} title={title}>
            <p className="text-body-s text-neutral-600">{message}</p>
            <div className="mt-6 flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    disabled={isDeleting}
                    className="rounded-md bg-neutral-white px-4 py-2 text-body-s font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200 hover:bg-neutral-50"
                >
                    Annuler
                </button>
                <button
                    onClick={onConfirm}
                    disabled={isDeleting}
                    className="rounded-md bg-error-main px-4 py-2 text-body-s font-medium text-neutral-white shadow-sm hover:bg-error-main/80 disabled:opacity-50"
                >
                    {isDeleting ? "Suppression..." : "Supprimer"}
                </button>
            </div>
        </Modal>
    );
}

export { ConfirmDeleteModal };
export type { ConfirmDeleteModalProps };
