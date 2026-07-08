"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { PageHeader } from "@/components/layout/PageHeader";
import { TaskCard } from "@/components/features/TaskCard";
import { Spinner } from "@/components/ui/Spinner";
import { getAssignedTasks } from "@/lib/api";
import type { AssignedTask } from "@/lib/api";

type ViewMode = "list" | "kanban";

const kanbanColumns = [
    { key: "TODO" as const, label: "À faire" },
    { key: "IN_PROGRESS" as const, label: "En cours" },
    { key: "DONE" as const, label: "Terminé" },
];

export default function DashboardPage() {
    const { user } = useAuth();
    const [viewMode, setViewMode] = useState<ViewMode>("list");
    const [tasks, setTasks] = useState<AssignedTask[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAssignedTasks()
            .then(setTasks)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    const sortedTasks = [...tasks].sort((a, b) => {
        const priorityOrder = { URGENT: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
        return (
            (priorityOrder[a.priority] ?? 4) - (priorityOrder[b.priority] ?? 4)
        );
    });

    if (isLoading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div>
            <PageHeader
                title={`Bonjour, ${user?.name?.split(" ")[0] || ""} 👋`}
                description="Voici un aperçu de votre activité."
                action={{
                    label: "Créer un projet",
                    onClick: () => { },
                }}
            />

            {/* Navigation vues */}
            <div className="mb-6 flex gap-2 border-b border-neutral-200">
                {(["list", "kanban"] as ViewMode[]).map((mode) => (
                    <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`px-4 py-2 text-body-s font-medium transition-colors border-b-2 -mb-px ${viewMode === mode
                                ? "border-brand-orange-main text-brand-orange-main"
                                : "border-transparent text-neutral-400 hover:text-neutral-600"
                            }`}
                    >
                        {mode === "list" ? "Liste" : "Kanban"}
                    </button>
                ))}
            </div>

            {/* Vue Liste */}
            {viewMode === "list" && (
                <div>
                    {sortedTasks.length === 0 ? (
                        <p className="text-body-s text-neutral-400">
                            Aucune tâche assignée pour le moment.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {sortedTasks.map((task) => (
                                <TaskCard key={task.id} task={task} showProject />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Vue Kanban */}
            {viewMode === "kanban" && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {kanbanColumns.map((col) => {
                        const columnTasks = sortedTasks.filter(
                            (t) => t.status === col.key,
                        );
                        return (
                            <div key={col.key}>
                                <h3 className="mb-3 text-body-s font-medium text-neutral-600">
                                    {col.label} ({columnTasks.length})
                                </h3>
                                <div className="space-y-3">
                                    {columnTasks.length === 0 ? (
                                        <p className="text-body-xs text-neutral-400">
                                            Aucune tâche
                                        </p>
                                    ) : (
                                        columnTasks.map((task) => (
                                            <TaskCard key={task.id} task={task} showProject />
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
