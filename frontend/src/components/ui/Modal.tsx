"use client";

import { useEffect, useCallback, useRef, type ReactNode } from "react";
import Image from "next/image";

interface ModalProps {
    /** Contrôle l'ouverture de la modale */
    isOpen: boolean;
    /** Callback appelé quand l'utilisateur ferme (Escape ou clic overlay) */
    onClose: () => void;
    /** Contenu de la modale */
    children: ReactNode;
}

/** Sélecteur pour tous les éléments focusables (liens, boutons, inputs, etc.) */
const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Modale réutilisable avec focus trap.
 * Gère : overlay cliquable, fermeture avec Escape, blocage du scroll,
 * piège le focus dans la modale (Tab/Shift+Tab), restaure le focus à la fermeture,
 * accessibilité (role="dialog", aria-modal, aria-labelledby).
 *
 * @example
 * <Modal isOpen={show} onClose={() => setShow(false)} title="Créer un projet">
 *   <CreateProjectForm onSuccess={handleSuccess} />
 * </Modal>
 */
function Modal({ isOpen, onClose, children }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    /** Retourne tous les éléments focusables dans la modale */
    const getFocusableElements = useCallback((): HTMLElement[] => {
        if (!modalRef.current) return [];
        return Array.from(
            modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        );
    }, []);

    /** Piège le focus : Tab → suivant, Shift+Tab → précédent */
    const trapFocus = useCallback(
        (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            const focusable = getFocusableElements();
            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
                // Shift+Tab : si on est sur le premier, on va au dernier
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                // Tab : si on est sur le dernier, on va au premier
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        },
        [getFocusableElements],
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
                return;
            }
            trapFocus(e);
        },
        [onClose, trapFocus],
    );

    useEffect(() => {
        if (isOpen) {
            // Sauvegarder l'élément qui a le focus avant ouverture
            previousFocusRef.current = document.activeElement as HTMLElement;

            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";

            // Focus le premier élément focusable dans la modale après le rendu
            requestAnimationFrame(() => {
                const focusable = getFocusableElements();
                if (focusable.length > 0) {
                    focusable[0].focus();
                }
            });
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";

            // Restaurer le focus à l'élément précédent
            if (previousFocusRef.current) {
                previousFocusRef.current.focus();
                previousFocusRef.current = null;
            }
        };
    }, [isOpen, handleKeyDown, getFocusableElements]);

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
                ref={modalRef}
                className="relative z-10 mx-4 w-full max-w-[598px] rounded-lg bg-neutral-white shadow-xl ring-1 ring-neutral-200 max-[425px]:mx-0"
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
