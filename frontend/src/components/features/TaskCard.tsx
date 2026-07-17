"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import { getStatusLabel, getStatusVariant, formatShortDate, getCommentCount } from "@/lib/mappers";

/**
 * Props de la carte tâche (utilisée dans le dashboard).
 */
interface TaskCardProps {
    task: {
        id: string;
        title: string;
        description: string | null;
        status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
        priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
        dueDate: string | null;
        projectId: string;
        creatorId: string;
        createdAt: string;
        project?: { id: string; name: string };
        _count?: { comments: number };
        comments?: Array<unknown>;
    };
    /** Afficher le nom du projet ? (true dans le dashboard, false ailleurs) */
    showProject?: boolean;
}

/**
 * Carte de tâche compacte pour le dashboard (Liste et Kanban).
 * Affiche : titre, description, badge statut, projet, date, commentaires.
 * Ne montre PAS les assignés (réservé à TaskDetailCard).
 */
function TaskCard({ task, showProject = false }: TaskCardProps) {
    const projectId = task.project?.id;
    const commentCount = getCommentCount(task);

    return (
        <div className="rounded-lg bg-neutral-white p-4 shadow-sm ring-1 ring-neutral-200">
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                    <h3 className="text-body-m font-medium text-neutral-950 truncate">
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className="mt-1 text-body-s text-neutral-600 line-clamp-2">
                            {task.description}
                        </p>
                    )}
                </div>
                <Badge variant={getStatusVariant(task.status)}>
                    {getStatusLabel(task.status)}
                </Badge>
            </div>

            <div className="mt-3 flex items-center justify-between text-body-xs text-neutral-400">
                <div className="flex items-center gap-3">
                    {showProject && task.project && (
                        <span className="flex items-center gap-1">
                            <Image src="/icons/project.svg" alt="" width={12} height={12} />
                            {task.project.name}
                        </span>
                    )}
                    {task.dueDate && (
                        <span className="flex items-center gap-1">
                            <Image src="/icons/calendar.svg" alt="" width={12} height={12} />
                            {formatShortDate(task.dueDate)}
                        </span>
                    )}
                    {commentCount > 0 && (
                        <span className="flex items-center gap-1">
                            <Image src="/icons/comment.svg" alt="" width={12} height={12} />
                            {commentCount}
                        </span>
                    )}
                </div>

                {projectId && (
                    <Link
                        href={`/projects/${projectId}`}
                        className="flex items-center gap-1 font-medium text-brand-orange-main hover:text-brand-orange-dark transition-colors"
                    >
                        Voir
                    </Link>
                )}
            </div>
        </div>
    );
}

export { TaskCard };
export type { TaskCardProps };
