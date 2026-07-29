"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import Image from "next/image";

interface ModalProps {
    /** Contrôle l'ouverture de la modale */
    isOpen: boolean;
    /** Callback appelé quand l'utilisateur ferme (Escape ou clic overlay) */
    onClose: () => void;
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
function Modal({ isOpen, onClose, children }: ModalProps) {
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
                className="relative z-10 mx-4 w-full max-w-[598px] rounded-lg bg-neutral-white shadow-xl ring-1 ring-neutral-200"
                role="dialog"
                aria-modal="true"
            >
                {/* Croix de fermeture — propre à la modale */}
                <div className="flex justify-end pt-[37px] pr-[38.67px]">
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center rounded-md p-1 text-neutral-600 hover:bg-neutral-100 transition-colors"
                        aria-label="Fermer"
                    >
                        <Image src="/icons/croix.svg" alt="" width={15} height={15} />
                    </button>
                </div>

                {/* Contenu (formulaire avec son propre titre) */}
                <div className="px-[38.67px] pb-[37px]">{children}</div>
            </div>
        </div>
    );
}

export { Modal };
export type { ModalProps };
