"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface TaskSearchProps {
    /** Appelé quand la recherche ou le filtre change */
    onSearch: (query: string, status: string) => void;
    /** Placeholder pour le champ de recherche */
    placeholder?: string;
    /** Afficher le filtre par statut ? (dashboard = non, projet = oui) */
    showStatusFilter?: boolean;
}

const statusOptions = [
    { value: "", label: "Tous les statuts" },
    { value: "TODO", label: "À faire" },
    { value: "IN_PROGRESS", label: "En cours" },
    { value: "DONE", label: "Terminé" },
];

function TaskSearch({
    onSearch,
    placeholder = "Rechercher une tâche...",
    showStatusFilter = true,
}: TaskSearchProps) {
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Déclenche la recherche avec debounce
    const triggerSearch = useCallback(
        (q: string, s: string) => {
            if (debounceRef.current) clearTimeout(debounceRef.current);

            if (q.length >= 3 || q.length === 0) {
                debounceRef.current = setTimeout(() => {
                    onSearch(q, s);
                }, 300);
            }
        },
        [onSearch]
    );

    // Sur changement du champ texte
    function handleQueryChange(value: string) {
        setQuery(value);
        triggerSearch(value, status);
    }

    // Sur changement du filtre statut
    function handleStatusChange(value: string) {
        setStatus(value);
        onSearch(query, value);
    }

    // Sur appui sur "Entrée"
    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            onSearch(query, status);
        }
    }

    // Nettoyage du debounce au démontage
    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    return (
        <div className="flex flex-wrap gap-3">
            {showStatusFilter && (
                <select
                    value={status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="rounded-md border border-neutral-200 px-3 py-1.5 text-body-s text-neutral-600 focus:border-brand-orange-main focus:outline-none focus:ring-1 focus:ring-brand-orange-main"
                >
                    {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            )}
            <div className="relative" style={{ width: 357, height: 63 }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="h-full w-full rounded-md border border-neutral-200 px-8 text-body-s text-neutral-950 placeholder:text-neutral-600 focus:border-brand-orange-main focus:outline-none focus:ring-1 focus:ring-brand-orange-main"
                />
                <img
                    src="/icons/search.svg"
                    alt=""
                    className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 text-neutral-600"
                    style={{ width: 14, height: 14 }}
                />
            </div>
        </div>
    );
}

export { TaskSearch };
export type { TaskSearchProps };
