"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectCard } from "@/components/features/ProjectCard";
import { Spinner } from "@/components/ui/Spinner";
import { Modal } from "@/components/ui/Modal";
import { CreateProjectForm } from "@/components/forms/CreateProjectForm";
import { getProjects } from "@/lib/api";
import type { Project } from "@/lib/api";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        getProjects()
            .then((data) => setProjects(data.projects))
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    function handleProjectCreated(project: Project) {
        setProjects((prev) => [project, ...prev]);
        setShowCreateModal(false);
    }

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
                            completedTasks={0}
                        />
                    ))}
                </div>
            )}

            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Créer un projet"
            >
                <CreateProjectForm onSuccess={handleProjectCreated} />
            </Modal>
        </div>
    );
}
