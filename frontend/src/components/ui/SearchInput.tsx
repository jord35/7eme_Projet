"use client";

interface SearchInputProps {
    /** Valeur actuelle du champ */
    value: string;
    /** Appelée à chaque changement de texte */
    onChange: (value: string) => void;
    /** Placeholder du champ */
    placeholder?: string;
    /** Appelée sur appui touche (Entrée, etc.) */
    onKeyDown?: (e: React.KeyboardEvent) => void;
    /** Classes CSS supplémentaires pour surcharger la largeur */
    className?: string;
    /** Classes CSS supplémentaires pour l'input */
    inputClassName?: string;
}

/**
 * Champ de recherche générique avec icône loupe.
 *
 * Utilisé dans :
 * - TaskListView (dashboard)
 * - TaskSearch (page projet, avec filtre statut)
 */
function SearchInput({
    value,
    onChange,
    placeholder = "Rechercher...",
    onKeyDown,
    className,
    inputClassName,
}: SearchInputProps) {
    return (
        <div className={className ?? "relative w-full md:w-[357px]"}>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                className={`w-full rounded-md border border-neutral-200 px-8 py-[21.5px] text-body-s text-neutral-950 placeholder:text-neutral-600 focus:border-brand-orange-main focus:outline-none focus:ring-1 focus:ring-brand-orange-main ${inputClassName ?? ""}`}
            />
            <img
                src="/icons/search.svg"
                alt=""
                className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 text-neutral-600"
                style={{ width: 14, height: 14 }}
            />
        </div>
    );
}

export { SearchInput };
export type { SearchInputProps };
