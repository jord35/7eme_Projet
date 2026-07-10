"use client";

import { useAuth } from "@/context/AuthContext";

interface ProjectMembersProps {
    owner: { id: string; name: string };
    members: Array<{
        user: { id: string; name: string };
        role?: string;
    }>;
    /** Libellé du groupe : "Équipe" → "Équipe (3)", "Contributeurs" → "Contributeurs 3 personnes" */
    label?: string;
    /** Afficher les noms à côté des avatars ? (true dans détail projet, false dans carte) */
    showNames?: boolean;
    /** Afficher le badge du rôle de l'utilisateur connecté ? */
    showRoleBadge?: boolean;
}

/** Extrait les initiales d'un nom (ex: "Jean Dupont" → "JD") */
function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

/** Détermine le libellé du rôle */
function getRoleLabel(
    userId: string,
    ownerId: string,
    role: string | undefined
): string {
    if (userId === ownerId) return "Propriétaire";
    if (role === "ADMIN") return "Admin";
    return "Contributeur";
}

/**
 * Affiche l'équipe d'un projet : propriétaire à gauche, membres à droite.
 * L'utilisateur connecté est mis en surbrillance (fond #FFE8D9).
 * Utilisé dans ProjectCard (liste projets) et la page détail projet.
 */
function ProjectMembers({
    owner,
    members,
    label,
    showNames = false,
    showRoleBadge = true,
}: ProjectMembersProps) {
    const { user } = useAuth();
    const currentUserId = user?.id;

    const allMembers = [
        {
            id: owner.id,
            name: owner.name,
            isOwner: true,
            isCurrentUser: owner.id === currentUserId,
            role: undefined,
        },
        ...members.map((m) => ({
            id: m.user.id,
            name: m.user.name,
            isOwner: false,
            isCurrentUser: m.user.id === currentUserId,
            role: m.role,
        })),
    ];

    const visibleMembers = allMembers.slice(0, 5);
    const hiddenCount = allMembers.length - 5;

    const currentUser = allMembers.find((m) => m.isCurrentUser);
    const currentUserRole = currentUser
        ? getRoleLabel(currentUser.id, owner.id, currentUser.role)
        : null;

    const count = allMembers.length;

    /** Formate le label selon le type */
    function formatLabel(): string {
        if (!label) return "";
        if (label === "Contributeurs") {
            return `Contributeurs ${count} personne${count > 1 ? "s" : ""}`;
        }
        return `${label} (${count})`;
    }

    return (
        <div>
            {label && (
                <span className="text-body-xs text-neutral-400">
                    {formatLabel()}
                </span>
            )}

            <div className="mt-2 flex items-center justify-between">
                {/* Propriétaire à gauche */}
                <div className="flex items-center gap-2">
                    <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-body-2xs font-medium ring-2 ring-neutral-white ${owner.id === currentUserId
                            ? "bg-[#FFE8D9] text-brand-orange-dark ring-brand-orange-main"
                            : "bg-neutral-200 text-neutral-600"
                            }`}
                        title={owner.name}
                    >
                        {getInitials(owner.name)}
                    </span>
                    {showNames && (
                        <span className="text-body-xs text-neutral-600">
                            {owner.name}
                        </span>
                    )}
                </div>

                {/* Badge du rôle de l'utilisateur connecté */}
                {showRoleBadge && currentUserRole && (
                    <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-body-2xs font-medium text-neutral-600">
                        {currentUserRole}
                    </span>
                )}

                {/* Membres à droite */}
                <div className="flex items-center -space-x-2">
                    {visibleMembers.slice(1).map((member) => (
                        <span
                            key={member.id}
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-body-2xs font-medium ring-2 ring-neutral-white ${member.isCurrentUser
                                ? "bg-[#FFE8D9] text-brand-orange-dark ring-brand-orange-main"
                                : "bg-neutral-200 text-neutral-600"
                                }`}
                            title={member.name}
                        >
                            {getInitials(member.name)}
                        </span>
                    ))}
                    {hiddenCount > 0 && (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-body-2xs font-medium text-neutral-400 ring-2 ring-neutral-white">
                            +{hiddenCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export { ProjectMembers };
export type { ProjectMembersProps };
