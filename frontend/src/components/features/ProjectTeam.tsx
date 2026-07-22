"use client";

import { useAuth } from "@/context/AuthContext";
import { Avatar } from "@/components/ui/Avatar";

interface ProjectTeamProps {
    owner: { id: string; name: string };
    members: Array<{
        user: { id: string; name: string };
        role?: string;
    }>;
}

/**
 * Affiche l'équipe d'un projet dans la page détail.
 *
 * Structure :
 *   div (fond gris)
 *     div (flex)
 *       p "Contributeurs X personnes"
 *       div (flex)
 *         <Avatar regle_prenom_nom> propriétaire </Avatar>
 *         <tag> rôle </tag>
 *         boucle contributeurs
 *           <Avatar regle_prenom_nom> contributeur </Avatar>
 *
 * Règle prenom_nom : si l'avatar est l'utilisateur courant,
 * on n'affiche pas le nom à côté.
 */
function ProjectTeam({ owner, members }: ProjectTeamProps) {
    const { user } = useAuth();
    const currentUserId = user?.id;

    const isCurrentUserOwner = owner.id === currentUserId;
    const userRole = isCurrentUserOwner ? "Propriétaire" : "Contributeur";

    return (
        <div className="w-full rounded-lg bg-neutral-100 px-12 py-5">
            <div className="flex items-center justify-between">
                <div className="whitespace-nowrap">
                    <span className="text-h5 font-heading text-neutral-800">Contributeurs</span>
                    <span className="text-body-m text-neutral-600"> {members.length} personnes</span>
                </div>
                <div className="flex items-center gap-2">
                    {/* Avatar propriétaire + tag */}
                    <div className="flex items-center gap-1">
                        <Avatar
                            name={owner.name}
                            isCurrentUser={isCurrentUserOwner}
                            size={27}
                        />
                        {!isCurrentUserOwner && (
                            <span className="rounded-full bg-neutral-200 px-3 py-1 text-body-xs text-neutral-600">
                                {owner.name}
                            </span>
                        )}
                    </div>
                    <span className="rounded-full bg-brand-orange-light px-4 py-1 text-body-s text-brand-orange-dark">
                        {userRole}
                    </span>

                    {/* Avatars contributeurs */}
                    {members.map((m) => (
                        <div key={m.user.id} className="flex items-center gap-1">
                            <Avatar
                                name={m.user.name}
                                isCurrentUser={m.user.id === currentUserId}
                                size={27}
                            />
                            {m.user.id !== currentUserId && (
                                <span className="rounded-full bg-neutral-200 px-3 py-1 text-body-xs text-neutral-600">
                                    {m.user.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { ProjectTeam };
export type { ProjectTeamProps };
