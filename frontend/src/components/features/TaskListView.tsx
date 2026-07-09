"use client";

import { TaskCard } from "@/components/features/TaskCard";
import { TaskSearch } from "@/components/features/TaskSearch";
import type { AssignedTask } from "@/lib/api";

interface TaskListViewProps {
    tasks: AssignedTask[];
    searchQuery: string;
    onSearch: (query: string) => void;
}

function TaskListView({ tasks, searchQuery, onSearch }: TaskListViewProps) {
    return (
        <div>
            <TaskSearch
                onSearch={(query) => onSearch(query)}
                placeholder="Rechercher une tâche par titre..."
                showStatusFilter={false}
            />

            {tasks.length === 0 ? (
                <p className="mt-4 text-body-s text-neutral-400">
                    Aucune tâche assignée pour le moment.
                </p>
            ) : (
                <div className="mt-3 space-y-3">
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} showProject />
                    ))}
                </div>
            )}
        </div>
    );
}

export { TaskListView };
export type { TaskListViewProps };
