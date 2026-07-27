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
            {/* Sur mobile : badge centré, titre centré, description centrée */}
            <div className="flex flex-col items-center gap-1 md:items-stretch">
                <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
                    <Badge variant={getStatusVariant(task.status)} className="self-center">
                        {getStatusLabel(task.status)}
                    </Badge>
                    <h3 className="text-center text-h3 font-heading text-neutral-950 min-w-0 break-words md:mt-0 md:flex-1 md:text-left">
                        {task.title}
                    </h3>
                </div>
                {task.description && (
                    <p className="text-center text-body-s text-neutral-600 line-clamp-2 md:mt-2 md:text-left">
                        {task.description}
                    </p>
                )}
            </div>

            {variant === "list" ? (
                <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <TaskMetadata
                        project={showProject ? task.project : null}
                        dueDate={task.dueDate}
                        comments={task.comments}
                        _count={task._count}
                    />
                    {projectId && (
                        <Link
                            href={`/projects/${projectId}`}
                            className="flex w-full items-center justify-center gap-1 rounded-md bg-neutral-800 px-4 py-2 text-body-s font-medium text-neutral-white hover:bg-neutral-950 transition-colors md:w-auto md:inline-flex"
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
                        <div className="mt-3 flex w-full md:block md:w-auto">
                            <Link
                                href={`/projects/${projectId}`}
                                className="flex w-full items-center justify-center gap-1 rounded-md bg-neutral-800 px-4 py-2 text-body-s font-medium text-neutral-white hover:bg-neutral-950 transition-colors md:inline-flex md:w-auto"
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
