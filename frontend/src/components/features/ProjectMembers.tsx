"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { getRoleLabel, formatMemberLabel } from "@/lib/mappers";
import { Avatar } from "@/components/ui/Avatar";

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

    return (
        <div>
            {label && (
                <div className="flex items-center gap-1 mb-2">
                    <Image src="/icons/team.svg" alt="" width={12} height={12} />
                    <span className="text-body-xs text-neutral-400">
                        {formatMemberLabel(label, count)}
                    </span>
                </div>
            )}

            <div className="flex items-center gap-[4px]">
                {/* Propriétaire */}
                <Avatar
                    name={owner.name}
                    isCurrentUser={owner.id === currentUserId}
                    size={27}
                />

                {/* Badge du rôle de l'utilisateur connecté */}
                {showRoleBadge && currentUserRole && (
                    <span className="rounded-full bg-brand-orange-light px-4 py-1 text-body-s text-brand-orange-dark">
                        {currentUserRole}
                    </span>
                )}

                {/* Contributeurs (chevauchés) */}
                <div className="flex items-center">
                    {visibleMembers.slice(1).map((member) => (
                        <div key={member.id} className="-ml-3 first:-ml-0">
                            <Avatar
                                name={member.name}
                                isCurrentUser={member.isCurrentUser}
                                size={27}
                            />
                        </div>
                    ))}
                    {hiddenCount > 0 && (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-body-2xs font-medium text-neutral-400 -ml-3">
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
