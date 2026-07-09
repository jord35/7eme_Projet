"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { PageLoader } from "@/components/ui/PageLoader";
import { Modal } from "@/components/ui/Modal";
import { TaskListView } from "@/components/features/TaskListView";
import { TaskKanbanView } from "@/components/features/TaskKanbanView";
import { CreateProjectForm } from "@/components/forms/CreateProjectForm";
import { getAssignedTasks } from "@/lib/api";
import type { AssignedTask, Project } from "@/lib/api";

type ViewMode = "list" | "kanban";

const dashboardTabs = [
    { key: "list", label: "Liste" },
    { key: "kanban", label: "Kanban" },
];

export default function DashboardPage() {
    const { user } = useAuth();
    const [viewMode, setViewMode] = useState<ViewMode>("list");
    const [tasks, setTasks] = useState<AssignedTask[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreateProject, setShowCreateProject] = useState(false);

    useEffect(() => {
        getAssignedTasks()
            .then(setTasks)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    const sortedTasks = useMemo(() => {
        let filtered = [...tasks];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (t) =>
                    t.title.toLowerCase().includes(q) ||
                    (t.description || "").toLowerCase().includes(q)
            );
        }

        const priorityOrder = { URGENT: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
        return filtered.sort(
            (a, b) =>
                (priorityOrder[a.priority] ?? 4) -
                (priorityOrder[b.priority] ?? 4)
        );
    }, [tasks, searchQuery]);

    function handleProjectCreated(_project: Project) {
        setShowCreateProject(false);
    }

    if (isLoading) return <PageLoader />;

    return (
        <div>
            <PageHeader
                title={`Bonjour, ${user?.name?.split(" ")[0] || ""} 👋`}
                description="Voici un aperçu de votre activité."
                action={{
                    label: "Créer un projet",
                    onClick: () => setShowCreateProject(true),
                }}
            />

            <Tabs
                tabs={dashboardTabs}
                activeTab={viewMode}
                onChange={(key) => setViewMode(key as ViewMode)}
            />

            {viewMode === "list" && (
                <TaskListView
                    tasks={sortedTasks}
                    searchQuery={searchQuery}
                    onSearch={setSearchQuery}
                />
            )}

            {viewMode === "kanban" && (
                <TaskKanbanView tasks={sortedTasks} />
            )}

            <Modal
                isOpen={showCreateProject}
                onClose={() => setShowCreateProject(false)}
                title="Créer un projet"
            >
                <CreateProjectForm onSuccess={handleProjectCreated} />
            </Modal>
        </div>
    );
}
