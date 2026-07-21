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
        <div className="rounded-lg bg-neutral-white p-4 shadow-sm ring-1 ring-neutral-200">
            {/* En-tête : titre + recherche */}
            <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-h5 font-heading text-neutral-950">Mes tâches assignées</h2>
                    <p className="mt-1 text-body-s text-neutral-400">Par ordre de priorité</p>
                </div>
                <TaskSearch
                    onSearch={(query) => onSearch(query)}
                    placeholder="Rechercher une tâche"
                    showStatusFilter={false}
                />
            </div>

            {/* Liste des tâches */}
            {tasks.length === 0 ? (
                <p className="mt-4 text-body-s text-neutral-400">
                    Aucune tâche assignée pour le moment.
                </p>
            ) : (
                <div className="space-y-3">
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
