import Image from "next/image";
import { formatShortDate, getCommentCount } from "@/lib/mappers";

interface TaskMetadataProps {
    project?: { id: string; name: string } | null;
    dueDate: string | null;
    comments?: Array<unknown> | null;
    _count?: { comments: number } | null;
}

/**
 * Affiche les métadonnées d'une tâche : projet, date, commentaires.
 * Utilisé dans TaskCard et TaskDetailCard.
 */
function TaskMetadata({ project, dueDate, comments, _count }: TaskMetadataProps) {
    const commentCount = getCommentCount({ comments, _count } as any);

    return (
        <div className="flex flex-wrap items-center gap-3 text-body-xs text-neutral-600">
            {project && (
                <span className="flex items-center gap-1">
                    <Image src="/icons/project-gray.svg" alt="" width={15} height={15} />
                    {project.name}
                </span>
            )}
            {dueDate && (
                <span className="flex items-center gap-1">
                    <Image src="/icons/calendar-gray.svg" alt="" width={15} height={15} />
                    {formatShortDate(dueDate)}
                </span>
            )}
            {commentCount > 0 && (
                <span className="flex items-center gap-1">
                    <Image src="/icons/comment.svg" alt="" width={15} height={15} />
                    {commentCount}
                </span>
            )}
        </div>
    );
}

export { TaskMetadata };
export type { TaskMetadataProps };
