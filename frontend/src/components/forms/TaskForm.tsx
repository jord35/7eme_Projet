"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { createTask, updateTask } from "@/lib/api";
import { createTaskSchema, type CreateTaskInput } from "@/lib/validators";
import type { Task } from "@/lib/api";

interface TaskFormProps {
    /** Mode création ou édition */
    mode: "create" | "edit";
    projectId: string;
    /** Propriétaire du projet (inclus dans la liste des assignables) */
    owner: { id: string; name: string; email: string };
    /** L'utilisateur connecté est-il propriétaire du projet ? */
    isOwner: boolean;
    members: Array<{
        user: { id: string; name: string; email: string };
    }>;
    /** Données initiales (mode edit uniquement) */
    initialData?: {
        taskId: string;
        title: string;
        description: string | null;
        dueDate: string | null;
        status: string;
        assigneeIds: string[];
    };
    /** Callback appelé après création ou modification réussie */
    onSuccess: (task: Task) => void;
}

const statusOptions = [
    { value: "TODO", label: "À faire" },
    { value: "IN_PROGRESS", label: "En cours" },
    { value: "DONE", label: "Terminé" },
];

/**
 * Formulaire unifié de création / modification de tâche.
 * En mode "create" : appelle createTask().
 * En mode "edit" : pré-remplit les champs et appelle updateTask().
 */
function TaskForm({ mode, projectId, owner, isOwner, members, initialData, onSuccess }: TaskFormProps) {
    const [selectedAssignees, setSelectedAssignees] = useState<string[]>(
        initialData?.assigneeIds || []
    );
    const [status, setStatus] = useState(initialData?.status || "TODO");
    const [showAssignees, setShowAssignees] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateTaskInput>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            dueDate: initialData?.dueDate || "",
        },
    });

    /** Bascule la sélection d'un assigné */
    function toggleAssignee(userId: string) {
        setSelectedAssignees((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    }

    /** Soumission du formulaire */
    async function onSubmit(data: CreateTaskInput) {
        try {
            let task: Task;

            if (mode === "create") {
                task = await createTask(projectId, {
                    title: data.title,
                    description: data.description || "",
                    dueDate: data.dueDate,
                    assigneeIds: selectedAssignees.length > 0 ? selectedAssignees : undefined,
                });
                toast.success("Tâche créée !");
            } else {
                task = await updateTask(projectId, initialData!.taskId, {
                    title: data.title,
                    description: data.description || "",
                    dueDate: data.dueDate,
                    status,
                    assigneeIds: selectedAssignees,
                });
                toast.success("Tâche modifiée !");
            }

            onSuccess(task);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erreur");
        }
    }

    const memberList = [
        { id: owner.id, name: owner.name },
        ...members.map((m) => ({
            id: m.user.id,
            name: m.user.name,
        })),
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Titre */}
            <Input
                label="Titre"
                placeholder="Titre de la tâche"
                error={errors.title?.message}
                {...register("title")}
            />

            {/* Description */}
            <Textarea
                label="Description"
                placeholder="Description..."
                rows={3}
                error={errors.description?.message}
                {...register("description")}
            />

            {/* Date d'échéance (propriétaire uniquement) */}
            {isOwner && (
                <Input
                    label="Date d'échéance"
                    type="date"
                    error={errors.dueDate?.message}
                    {...register("dueDate")}
                />
            )}

            {/* Assigné à — accordéon */}
            {memberList.length > 0 && (
                <div>
                    <button
                        type="button"
                        onClick={() => setShowAssignees((prev) => !prev)}
                        className="flex items-center gap-1 text-body-xs font-medium text-neutral-600 hover:text-neutral-800 transition-colors"
                    >
                        Assigné à ({selectedAssignees.length})
                        <span className="text-neutral-400">
                            {showAssignees ? "▲" : "▼"}
                        </span>
                    </button>

                    {showAssignees && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {memberList.map((member) => {
                                const isSelected = selectedAssignees.includes(member.id);
                                return (
                                    <button
                                        key={member.id}
                                        type="button"
                                        onClick={() => toggleAssignee(member.id)}
                                        className={`rounded-full px-3 py-1 text-body-xs font-medium transition ${isSelected
                                            ? "bg-brand-orange-main text-neutral-white"
                                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                                            }`}
                                    >
                                        {member.name}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Statut */}
            <div>
                <label className="block text-body-xs font-medium text-neutral-600 mb-1">
                    Statut
                </label>
                <div className="flex gap-2">
                    {statusOptions.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => setStatus(opt.value)}
                            className={`rounded-full px-4 py-1.5 text-body-xs font-medium transition ${status === opt.value
                                ? "bg-brand-orange-main text-neutral-white"
                                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <Button type="submit" isLoading={isSubmitting} className="w-full">
                {mode === "create" ? "Créer la tâche" : "Enregistrer"}
            </Button>
        </form>
    );
}

export { TaskForm };
export type { TaskFormProps };
