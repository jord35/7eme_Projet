"use client";

interface DeleteProjectModalProps {
    onConfirm: () => void;
    onCancel: () => void;
    isDeleting: boolean;
}

function DeleteProjectModal({
    onConfirm,
    onCancel,
    isDeleting,
}: DeleteProjectModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
        >
            <div className="mx-4 w-full max-w-md rounded-lg bg-neutral-white p-6 shadow-xl">
                <h2
                    id="delete-title"
                    className="text-h5 font-heading text-neutral-950"
                >
                    Supprimer le projet
                </h2>
                <p className="mt-2 text-body-s text-neutral-600">
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
            </div>
        </div>
    );
}

export { DeleteProjectModal };
export type { DeleteProjectModalProps };
