"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { PageLoader } from "@/components/ui/PageLoader";
import { TaskDetailCard } from "@/components/features/TaskDetailCard";
import { TaskSearch } from "@/components/features/TaskSearch";
import { ProjectTeam } from "@/components/features/ProjectTeam";
import { ConfirmDeleteModal } from "@/components/features/ConfirmDeleteModal";
import { Modal } from "@/components/ui/Modal";
import { TaskForm } from "@/components/forms/TaskForm";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { useAuth } from "@/context/AuthContext";
import {
    getProject,
    getProjectTasks,
    deleteProject,
    deleteTask,
} from "@/lib/api";
import { extractAssigneeIds, getProjectMemberIds, filterBySearchQuery } from "@/lib/mappers";
import type { Project, Task } from "@/lib/api";

type ViewMode = "list" | "calendar";

const projectTabs = [
    { key: "list", label: "Liste", icon: "/icons/plus.svg" },
    { key: "calendar", label: "Calendrier", icon: "/icons/calendar.svg" },
];

export default function ProjectDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { user } = useAuth();

    const [project, setProject] = useState<Project | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [showEditProject, setShowEditProject] = useState(false);
    const [showDeleteProject, setShowDeleteProject] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingTask, setDeletingTask] = useState<Task | null>(null);
    const [isDeletingTask, setIsDeletingTask] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>("list");
    const [statusFilter, setStatusFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    /** Filtre les assignés d'une tâche pour ne garder que les membres encore dans le projet */
    function filterValidAssignees(task: Task, memberIds: Set<string>): Task {
        if (!task.assignees) return task;
        return {
            ...task,
            assignees: task.assignees.filter((a) => memberIds.has(a.user.id)),
        };
    }

    useEffect(() => {
        Promise.all([getProject(id), getProjectTasks(id)])
            .then(([projectData, tasksData]) => {
                setProject(projectData);
                const memberIds = getProjectMemberIds(projectData);
                setTasks(tasksData.map((task) => filterValidAssignees(task, memberIds)));
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [id]);

    const filteredTasks = useMemo(() => {
        let result = tasks;
        if (statusFilter) {
            result = result.filter((task) => task.status === statusFilter);
        }
        return filterBySearchQuery(result, searchQuery);
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
        // Préserve le userRole existant car le PUT /projects/:id ne le renvoie pas
        // TODO back-end: ajouter userRole dans la réponse du PUT (comme le GET)
        setProject((prev) => ({
            ...updated,
            userRole: updated.userRole ?? prev?.userRole,
        }));
        setShowEditProject(false);
    }

    /** Recharge les tâches et le projet après un changement de membres */
    async function handleMembersChanged() {
        try {
            const [projectData, tasksData] = await Promise.all([
                getProject(id),
                getProjectTasks(id),
            ]);
            setProject(projectData);
            const memberIds = getProjectMemberIds(projectData);
            setTasks(tasksData.map((task) => filterValidAssignees(task, memberIds)));
        } catch (err) {
            console.error("Erreur rechargement après changement membres:", err);
        }
    }

    function handleTaskUpdated(task: Task) {
        setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
        setEditingTask(null);
    }

    async function handleDeleteTask() {
        if (!deletingTask) return;
        setIsDeletingTask(true);
        try {
            await deleteTask(id, deletingTask.id);
            toast.success("Tâche supprimée");
            setTasks((prev) => prev.filter((t) => t.id !== deletingTask.id));
            setDeletingTask(null);
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : "Erreur de suppression"
            );
        } finally {
            setIsDeletingTask(false);
        }
    }

    async function handleDeleteProject() {
        setIsDeleting(true);
        try {
            await deleteProject(id);
            toast.success("Projet supprimé");
            router.push("/projects");
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : "Erreur de suppression"
            );
        } finally {
            setIsDeleting(false);
            setShowDeleteProject(false);
        }
    }

    if (isLoading) return <PageLoader />;

    if (!project) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <p className="text-body-s text-neutral-400">Projet introuvable.</p>
            </div>
        );
    }

    const isAdmin = project.userRole === "ADMIN";
    const isOwner = user?.id === project.owner.id;

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

            {/* Équipe du projet */}
            <div className="mb-6">
                <ProjectTeam
                    owner={project.owner}
                    members={project.members}
                />
            </div>

            {/* Contenu principal (tâches) */}
            <div className="rounded-lg bg-neutral-white p-4 shadow-sm ring-1 ring-neutral-200">
                {/* En-tête : titre + recherche + tabs sur la même ligne */}
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-h5 font-heading text-neutral-950">Tâches</h2>
                        <p className="mt-1 text-body-s text-neutral-400">Par ordre de priorité</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Tabs
                            tabs={projectTabs}
                            activeTab={viewMode}
                            onChange={(key) => setViewMode(key as ViewMode)}
                        />
                        <TaskSearch
                            onSearch={(query, status) => {
                                setSearchQuery(query);
                                setStatusFilter(status);
                            }}
                            placeholder="Rechercher une tâche..."
                            showStatusFilter
                        />
                    </div>
                </div>

                {/* Vue Liste */}
                {viewMode === "list" && (
                    <div>
                        {filteredTasks.length === 0 ? (
                            <p className="text-body-s text-neutral-400">
                                Aucune tâche trouvée.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {filteredTasks.map((task) => (
                                    <TaskDetailCard
                                        key={task.id}
                                        task={task}
                                        onEdit={(t) => setEditingTask(t)}
                                        onDelete={(t) => setDeletingTask(t)}
                                    />
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

                {isOwner && (
                    <div className="mt-8 border-t border-neutral-200 pt-6">
                        <button
                            onClick={() => setShowDeleteProject(true)}
                            className="rounded-md bg-error-main px-4 py-2 text-body-s font-medium text-neutral-white shadow-sm hover:bg-error-main/80 transition-colors"
                        >
                            Supprimer le projet
                        </button>
                    </div>
                )}
            </div>

            <Modal
                isOpen={showCreateTask}
                onClose={() => setShowCreateTask(false)}
                title="Créer une tâche"
            >
                <TaskForm
                    mode="create"
                    projectId={id}
                    owner={project.owner}
                    isOwner={isOwner}
                    members={project.members}
                    onSuccess={handleTaskCreated}
                />
            </Modal>

            <Modal
                isOpen={showEditProject}
                onClose={() => setShowEditProject(false)}
                title="Modifier le projet"
            >
                <ProjectForm
                    mode="edit"
                    project={project}
                    onSuccess={handleProjectUpdated}
                    onMembersChanged={handleMembersChanged}
                />
            </Modal>

            <ConfirmDeleteModal
                isOpen={showDeleteProject}
                onConfirm={handleDeleteProject}
                onCancel={() => setShowDeleteProject(false)}
                isDeleting={isDeleting}
                title="Supprimer le projet"
                message="Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible."
            />

            {/* Modale édition de tâche */}
            {editingTask && (
                <Modal
                    isOpen={!!editingTask}
                    onClose={() => setEditingTask(null)}
                    title="Modifier la tâche"
                >
                    <TaskForm
                        mode="edit"
                        projectId={id}
                        owner={project.owner}
                        isOwner={isOwner}
                        members={project.members}
                        initialData={{
                            taskId: editingTask.id,
                            title: editingTask.title,
                            description: editingTask.description,
                            dueDate: editingTask.dueDate,
                            status: editingTask.status,
                            priority: editingTask.priority,
                            assigneeIds: extractAssigneeIds(editingTask),
                        }}
                        onSuccess={handleTaskUpdated}
                    />
                </Modal>
            )}

            {/* Modale suppression de tâche */}
            <ConfirmDeleteModal
                isOpen={!!deletingTask}
                onConfirm={handleDeleteTask}
                onCancel={() => setDeletingTask(null)}
                isDeleting={isDeletingTask}
                title="Supprimer la tâche"
                message={`Êtes-vous sûr de vouloir supprimer la tâche "${deletingTask?.title}" ? Cette action est irréversible.`}
            />
        </div>
    );
}
