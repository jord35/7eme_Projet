"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
    createProject,
    updateProject,
    searchUsers,
    addContributor,
    removeContributor,
} from "@/lib/api";
import {
    createProjectSchema,
    updateProjectSchema,
    type CreateProjectInput,
    type UpdateProjectInput,
} from "@/lib/validators";
import type { Project } from "@/lib/api";

interface ProjectFormProps {
    /** Mode création ou édition */
    mode: "create" | "edit";
    /** Données initiales (mode edit uniquement) */
    project?: Project;
    /** Callback appelé après création ou modification réussie */
    onSuccess: (project: Project) => void;
}

function ProjectForm({ mode, project, onSuccess }: ProjectFormProps) {
    const isEdit = mode === "edit";

    // ─── Formulaire nom/description ───
    const createForm = useForm<CreateProjectInput>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: project?.name || "",
            description: project?.description || "",
        },
    });

    const editForm = useForm<UpdateProjectInput>({
        resolver: zodResolver(updateProjectSchema),
        defaultValues: {
            name: project?.name || "",
            description: project?.description || "",
        },
    });

    const form = isEdit ? editForm : createForm;
    const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

    // ─── Contributeurs ───
    const [showContributors, setShowContributors] = useState(false);
    const [contributorSearch, setContributorSearch] = useState("");
    const [searchResults, setSearchResults] = useState<
        Array<{ id: string; email: string; name: string | null }>
    >([]);
    const [isSearching, setIsSearching] = useState(false);

    // En mode edit, initialiser avec les membres existants
    const [currentMembers, setCurrentMembers] = useState<
        Array<{
            userId: string;
            role: string;
            user: { id: string; email: string; name: string };
        }>
    >(project?.members || []);

    useEffect(() => {
        if (project?.members) {
            setCurrentMembers(project.members);
        }
    }, [project]);

    // ─── Recherche utilisateurs ───
    async function handleSearchUsers(query: string) {
        setContributorSearch(query);
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }
        setIsSearching(true);
        try {
            const results = await searchUsers(query);
            const memberIds = new Set(currentMembers.map((m) => m.user.id));
            if (project?.owner?.id) memberIds.add(project.owner.id);
            setSearchResults(results.filter((r) => !memberIds.has(r.id)));
        } catch {
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }

    // ─── Ajouter un contributeur ───
    async function handleAddContributor(email: string, name: string | null) {
        if (!isEdit) {
            // En mode création, on ne peut pas encore ajouter (le projet n'existe pas)
            // On stocke juste l'info, l'ajout se fera après création
            toast.info("Les contributeurs seront ajoutés après la création du projet.");
            return;
        }

        try {
            await addContributor(project!.id, email);
            toast.success(`${name || email} ajouté !`);
            // Recharger les membres
            const { getProject } = await import("@/lib/api");
            const updated = await getProject(project!.id);
            setCurrentMembers(updated.members);
            setContributorSearch("");
            setSearchResults([]);
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : "Erreur d'ajout"
            );
        }
    }

    // ─── Retirer un contributeur ───
    async function handleRemoveContributor(userId: string) {
        if (!isEdit || !project) return;
        try {
            await removeContributor(project.id, userId);
            toast.success("Contributeur retiré");
            const { getProject } = await import("@/lib/api");
            const updated = await getProject(project.id);
            setCurrentMembers(updated.members);
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : "Erreur de retrait"
            );
        }
    }

    // ─── Soumission ───
    async function onSubmit(data: CreateProjectInput | UpdateProjectInput) {
        try {
            let result: Project;

            if (mode === "create") {
                const createData = data as CreateProjectInput;
                result = await createProject({
                    name: createData.name,
                    description: createData.description || "",
                });
                toast.success("Projet créé !");
            } else {
                const updateData = data as UpdateProjectInput;
                result = await updateProject(project!.id, {
                    name: updateData.name,
                    description: updateData.description || "",
                });
                toast.success("Projet modifié !");
            }

            onSuccess(result);
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : "Erreur"
            );
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nom */}
            <Input
                label="Nom du projet"
                placeholder="Mon projet"
                error={errors.name?.message}
                {...register("name")}
            />

            {/* Description */}
            <Textarea
                label="Description"
                placeholder="Décrivez votre projet..."
                rows={3}
                error={errors.description?.message}
                {...register("description")}
            />

            {/* ─── Contributeurs (mode edit uniquement) ─── */}
            {isEdit && project && (
                <div>
                    <button
                        type="button"
                        onClick={() => setShowContributors((prev) => !prev)}
                        className="flex items-center gap-1 text-body-xs font-medium text-neutral-600 hover:text-neutral-800 transition-colors"
                    >
                        Contributeurs ({currentMembers.length + 1})
                        <span className="text-neutral-400">
                            {showContributors ? "▲" : "▼"}
                        </span>
                    </button>

                    {showContributors && (
                        <div className="mt-2 space-y-2">
                            {/* Recherche */}
                            <input
                                type="text"
                                value={contributorSearch}
                                onChange={(e) =>
                                    handleSearchUsers(e.target.value)
                                }
                                placeholder="Rechercher par email ou nom..."
                                className="block w-full rounded-md border border-neutral-200 px-3 py-1.5 text-body-xs shadow-sm placeholder:text-neutral-400 focus:border-brand-orange-main focus:outline-none focus:ring-1 focus:ring-brand-orange-main"
                            />

                            {/* Résultats de recherche */}
                            {isSearching && (
                                <p className="text-body-xs text-neutral-400">
                                    Recherche...
                                </p>
                            )}
                            {searchResults.length > 0 && (
                                <div className="max-h-32 space-y-0.5 overflow-y-auto rounded-md border border-neutral-100">
                                    {searchResults.map((u) => (
                                        <button
                                            key={u.id}
                                            type="button"
                                            onClick={() =>
                                                handleAddContributor(
                                                    u.email,
                                                    u.name
                                                )
                                            }
                                            className="flex w-full items-center justify-between px-3 py-1.5 text-left text-body-xs hover:bg-neutral-50 transition-colors"
                                        >
                                            <span>
                                                {u.name || "Sans nom"}{" "}
                                                <span className="text-neutral-400">
                                                    ({u.email})
                                                </span>
                                            </span>
                                            <span className="text-brand-orange-main font-medium">
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

                            {/* Liste des membres actuels */}
                            <div className="space-y-1">
                                {/* Owner */}
                                <div className="flex items-center justify-between rounded-md bg-neutral-50 px-3 py-1.5">
                                    <span className="text-body-xs text-neutral-700">
                                        {project.owner.name}{" "}
                                        <span className="text-neutral-400">
                                            ({project.owner.email})
                                        </span>
                                        <Badge variant="info" className="ml-2">
                                            Admin
                                        </Badge>
                                    </span>
                                </div>

                                {/* Membres */}
                                {currentMembers.map((m) => (
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
                                                <Badge
                                                    variant="info"
                                                    className="ml-2"
                                                >
                                                    Admin
                                                </Badge>
                                            )}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveContributor(
                                                    m.user.id
                                                )
                                            }
                                            className="text-body-xs text-error-main hover:text-error-main/80 transition-colors"
                                        >
                                            Retirer
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full"
            >
                {mode === "create" ? "Créer le projet" : "Enregistrer"}
            </Button>
        </form>
    );
}

export { ProjectForm };
export type { ProjectFormProps };
