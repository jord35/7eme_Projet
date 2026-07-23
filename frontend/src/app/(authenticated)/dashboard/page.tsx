"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { PageLoader } from "@/components/ui/PageLoader";
import { Modal } from "@/components/ui/Modal";
import { TaskListView } from "@/components/features/TaskListView";
import { TaskKanbanView } from "@/components/features/TaskKanbanView";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { getAssignedTasks } from "@/lib/api";
import { filterBySearchQuery } from "@/lib/mappers";
import { useApi } from "@/lib/hooks/useApi";
import type { Project } from "@/lib/api";

type ViewMode = "list" | "kanban";

const dashboardTabs = [
    { key: "list", label: "Liste", icon: "/icons/plus.svg" },
    { key: "kanban", label: "Kanban", icon: "/icons/calendar.svg" },
];

export default function DashboardPage() {
    const { user } = useAuth();
    const [viewMode, setViewMode] = useState<ViewMode>("list");
    const { data: tasks, isLoading } = useApi(getAssignedTasks);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreateProject, setShowCreateProject] = useState(false);

    const PRIORITY_ORDER: Record<string, number> = {
        URGENT: 0,
        HIGH: 1,
        MEDIUM: 2,
        LOW: 3,
    };

    const filteredTasks = useMemo(() => {
        const filtered = filterBySearchQuery(tasks ?? [], searchQuery);
        return [...filtered].sort((a, b) => {
            const pa = PRIORITY_ORDER[a.priority] ?? 99;
            const pb = PRIORITY_ORDER[b.priority] ?? 99;
            if (pa !== pb) return pa - pb;
            // À priorité égale, tri par date d'échéance
            if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
            if (a.dueDate) return -1;
            if (b.dueDate) return 1;
            return 0;
        });
    }, [tasks, searchQuery]);

    function handleProjectCreated(_project: Project) {
        setShowCreateProject(false);
    }

    if (isLoading) return <PageLoader />;

    return (
        <div>
            <PageHeader
                title="Tableau de bord"
                description={`Bonjour, ${user?.name || ""}, voici un aperçu de vos projets et tâches.`}
                action={{
                    label: "+ Créer un projet",
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
                    tasks={filteredTasks}
                    searchQuery={searchQuery}
                    onSearch={setSearchQuery}
                />
            )}

            {viewMode === "kanban" && (
                <TaskKanbanView tasks={filteredTasks} />
            )}

            <Modal
                isOpen={showCreateProject}
                onClose={() => setShowCreateProject(false)}
                title="Créer un projet"
            >
                <ProjectForm mode="create" onSuccess={handleProjectCreated} />
            </Modal>
        </div>
    );
}
