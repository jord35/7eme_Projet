import Link from "next/link";
import { getInitials } from "@/lib/mappers";

interface AvatarProps {
    /** Nom de l'utilisateur (peut être null) */
    name: string | null | undefined;
    /** L'utilisateur courant ? (met en surbrillance orange) */
    isCurrentUser?: boolean;
    /** Taille du cercle en px (par défaut 32) */
    size?: number;
    /** Rendre le composant cliquable vers /profile ? */
    linkToProfile?: boolean;
    /** Classes supplémentaires (pour surcharger taille, etc.) */
    className?: string;
}

/**
 * Avatar circulaire avec les initiales de l'utilisateur.
 * Si le nom est null, affiche un point d'interrogation "?".
 * Utilisé dans la navigation et la liste des membres d'un projet.
 */
function Avatar({
    name,
    isCurrentUser = false,
    size = 32,
    linkToProfile = false,
    className = "",
}: AvatarProps) {
    const initials = name ? getInitials(name) : "?";
    const bgClass = isCurrentUser
        ? "bg-brand-orange-light text-neutral-950"
        : "bg-neutral-200 text-neutral-600";

    const content = (
        <span
            className={`flex items-center justify-center rounded-full text-body-2xs font-medium ${bgClass} ${className}`}
            style={{ width: size, height: size }}
            title={name ?? "Utilisateur"}
        >
            {initials}
        </span>
    );

    if (linkToProfile) {
        return <Link href="/profile">{content}</Link>;
    }

    return content;
}

export { Avatar };
export type { AvatarProps };
