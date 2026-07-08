"use client";

import Link from "next/link";

interface ProjectCardProps {
    project: {
        id: string;
        name: string;
        description: string;
        _count: { tasks: number };
        owner: { id: string; name: string };
        members: Array<{
            user: { id: string; name: string };
        }>;
        userRole?: "ADMIN" | "CONTRIBUTOR";
    };
    completedTasks?: number;
}

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

function ProjectCard({ project, completedTasks = 0 }: ProjectCardProps) {
    const totalTasks = project._count.tasks;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const allMembers = [
        { id: project.owner.id, name: project.owner.name, isOwner: true },
        ...project.members.map((m) => ({
            id: m.user.id,
            name: m.user.name,
            isOwner: false,
        })),
    ];

    const visibleMembers = allMembers.slice(0, 4);
    const hiddenCount = allMembers.length - 4;

    return (
        <Link
            href={`/projects/${project.id}`}
            className="block rounded-lg bg-neutral-white p-6 shadow-sm ring-1 ring-neutral-200 hover:ring-brand-orange-main transition-all"
        >
            <h2 className="text-h5 font-heading text-neutral-950">{project.name}</h2>
            <p className="mt-2 line-clamp-2 text-body-s text-neutral-600">
                {project.description}
            </p>

            {/* Barre de progression */}
            <div className="mt-4">
                <div className="flex items-center justify-between text-body-xs">
                    <span className="text-neutral-600">Progression</span>
                    <span className="font-medium text-neutral-950">{progress}%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-neutral-100">
                    <div
                        className="h-2 rounded-full bg-brand-orange-main transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="mt-1 text-body-xs text-neutral-400">
                    {completedTasks}/{totalTasks} tâches
                </p>
            </div>

            {/* Équipe */}
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <span className="text-body-xs text-neutral-400">
                        Équipe ({allMembers.length})
                    </span>
                </div>
                <div className="flex items-center -space-x-2">
                    {visibleMembers.map((member) => (
                        <span
                            key={member.id}
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-body-2xs font-medium ring-2 ring-neutral-white ${member.isOwner
                                    ? "bg-brand-orange-main text-neutral-white"
                                    : "bg-neutral-200 text-neutral-600"
                                }`}
                            title={`${member.name}${member.isOwner ? " (Propriétaire)" : ""}`}
                        >
                            {getInitials(member.name)}
                        </span>
                    ))}
                    {hiddenCount > 0 && (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-body-2xs font-medium text-neutral-400 ring-2 ring-neutral-white">
                            +{hiddenCount}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export { ProjectCard };
export type { ProjectCardProps };
