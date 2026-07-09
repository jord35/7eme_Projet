"use client";

import { useEffect, useCallback, type ReactNode } from "react";

interface ModalProps {
    /** Contrôle l'ouverture de la modale */
    isOpen: boolean;
    /** Callback appelé quand l'utilisateur ferme (Escape ou clic overlay) */
    onClose: () => void;
    /** Titre optionnel de la modale */
    title?: string;
    /** Contenu de la modale */
    children: ReactNode;
}

/**
 * Modale réutilisable.
 * Gère : overlay cliquable, fermeture avec Escape, blocage du scroll,
 * accessibilité (role="dialog", aria-modal, aria-labelledby).
 *
 * @example
 * <Modal isOpen={show} onClose={() => setShow(false)} title="Créer un projet">
 *   <CreateProjectForm onSuccess={handleSuccess} />
 * </Modal>
 */
function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        },
        [onClose],
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Contenu */}
            <div
                className="relative z-10 mx-4 w-full max-w-lg rounded-lg bg-neutral-white p-6 shadow-xl ring-1 ring-neutral-200"
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "modal-title" : undefined}
            >
                {title && (
                    <h2 id="modal-title" className="text-h5 font-heading text-neutral-950">
                        {title}
                    </h2>
                )}
                <div className={title ? "mt-4" : ""}>{children}</div>
            </div>
        </div>
    );
}

export { Modal };
export type { ModalProps };
