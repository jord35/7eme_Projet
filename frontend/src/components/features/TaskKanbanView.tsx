"use client";

import { TaskCard } from "@/components/features/TaskCard";
import { BadgeCount } from "@/components/ui/BadgeCount";
import type { AssignedTask } from "@/lib/api";

interface TaskKanbanViewProps {
    tasks: AssignedTask[];
}

const kanbanColumns = [
    { key: "TODO" as const, label: "À faire" },
    { key: "IN_PROGRESS" as const, label: "En cours" },
    { key: "DONE" as const, label: "Terminé" },
];

function TaskKanbanView({ tasks }: TaskKanbanViewProps) {
    return (
        <div className="mx-4 mb-[107.85px] grid grid-cols-1 gap-6 sm:mx-6 lg:mx-[69px] lg:grid-cols-3">
            {kanbanColumns.map((col) => {
                const columnTasks = tasks.filter(
                    (t) => t.status === col.key,
                );
                return (
                    <div className="rounded-lg bg-neutral-white px-[24px] py-[40px] shadow-sm ring-1 ring-neutral-200">
                        <div className="mb-[22px] flex items-center gap-2">
                            <h3 className="text-h5 font-heading text-neutral-800">
                                {col.label}
                            </h3>
                            <BadgeCount count={columnTasks.length} />
                        </div>
                        <div className="space-y-[16px]">
                            {columnTasks.length === 0 ? (
                                <p className="text-body-xs text-neutral-400">
                                    Aucune tâche
                                </p>
                            ) : (
                                columnTasks.map((task) => (
                                    <TaskCard key={task.id} task={task} showProject variant="kanban" />
                                ))
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export { TaskKanbanView };
export type { TaskKanbanViewProps };
