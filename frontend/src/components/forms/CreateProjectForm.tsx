"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { createProject, searchUsers } from "@/lib/api";
import { createProjectSchema, type CreateProjectInput } from "@/lib/validators";
import type { Project } from "@/lib/api";

interface CreateProjectFormProps {
    onSuccess: (project: Project) => void;
}

function CreateProjectForm({ onSuccess }: CreateProjectFormProps) {
    const [showContributors, setShowContributors] = useState(false);
    const [contributorSearch, setContributorSearch] = useState("");
    const [searchResults, setSearchResults] = useState<Array<{ id: string; email: string; name: string | null }>>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedContributors, setSelectedContributors] = useState<Array<{ id: string; email: string; name: string | null }>>([]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateProjectInput>({
        resolver: zodResolver(createProjectSchema),
    });

    async function handleSearchUsers(query: string) {
        setContributorSearch(query);
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }
        setIsSearching(true);
        try {
            const results = await searchUsers(query);
            // Filtrer ceux déjà sélectionnés
            const selectedIds = new Set(selectedContributors.map((c) => c.id));
            setSearchResults(results.filter((r) => !selectedIds.has(r.id)));
        } catch {
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }

    function addContributor(user: { id: string; email: string; name: string | null }) {
        setSelectedContributors((prev) => [...prev, user]);
        setContributorSearch("");
        setSearchResults([]);
    }

    function removeContributor(userId: string) {
        setSelectedContributors((prev) => prev.filter((c) => c.id !== userId));
    }

    async function onSubmit(data: CreateProjectInput) {
        try {
            const project = await createProject({
                name: data.name,
                description: data.description || "",
            });
            // Ajouter les contributeurs un par un après création
            if (selectedContributors.length > 0) {
                const { addContributor: addContrib } = await import("@/lib/api");
                for (const c of selectedContributors) {
                    try {
                        await addContrib(project.id, c.email);
                    } catch {
                        // ignorer les erreurs individuelles
                    }
                }
            }
            toast.success("Projet créé !");
            onSuccess(project);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erreur de création");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Nom du projet"
                placeholder="Mon projet"
                error={errors.name?.message}
                {...register("name")}
            />
            <Textarea
                label="Description"
                placeholder="Décrivez votre projet..."
                rows={3}
                error={errors.description?.message}
                {...register("description")}
            />

            {/* Accordéon Contributeurs */}
            <div>
                <button
                    type="button"
                    onClick={() => setShowContributors((prev) => !prev)}
                    className="flex items-center gap-1 text-body-xs font-medium text-neutral-600 hover:text-neutral-800 transition-colors"
                >
                    Contributeurs ({selectedContributors.length})
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
                            onChange={(e) => handleSearchUsers(e.target.value)}
                            placeholder="Rechercher par email ou nom..."
                            className="block w-full rounded-md border border-neutral-200 px-3 py-1.5 text-body-xs shadow-sm placeholder:text-neutral-400 focus:border-brand-orange-main focus:outline-none focus:ring-1 focus:ring-brand-orange-main"
                        />

                        {/* Résultats de recherche */}
                        {isSearching && (
                            <p className="text-body-xs text-neutral-400">Recherche...</p>
                        )}
                        {searchResults.length > 0 && (
                            <div className="max-h-32 space-y-0.5 overflow-y-auto rounded-md border border-neutral-100">
                                {searchResults.map((u) => (
                                    <button
                                        key={u.id}
                                        type="button"
                                        onClick={() => addContributor(u)}
                                        className="flex w-full items-center justify-between px-3 py-1.5 text-left text-body-xs hover:bg-neutral-50 transition-colors"
                                    >
                                        <span>
                                            {u.name || "Sans nom"}{" "}
                                            <span className="text-neutral-400">({u.email})</span>
                                        </span>
                                        <span className="text-brand-orange-main font-medium">+ Ajouter</span>
                                    </button>
                                ))}
                            </div>
                        )}
                        {contributorSearch.length >= 2 && !isSearching && searchResults.length === 0 && (
                            <p className="text-body-xs text-neutral-400">Aucun utilisateur trouvé.</p>
                        )}

                        {/* Liste des contributeurs sélectionnés */}
                        {selectedContributors.length > 0 && (
                            <div className="space-y-1">
                                {selectedContributors.map((c) => (
                                    <div
                                        key={c.id}
                                        className="flex items-center justify-between rounded-md bg-neutral-50 px-3 py-1.5"
                                    >
                                        <span className="text-body-xs text-neutral-700">
                                            {c.name || "Sans nom"}{" "}
                                            <span className="text-neutral-400">({c.email})</span>
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeContributor(c.id)}
                                            className="text-body-xs text-error-main hover:text-error-main/80"
                                        >
                                            Retirer
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Button type="submit" isLoading={isSubmitting} className="w-full">
                Créer le projet
            </Button>
        </form>
    );
}

export { CreateProjectForm };
