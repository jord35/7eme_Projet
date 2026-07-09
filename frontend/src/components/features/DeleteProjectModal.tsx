"use client";

import { Modal } from "@/components/ui/Modal";

interface DeleteProjectModalProps {
    /** Contrôle l'ouverture de la modale */
    isOpen: boolean;
    /** Callback appelé quand l'utilisateur confirme la suppression */
    onConfirm: () => void;
    /** Callback appelé quand l'utilisateur annule */
    onCancel: () => void;
    /** État de chargement pendant la suppression */
    isDeleting: boolean;
}

/**
 * Modale de confirmation pour la suppression d'un projet.
 * Utilise le composant Modal réutilisable.
 */
function DeleteProjectModal({
    isOpen,
    onConfirm,
    onCancel,
    isDeleting,
}: DeleteProjectModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onCancel} title="Supprimer le projet">
            <p className="text-body-s text-neutral-600">
                Êtes-vous sûr de vouloir supprimer ce projet ? Cette action
                est irréversible.
            </p>
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

export { DeleteProjectModal };
export type { DeleteProjectModalProps };
