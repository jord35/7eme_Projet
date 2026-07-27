"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { SearchInput } from "@/components/ui/SearchInput";

interface TaskSearchProps {
    /** Appelé quand la recherche ou le filtre change */
    onSearch: (query: string, status: string) => void;
    /** Placeholder pour le champ de recherche */
    placeholder?: string;
    /** Afficher le filtre par statut ? (dashboard = non, projet = oui) */
    showStatusFilter?: boolean;
}

const statusOptions = [
    { value: "", label: "Statut" },
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
        <div className="flex flex-wrap items-center gap-3">
            {showStatusFilter && (
                <div className="relative">
                    <select
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="appearance-none rounded-md border border-neutral-200 bg-neutral-white text-body-s text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer h-16 min-w-[140px] pr-10 pl-8"
                    >
                        {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <img
                        src="/icons/arrow.svg"
                        alt=""
                        width={12}
                        height={8}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                    />
                </div>
            )}
            <SearchInput
                value={query}
                onChange={handleQueryChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
        </div>
    );
}

export { TaskSearch };
export type { TaskSearchProps };
