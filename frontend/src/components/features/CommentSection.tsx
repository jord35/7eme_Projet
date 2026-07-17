"use client";

import { useState } from "react";
import type { Comment } from "@/lib/api";
import { getComments, createComment } from "@/lib/api";
import { formatDate } from "@/lib/mappers";
import { useApi } from "@/lib/hooks/useApi";

interface CommentSectionProps {
    projectId: string;
    taskId: string;
}

/**
 * Section commentaires d'une tâche.
 * Affiche la liste des commentaires (auteur, date, contenu)
 * et un formulaire pour en ajouter.
 * Les commentaires sont définitifs (pas de modification ni suppression).
 */
function CommentSection({ projectId, taskId }: CommentSectionProps) {
    const { data: apiComments, isLoading } = useApi(
        () => getComments(projectId, taskId),
        [projectId, taskId],
    );
    const [localComments, setLocalComments] = useState<Comment[]>([]);
    const [newContent, setNewContent] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    // Fusionne les commentaires de l'API avec les ajouts locaux (optimiste)
    const comments = [...(apiComments ?? []), ...localComments];

    /** Ajoute un nouveau commentaire */
    async function handleAdd() {
        if (!newContent.trim()) return;
        setIsAdding(true);
        try {
            const comment = await createComment(
                projectId,
                taskId,
                newContent.trim()
            );
            setLocalComments((prev) => [...prev, comment]);
            setNewContent("");
        } catch (err) {
            console.error("Erreur ajout commentaire:", err);
        } finally {
            setIsAdding(false);
        }
    }

    return (
        <div className="mt-3 border-t border-neutral-200 pt-3">
            <h4 className="mb-2 text-body-xs font-semibold text-neutral-600">
                Commentaires ({comments.length})
            </h4>

            {isLoading ? (
                <p className="text-body-xs text-neutral-400">Chargement...</p>
            ) : comments.length === 0 ? (
                <p className="text-body-xs text-neutral-400">
                    Aucun commentaire. Soyez le premier à commenter !
                </p>
            ) : (
                <div className="space-y-2">
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="rounded-md bg-neutral-white px-3 py-2 text-body-s"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-body-xs font-medium text-neutral-950">
                                    {comment.author.name}
                                </span>
                                <span className="text-body-xs text-neutral-400">
                                    {formatDate(comment.createdAt, { withTime: true })}
                                </span>
                            </div>
                            <p className="mt-1 text-body-xs text-neutral-600">
                                {comment.content}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Formulaire d'ajout */}
            <div className="mt-3">
                <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows={2}
                    placeholder="Ajouter un commentaire..."
                    className="block w-full rounded-md border border-neutral-200 px-3 py-2 text-body-xs shadow-sm placeholder:text-neutral-400 focus:border-brand-orange-main focus:outline-none focus:ring-1 focus:ring-brand-orange-main"
                />
                <button
                    onClick={handleAdd}
                    disabled={isAdding || !newContent.trim()}
                    className="mt-2 rounded-md bg-brand-orange-main px-3 py-1.5 text-body-xs font-medium text-neutral-white shadow-sm hover:bg-brand-orange-dark disabled:opacity-50"
                >
                    {isAdding ? "Envoi..." : "Commenter"}
                </button>
            </div>
        </div>
    );
}

export { CommentSection };
export type { CommentSectionProps };
