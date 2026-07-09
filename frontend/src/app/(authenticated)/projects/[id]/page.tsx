"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { PageHeader } from "@/components/layout/PageHeader";
import { TaskCard } from "@/components/features/TaskCard";
import { TaskSearch } from "@/components/features/TaskSearch";
import { ProjectMembers } from "@/components/features/ProjectMembers";
import { Spinner } from "@/components/ui/Spinner";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { CreateTaskForm } from "@/components/forms/CreateTaskForm";
import { EditProjectForm } from "@/components/forms/EditProjectForm";
import { getProject, getProjectTasks } from "@/lib/api";
import type { Project, Task } from "@/lib/api";

type ViewMode = "list" | "calendar";

export default function ProjectDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [showEditProject, setShowEditProject] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>("list");
    const [statusFilter, setStatusFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

    useEffect(() => {
        Promise.all([getProject(id), getProjectTasks(id)])
            .then(([projectData, tasksData]) => {
                setProject(projectData);
                setTasks(tasksData);
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [id]);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            if (statusFilter && task.status !== statusFilter) return false;
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                if (
                    !task.title.toLowerCase().includes(q) &&
                    !(task.description || "").toLowerCase().includes(q)
                )
                    return false;
            }
            return true;
        });
    }, [tasks, statusFilter, searchQuery]);

    const dueDates = useMemo(() => {
        return tasks
            .filter((t) => t.dueDate)
            .map((t) => new Date(t.dueDate!).toDateString());
    }, [tasks]);

    function handleTaskCreated(task: Task) {
        setTasks((prev) => [task, ...prev]);
        setShowCreateTask(false);
    }

    function handleProjectUpdated(updated: Project) {
        setProject(updated);
        setShowEditProject(false);
    }

    function toggleComments(taskId: string) {
        setExpandedComments((prev) => {
            const next = new Set(prev);
            if (next.has(taskId)) next.delete(taskId);
            else next.add(taskId);
            return next;
        });
    }

    if (isLoading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <p className="text-body-s text-neutral-400">Projet introuvable.</p>
            </div>
        );
    }

    const isAdmin = project.userRole === "ADMIN";

    return (
        <div>
            <PageHeader
                title={project.name}
                description={project.description || "Aucune description"}
                backLink="/projects"
                action={{
                    label: "Créer une tâche",
                    onClick: () => setShowCreateTask(true),
                }}
                showEditButton={isAdmin}
                showIAButton
                onEditClick={() => setShowEditProject(true)}
            />

            {/* Contributeurs (composant réutilisable, avec les noms) */}
            <div className="mb-6">
                <h2 className="text-body-s font-medium text-neutral-600">
                    Contributeurs ({project.members.length + 1})
                </h2>
                <div className="mt-2">
                    <ProjectMembers
                        owner={project.owner}
                        members={project.members}
                        showNames
                        showRoleBadge
                    />
                </div>
            </div>

            {/* Navigation vues */}
            <div className="mb-4 flex gap-2 border-b border-neutral-200">
                {(["list", "calendar"] as ViewMode[]).map((mode) => (
                    <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`px-4 py-2 text-body-s font-medium transition-colors border-b-2 -mb-px ${viewMode === mode
                            ? "border-brand-orange-main text-brand-orange-main"
                            : "border-transparent text-neutral-400 hover:text-neutral-600"
                            }`}
                    >
                        {mode === "list" ? "Liste" : "Calendrier"}
                    </button>
                ))}
            </div>

            {/* Filtres + recherche (composant réutilisable) */}
            <TaskSearch
                onSearch={(query, status) => {
                    setSearchQuery(query);
                    setStatusFilter(status);
                }}
                placeholder="Rechercher une tâche..."
                showStatusFilter
            />

            {/* Vue Liste */}
            {viewMode === "list" && (
                <div>
                    <h2 className="text-body-s font-medium text-neutral-600">
                        Tâches ({filteredTasks.length})
                    </h2>
                    {filteredTasks.length === 0 ? (
                        <p className="mt-2 text-body-s text-neutral-400">
                            Aucune tâche trouvée.
                        </p>
                    ) : (
                        <div className="mt-3 space-y-3">
                            {filteredTasks.map((task) => (
                                <div key={task.id}>
                                    <TaskCard task={task} />
                                    {/* Commentaires en accordéon */}
                                    <div className="mt-1">
                                        <button
                                            onClick={() => toggleComments(task.id)}
                                            className="text-body-xs text-neutral-400 hover:text-neutral-600 transition-colors"
                                        >
                                            Commentaires ({task._count?.comments || 0})
                                            {expandedComments.has(task.id) ? " ▲" : " ▼"}
                                        </button>
                                        {expandedComments.has(task.id) && (
                                            <div className="mt-2 rounded-md bg-neutral-50 p-3 text-body-s text-neutral-600">
                                                <p className="text-body-xs text-neutral-400 italic">
                                                    Les commentaires seront chargés ici.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Vue Calendrier */}
            {viewMode === "calendar" && (
                <div>
                    <Calendar
                        tileClassName={({ date }) => {
                            if (dueDates.includes(date.toDateString())) {
                                return "bg-brand-orange-light text-brand-orange-dark font-medium rounded-full";
                            }
                            return null;
                        }}
                        className="rounded-lg border border-neutral-200 bg-neutral-white p-4 shadow-sm"
                    />
                    <p className="mt-3 text-body-xs text-neutral-400">
                        Les jours en orange ont une échéance de tâche.
                    </p>
                </div>
            )}

            {/* Modale création tâche */}
            <Modal
                isOpen={showCreateTask}
                onClose={() => setShowCreateTask(false)}
                title="Créer une tâche"
            >
                <CreateTaskForm
                    projectId={id}
                    onSuccess={handleTaskCreated}
                />
            </Modal>

            {/* Modale modification projet */}
            <Modal
                isOpen={showEditProject}
                onClose={() => setShowEditProject(false)}
                title="Modifier le projet"
            >
                <EditProjectForm
                    project={project}
                    onSuccess={handleProjectUpdated}
                />
            </Modal>
        </div>
    );
}
