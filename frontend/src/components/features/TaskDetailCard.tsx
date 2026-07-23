"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { CommentSection } from "@/components/features/CommentSection";
import Image from "next/image";
import { getStatusLabel, getStatusVariant, formatShortDate, getCommentCount } from "@/lib/mappers";

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

/**
 * Carte de tâche détaillée pour la page Single Project.
 */
function TaskDetailCard({ task, onEdit, onDelete }: TaskDetailCardProps) {
    const { user } = useAuth();
    const currentUserId = user?.id;
    const [expandedComments, setExpandedComments] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const commentCount = getCommentCount(task);

    return (
        <div className="rounded-lg bg-neutral-white p-4 shadow-sm ring-1 ring-neutral-200">
            <div className="flex items-start justify-between gap-4">
                {/* Titre + Badge + Description */}
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-body-m font-medium text-neutral-950">
                            {task.title}
                        </h3>
                        <Badge variant={getStatusVariant(task.status)}>
                            {getStatusLabel(task.status)}
                        </Badge>
                    </div>

                    {/* Description */}
                    {task.description && (
                        <p className="mt-2 text-body-s text-neutral-600">
                            {task.description}
                        </p>
                    )}
                </div>

                {/* Menu "..." horizontal */}
                {(onEdit || onDelete) && (
                    <div className="relative shrink-0">
                        <button
                            onClick={() => setShowMenu((prev) => !prev)}
                            className="flex items-center justify-center rounded-md bg-neutral-white px-3 py-1.5 text-neutral-600 ring-1 ring-neutral-200 hover:bg-neutral-50 transition-colors"
                            title="Actions"
                        >
                            <span className="text-body-s leading-none">⋯</span>
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

            {/* Date d'échéance */}
            {task.dueDate && (
                <div className="mt-3 flex items-center gap-1 text-body-xs">
                    <span className="text-neutral-600">Échéance :</span>
                    <Image src="/icons/calendar-black.svg" alt="" width={12} height={12} />
                    <span className="text-neutral-800">{formatShortDate(task.dueDate)}</span>
                </div>
            )}

            {/* Assignés */}
            {task.assignees && task.assignees.length > 0 && (
                <div className="mt-3 flex items-center gap-2">
                    <span className="text-body-xs text-neutral-600 whitespace-nowrap">Assigné à :</span>
                    <div className="flex flex-wrap items-center gap-2">
                        {task.assignees.map((a) => (
                            <div key={a.userId} className="flex items-center gap-1">
                                <Avatar
                                    name={a.user.name}
                                    isCurrentUser={a.user.id === currentUserId}
                                    size={27}
                                />
                                {a.user.id !== currentUserId && (
                                    <span className="rounded-full bg-neutral-200 px-3 py-1 text-body-xs text-neutral-600">
                                        {a.user.name}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Accordéon commentaires */}
            <div className="mt-3 border-t border-neutral-100 pt-2">
                <button
                    onClick={() => setExpandedComments((prev) => !prev)}
                    className="flex w-full items-center justify-between text-body-s text-neutral-800 hover:text-neutral-950 transition-colors"
                >
                    <span>Commentaires ({commentCount})</span>
                    <Image
                        src="/icons/arrow.svg"
                        alt=""
                        width={12}
                        height={8}
                        className={`transition-transform duration-200 ${expandedComments ? "rotate-180" : ""}`}
                    />
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
