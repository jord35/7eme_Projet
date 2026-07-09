"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";

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

const statusLabels: Record<string, string> = {
    TODO: "À faire",
    IN_PROGRESS: "En cours",
    DONE: "Terminé",
    CANCELLED: "Annulé",
};

const statusVariants: Record<string, "info" | "warning" | "success" | "error"> = {
    TODO: "info",
    IN_PROGRESS: "warning",
    DONE: "success",
    CANCELLED: "error",
};

/**
 * Carte de tâche compacte pour le dashboard (Liste et Kanban).
 * Affiche : titre, description, badge statut, projet, date, commentaires.
 * Ne montre PAS les assignés (réservé à TaskDetailCard).
 */
function TaskCard({ task, showProject = false }: TaskCardProps) {
    const projectId = task.project?.id;

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
                <Badge variant={statusVariants[task.status] || "neutral"}>
                    {statusLabels[task.status] || task.status}
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
                            {new Date(task.dueDate).toLocaleDateString("fr-FR")}
                        </span>
                    )}
                    {(task as any).comments && (
                        <span className="flex items-center gap-1">
                            <Image src="/icons/comment.svg" alt="" width={12} height={12} />
                            {(task as any).comments.length}
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
