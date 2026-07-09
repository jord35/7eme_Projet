"use client";

import { useState } from "react";

interface EditTaskFormProps {
    initialTitle: string;
    initialDueDate: string;
    initialStatus: string;
    onSave: (data: {
        title: string;
        dueDate?: string;
        status: string;
    }) => Promise<void>;
    onCancel: () => void;
}

function EditTaskForm({
    initialTitle,
    initialDueDate,
    initialStatus,
    onSave,
    onCancel,
}: EditTaskFormProps) {
    const [title, setTitle] = useState(initialTitle);
    const [dueDate, setDueDate] = useState(initialDueDate);
    const [status, setStatus] = useState(initialStatus);
    const [isSaving, setIsSaving] = useState(false);

    async function handleSave() {
        if (!title.trim()) return;
        setIsSaving(true);
        try {
            await onSave({
                title: title.trim(),
                dueDate: dueDate || undefined,
                status,
            });
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="rounded-md bg-neutral-50 px-4 py-3">
            <div className="space-y-2">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full rounded-md border border-neutral-200 px-3 py-2 text-body-s shadow-sm focus:border-brand-orange-main focus:outline-none focus:ring-1 focus:ring-brand-orange-main"
                />
                <div className="grid grid-cols-3 gap-2">
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="block w-full rounded-md border border-neutral-200 px-2 py-1.5 text-body-xs shadow-sm focus:border-brand-orange-main focus:outline-none focus:ring-1 focus:ring-brand-orange-main"
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="block w-full rounded-md border border-neutral-200 px-2 py-1.5 text-body-xs shadow-sm focus:border-brand-orange-main focus:outline-none focus:ring-1 focus:ring-brand-orange-main"
                    >
                        <option value="TODO">À faire</option>
                        <option value="IN_PROGRESS">En cours</option>
                        <option value="DONE">Terminée</option>
                    </select>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="rounded-md bg-brand-orange-main px-3 py-1 text-body-xs font-medium text-neutral-white hover:bg-brand-orange-dark disabled:opacity-50"
                    >
                        {isSaving ? "..." : "Enregistrer"}
                    </button>
                    <button
                        onClick={onCancel}
                        className="rounded-md bg-neutral-white px-3 py-1 text-body-xs font-medium text-neutral-600 ring-1 ring-neutral-200 hover:bg-neutral-50"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}

export { EditTaskForm };
export type { EditTaskFormProps };
