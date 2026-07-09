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
import { ProjectMembers } from "@/components/features/ProjectMembers";
import { DeleteProjectModal } from "@/components/features/DeleteProjectModal";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { TaskForm } from "@/components/forms/TaskForm";
import { EditProjectForm } from "@/components/forms/EditProjectForm";
import { useAuth } from "@/context/AuthContext";
import {
    getProject,
    getProjectTasks,
    deleteProject,
    searchUsers,
    addContributor,
    removeContributor,
} from "@/lib/api";
import type { Project, Task } from "@/lib/api";

type ViewMode = "list" | "calendar";

const projectTabs = [
    { key: "list", label: "Liste" },
    { key: "calendar", label: "Calendrier" },
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
    const [viewMode, setViewMode] = useState<ViewMode>("list");
    const [statusFilter, setStatusFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [showAddContributor, setShowAddContributor] = useState(false);
    const [contributorSearch, setContributorSearch] = useState("");
    const [searchResults, setSearchResults] = useState<Array<{ id: string; email: string; name: string | null }>>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isAddingContributor, setIsAddingContributor] = useState(false);

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

    async function handleSearchUsers(query: string) {
        setContributorSearch(query);
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }
        setIsSearching(true);
        try {
            const results = await searchUsers(query);
            const memberIds = new Set([
                project?.owner.id,
                ...(project?.members.map((m) => m.user.id) || []),
            ]);
            setSearchResults(results.filter((r) => !memberIds.has(r.id)));
        } catch {
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }

    async function handleAddContributor(email: string) {
        setIsAddingContributor(true);
        try {
            await addContributor(id, email);
            toast.success("Contributeur ajouté !");
            const updated = await getProject(id);
            setProject(updated);
            setShowAddContributor(false);
            setContributorSearch("");
            setSearchResults([]);
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : "Erreur d'ajout"
            );
        } finally {
            setIsAddingContributor(false);
        }
    }

    async function handleRemoveContributor(userId: string) {
        try {
            await removeContributor(id, userId);
            toast.success("Contributeur retiré");
            const updated = await getProject(id);
            setProject(updated);
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : "Erreur de retrait"
            );
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

            {/* Contributeurs */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-body-s font-medium text-neutral-600">
                        Contributeurs ({project.members.length + 1})
                    </h2>
                    {isAdmin && (
                        <button
                            onClick={() => setShowAddContributor(true)}
                            className="text-body-xs font-medium text-brand-orange-main hover:text-brand-orange-dark transition-colors"
                        >
                            + Ajouter un contributeur
                        </button>
                    )}
                </div>
                <div className="mt-2">
                    <ProjectMembers
                        owner={project.owner}
                        members={project.members}
                        showNames
                        showRoleBadge
                    />
                </div>

                {isAdmin && (
                    <div className="mt-3 space-y-1">
                        {project.members.map((m) => (
                            <div
                                key={m.user.id}
                                className="flex items-center justify-between rounded-md bg-neutral-50 px-3 py-1.5"
                            >
                                <span className="text-body-xs text-neutral-700">
                                    {m.user.name}{" "}
                                    <span className="text-neutral-400">
                                        ({m.user.email})
                                    </span>
                                    {m.role === "ADMIN" && (
                                        <Badge variant="info" className="ml-2">
                                            Admin
                                        </Badge>
                                    )}
                                </span>
                                <button
                                    onClick={() =>
                                        handleRemoveContributor(m.user.id)
                                    }
                                    className="text-body-xs text-error-main hover:text-error-main/80 transition-colors"
                                >
                                    Retirer
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Tabs
                tabs={projectTabs}
                activeTab={viewMode}
                onChange={(key) => setViewMode(key as ViewMode)}
            />

            {/* Filtres + recherche */}
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
                                <TaskDetailCard key={task.id} task={task} />
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

            <Modal
                isOpen={showCreateTask}
                onClose={() => setShowCreateTask(false)}
                title="Créer une tâche"
            >
                <TaskForm
                    mode="create"
                    projectId={id}
                    members={project.members}
                    onSuccess={handleTaskCreated}
                />
            </Modal>

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

            <DeleteProjectModal
                isOpen={showDeleteProject}
                onConfirm={handleDeleteProject}
                onCancel={() => setShowDeleteProject(false)}
                isDeleting={isDeleting}
            />

            <Modal
                isOpen={showAddContributor}
                onClose={() => {
                    setShowAddContributor(false);
                    setContributorSearch("");
                    setSearchResults([]);
                }}
                title="Ajouter un contributeur"
            >
                <div className="space-y-4">
                    <input
                        type="text"
                        value={contributorSearch}
                        onChange={(e) => handleSearchUsers(e.target.value)}
                        placeholder="Rechercher par email ou nom..."
                        className="block w-full rounded-md border border-neutral-200 px-3 py-2 text-body-s shadow-sm placeholder:text-neutral-400 focus:border-brand-orange-main focus:outline-none focus:ring-1 focus:ring-brand-orange-main"
                    />
                    {isSearching && (
                        <p className="text-body-xs text-neutral-400">
                            Recherche...
                        </p>
                    )}
                    {searchResults.length > 0 && (
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                            {searchResults.map((u) => (
                                <button
                                    key={u.id}
                                    onClick={() =>
                                        handleAddContributor(u.email)
                                    }
                                    disabled={isAddingContributor}
                                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-body-s hover:bg-neutral-50 transition-colors"
                                >
                                    <span>
                                        {u.name || "Sans nom"}{" "}
                                        <span className="text-neutral-400">
                                            ({u.email})
                                        </span>
                                    </span>
                                    <span className="text-brand-orange-main text-body-xs font-medium">
                                        + Ajouter
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                    {contributorSearch.length >= 2 &&
                        !isSearching &&
                        searchResults.length === 0 && (
                            <p className="text-body-xs text-neutral-400">
                                Aucun utilisateur trouvé.
                            </p>
                        )}
                </div>
            </Modal>
        </div>
    );
}
