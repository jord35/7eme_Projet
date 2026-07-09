"use client";

import Link from "next/link";
import { ProjectMembers } from "./ProjectMembers";

interface ProjectCardProps {
    project: {
        id: string;
        name: string;
        description: string;
        _count: { tasks: number };
        owner: { id: string; name: string };
        members: Array<{
            user: { id: string; name: string };
            role?: string;
        }>;
        userRole?: "ADMIN" | "CONTRIBUTOR";
    };
    completedTasks?: number;
}

function ProjectCard({ project, completedTasks = 0 }: ProjectCardProps) {
    const totalTasks = project._count.tasks;
    const progress =
        totalTasks > 0
            ? Math.round((completedTasks / totalTasks) * 100)
            : 0;

    return (
        <Link
            href={`/projects/${project.id}`}
            className="block rounded-lg bg-neutral-white p-6 shadow-sm ring-1 ring-neutral-200 hover:ring-brand-orange-main transition-all"
        >
            <h2 className="text-h5 font-heading text-neutral-950">
                {project.name}
            </h2>
            <p className="mt-2 line-clamp-2 text-body-s text-neutral-600">
                {project.description}
            </p>

            {/* Barre de progression */}
            <div className="mt-4">
                <div className="flex items-center justify-between text-body-xs">
                    <span className="text-neutral-600">Progression</span>
                    <span className="font-medium text-neutral-950">
                        {progress}%
                    </span>
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

            {/* Équipe (composant réutilisable, sans les noms) */}
            <div className="mt-4">
                <ProjectMembers
                    owner={project.owner}
                    members={project.members}
                    showNames={false}
                    showRoleBadge
                />
            </div>
        </Link>
    );
}

export { ProjectCard };
export type { ProjectCardProps };
