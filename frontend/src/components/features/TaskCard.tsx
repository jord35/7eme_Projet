"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { getStatusLabel, getStatusVariant } from "@/lib/mappers";
import { TaskMetadata } from "@/components/features/TaskMetadata";

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
    /** Variante d'affichage : "list" (bouton sur la même ligne) ou "kanban" (bouton en dessous) */
    variant?: "list" | "kanban";
}

/**
 * Carte de tâche compacte pour le dashboard (Liste et Kanban).
 * Affiche : titre, description, badge statut, projet, date, commentaires.
 * Ne montre PAS les assignés (réservé à TaskDetailCard).
 */
function TaskCard({ task, showProject = false, variant = "list" }: TaskCardProps) {
    const projectId = task.project?.id;

    return (
        <div className="rounded-lg bg-neutral-white p-4 shadow-sm ring-1 ring-neutral-200">
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-h3 font-heading text-neutral-950 truncate min-w-0 flex-1">
                    {task.title}
                </h3>
                <Badge variant={getStatusVariant(task.status)}>
                    {getStatusLabel(task.status)}
                </Badge>
            </div>

            {task.description && (
                <p className="mt-2 text-body-s text-neutral-600 line-clamp-2">
                    {task.description}
                </p>
            )}

            {variant === "list" ? (
                <div className="mt-3 flex items-center justify-between gap-3">
                    <TaskMetadata
                        project={showProject ? task.project : null}
                        dueDate={task.dueDate}
                        comments={task.comments}
                        _count={task._count}
                    />
                    {projectId && (
                        <Link
                            href={`/projects/${projectId}`}
                            className="inline-flex items-center gap-1 rounded-md bg-neutral-800 px-4 py-2 text-body-s font-medium text-neutral-white hover:bg-neutral-950 transition-colors"
                        >
                            Voir
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    <TaskMetadata
                        project={showProject ? task.project : null}
                        dueDate={task.dueDate}
                        comments={task.comments}
                        _count={task._count}
                    />
                    {projectId && (
                        <div className="mt-3">
                            <Link
                                href={`/projects/${projectId}`}
                                className="inline-flex items-center gap-1 rounded-md bg-neutral-800 px-4 py-2 text-body-s font-medium text-neutral-white hover:bg-neutral-950 transition-colors"
                            >
                                Voir
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export { TaskCard };
export type { TaskCardProps };
