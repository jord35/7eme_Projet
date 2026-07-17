"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageLoader } from "@/components/ui/PageLoader";
import { ProjectCard } from "@/components/features/ProjectCard";
import { Modal } from "@/components/ui/Modal";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { getProjects, getProjectTasks } from "@/lib/api";
import type { Project } from "@/lib/api";

/**
 * Compte le nombre de tâches terminées pour un projet donné.
 *
 * TODO: À déplacer côté back-end (GET /projects devrait renvoyer
 *       _count.completedTasks en plus de _count.tasks).
 *       Voir backend/src/controllers/projectController.ts:293
 *       → ajouter `completedTasks: { where: { status: "DONE" } }` dans le _count.
 */
async function fetchCompletedTasks(projectId: string): Promise<number> {
    try {
        const tasks = await getProjectTasks(projectId);
        return tasks.filter((t) => t.status === "DONE").length;
    } catch {
        return 0;
    }
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [completedCounts, setCompletedCounts] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        getProjects()
            .then(async (data) => {
                const projectList = data.projects;
                setProjects(projectList);

                // Charge le nombre de tâches terminées pour chaque projet
                const counts: Record<string, number> = {};
                await Promise.all(
                    projectList.map(async (p) => {
                        counts[p.id] = await fetchCompletedTasks(p.id);
                    })
                );
                setCompletedCounts(counts);
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    function handleProjectCreated(project: Project) {
        setProjects((prev) => [project, ...prev]);
        setCompletedCounts((prev) => ({ ...prev, [project.id]: 0 }));
        setShowCreateModal(false);
    }

    if (isLoading) return <PageLoader />;

    return (
        <div>
            <PageHeader
                title="Mes projets"
                description="Gérer vos projets"
                action={{
                    label: "+ Nouveau projet",
                    onClick: () => setShowCreateModal(true),
                }}
            />

            {projects.length === 0 ? (
                <p className="text-body-s text-neutral-400">Aucun projet trouvé.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            completedTasks={completedCounts[project.id] ?? 0}
                        />
                    ))}
                </div>
            )}

            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Créer un projet"
            >
                <ProjectForm mode="create" onSuccess={handleProjectCreated} />
            </Modal>
        </div>
    );
}
