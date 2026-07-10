"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CommentSection } from "@/components/features/CommentSection";
import Image from "next/image";

/**
 * Props de la carte tâche détaillée (utilisée dans la page détail projet).
 */
interface TaskDetailCardProps {
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
        _count?: { comments: number };
        assignees?: Array<{
            userId: string;
            user: { id: string; name: string; email: string };
        }>;
        comments?: Array<unknown>;
    };
    /** Callback pour éditer la tâche */
    onEdit?: (task: TaskDetailCardProps["task"]) => void;
    /** Callback pour supprimer la tâche */
    onDelete?: (task: TaskDetailCardProps["task"]) => void;
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

/** Extrait les initiales d'un nom (ex: "Jean Dupont" → "JD") */
function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

/**
 * Carte de tâche détaillée pour la page Single Project.
 * Affiche : titre, description, badge statut, date d'échéance,
 * liste des assignés (avatar + nom), et accordéon commentaires.
 */
function TaskDetailCard({ task, onEdit, onDelete }: TaskDetailCardProps) {
    const [expandedComments, setExpandedComments] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="rounded-lg bg-neutral-white p-4 shadow-sm ring-1 ring-neutral-200">
            {/* Titre + Badge statut + Menu "..." */}
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-body-m font-medium text-neutral-950">
                    {task.title}
                </h3>
                <div className="flex items-center gap-2">
                    <Badge variant={statusVariants[task.status] || "neutral"}>
                        {statusLabels[task.status] || task.status}
                    </Badge>

                    {/* Menu "..." */}
                    {(onEdit || onDelete) && (
                        <div className="relative">
                            <button
                                onClick={() => setShowMenu((prev) => !prev)}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
                                title="Actions"
                            >
                                ⋮
                            </button>
                            {showMenu && (
                                <div className="absolute right-0 top-full z-10 mt-1 w-36 rounded-md bg-neutral-white shadow-lg ring-1 ring-neutral-200">
                                    {onEdit && (
                                        <button
                                            onClick={() => {
                                                setShowMenu(false);
                                                onEdit(task);
                                            }}
                                            className="flex w-full items-center gap-2 px-3 py-2 text-body-xs text-neutral-700 hover:bg-neutral-50 transition-colors"
                                        >
                                            <Image src="/icons/edit.svg" alt="" width={12} height={12} />
                                            Modifier
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            onClick={() => {
                                                setShowMenu(false);
                                                onDelete(task);
                                            }}
                                            className="flex w-full items-center gap-2 px-3 py-2 text-body-xs text-error-main hover:bg-neutral-50 transition-colors"
                                        >
                                            <Image src="/icons/trash.svg" alt="" width={12} height={12} />
                                            Supprimer
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Description */}
            {task.description && (
                <p className="mt-2 text-body-s text-neutral-600">
                    {task.description}
                </p>
            )}

            {/* Date d'échéance */}
            {task.dueDate && (
                <div className="mt-3 flex items-center gap-1 text-body-xs text-neutral-400">
                    <Image src="/icons/calendar.svg" alt="" width={12} height={12} />
                    <span>Échéance : {new Date(task.dueDate).toLocaleDateString("fr-FR")}</span>
                </div>
            )}

            {/* Assignés — avec nom et prénom */}
            {task.assignees && task.assignees.length > 0 && (
                <div className="mt-3">
                    <span className="text-body-xs font-medium text-neutral-600">
                        Assigné à :
                    </span>
                    <div className="mt-1 space-y-1">
                        {task.assignees.map((a) => (
                            <div
                                key={a.userId}
                                className="flex items-center gap-2"
                            >
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange-light text-body-2xs font-medium text-brand-orange-dark">
                                    {getInitials(a.user.name)}
                                </span>
                                <span className="text-body-s text-neutral-700">
                                    {a.user.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Accordéon commentaires */}
            <div className="mt-3 border-t border-neutral-100 pt-2">
                <button
                    onClick={() => setExpandedComments((prev) => !prev)}
                    className="flex items-center gap-1 text-body-xs text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                    <Image src="/icons/comment.svg" alt="" width={12} height={12} />
                    Commentaires ({(task as any).comments?.length ?? task._count?.comments ?? 0})
                    <span className="ml-1">{expandedComments ? "▲" : "▼"}</span>
                </button>
                {expandedComments && (
                    <div className="mt-2">
                        <CommentSection
                            projectId={task.projectId}
                            taskId={task.id}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export { TaskDetailCard };
export type { TaskDetailCardProps };
