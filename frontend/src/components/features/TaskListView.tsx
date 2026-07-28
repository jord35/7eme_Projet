"use client";

import { useState } from "react";
import { TaskCard } from "@/components/features/TaskCard";
import { SearchInput } from "@/components/ui/SearchInput";
import type { AssignedTask } from "@/lib/api";

interface TaskListViewProps {
    tasks: AssignedTask[];
    searchQuery: string;
    onSearch: (query: string) => void;
}

function TaskListView({ tasks, searchQuery, onSearch }: TaskListViewProps) {
    const [localQuery, setLocalQuery] = useState(searchQuery);

    function handleSearch(value: string) {
        setLocalQuery(value);
        if (value.length >= 3 || value.length === 0) {
            onSearch(value);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") {
            onSearch(localQuery);
        }
    }

    return (
        <div className="mx-4 rounded-lg bg-neutral-white px-[59px] py-[40px] shadow-sm ring-1 ring-neutral-200 sm:mx-6 lg:mx-[125px]">
            {/* En-tête : titre + recherche */}
            <div className="mb-[52px] flex items-center justify-between gap-4">
                <div className="hidden md:block">
                    <h2 className="text-h5 font-heading text-neutral-950">Mes tâches assignées</h2>
                    <p className="mt-1 text-body-m text-neutral-400">Par ordre de priorité</p>
                </div>
                <div className="flex w-full justify-center md:w-auto">
                    <SearchInput
                        value={localQuery}
                        onChange={handleSearch}
                        onKeyDown={handleKeyDown}
                        placeholder="Rechercher une tâche"
                    />
                </div>
            </div>

            {/* Liste des tâches */}
            {tasks.length === 0 ? (
                <p className="mt-4 text-body-s text-neutral-400">
                    Aucune tâche assignée pour le moment.
                </p>
            ) : (
                <div className="space-y-[17px]">
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
