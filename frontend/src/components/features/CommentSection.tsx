"use client";

import { useState } from "react";
import type { Comment } from "@/lib/api";
import { getComments, createComment } from "@/lib/api";
import { formatDate } from "@/lib/mappers";
import { useApi } from "@/lib/hooks/useApi";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

interface CommentSectionProps {
    projectId: string;
    taskId: string;
}

/**
 * Section commentaires d'une tâche.
 * Affiche la liste des commentaires (avatar, auteur, date, contenu)
 * et un formulaire pour en ajouter.
 */
function CommentSection({ projectId, taskId }: CommentSectionProps) {
    const { user } = useAuth();
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
        <div>
            {isLoading ? (
                <p className="text-body-xs text-neutral-600">Chargement...</p>
            ) : comments.length === 0 ? (
                <p className="text-body-xs text-neutral-600">
                    Aucun commentaire. Soyez le premier à commenter !
                </p>
            ) : (
                <div className="space-y-3">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-2">
                            <Avatar
                                name={comment.author.name}
                                isCurrentUser={comment.author.id === user?.id}
                                size={27}
                            />
                            <div className="flex-1 rounded-[10px] bg-neutral-100 px-3 py-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-body-xs font-medium text-neutral-950">
                                        {comment.author.name}
                                    </span>
                                    <span className="text-body-xs text-neutral-600">
                                        {formatDate(comment.createdAt, { withTime: true })}
                                    </span>
                                </div>
                                <p className="mt-1 text-body-xs text-neutral-600">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Formulaire d'ajout */}
            <div className="mt-3 flex items-start gap-2">
                <Avatar
                    name={user?.name}
                    isCurrentUser={true}
                    size={27}
                />
                <div className="flex-1">
                    <div className="rounded-[10px] bg-neutral-50 px-3 py-2">
                        <input
                            type="text"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAdd();
                                }
                            }}
                            placeholder="Ajouter un commentaire"
                            className="w-full bg-transparent text-body-xs text-neutral-950 placeholder:text-neutral-600 focus:outline-none"
                        />
                    </div>
                    <div className="mt-2 flex justify-end max-md:justify-center">
                        <Button
                            onClick={handleAdd}
                            disabled={isAdding || !newContent.trim()}
                            isLoading={isAdding}
                            className="px-[79.5px] py-[15px] max-md:px-[40px] max-md:py-[8px]"
                        >
                            Envoyer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { CommentSection };
export type { CommentSectionProps };
