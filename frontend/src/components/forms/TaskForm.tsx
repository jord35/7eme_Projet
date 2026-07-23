"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { createTask, updateTask } from "@/lib/api";
import { createTaskSchema, type CreateTaskInput } from "@/lib/validators";
import { getProjectMemberIds } from "@/lib/mappers";
import type { Task } from "@/lib/api";

interface TaskFormProps {
    mode: "create" | "edit";
    projectId: string;
    owner: { id: string; name: string; email: string };
    isOwner: boolean;
    members: Array<{
        user: { id: string; name: string; email: string };
    }>;
    initialData?: {
        taskId: string;
        title: string;
        description: string | null;
        dueDate: string | null;
        status: string;
        priority?: string;
        assigneeIds: string[];
    };
    onSuccess: (task: Task) => void;
}

const statusOptions = [
    { value: "TODO", label: "À faire" },
    { value: "IN_PROGRESS", label: "En cours" },
    { value: "DONE", label: "Terminé" },
];

const STATUS_COLORS: Record<string, string> = {
    TODO: "bg-error-light text-error-main",
    IN_PROGRESS: "bg-warning-light text-warning-main",
    DONE: "bg-success-light text-success-main",
};

const priorityOptions = [
    { value: "LOW", label: "Basse" },
    { value: "MEDIUM", label: "Moyenne" },
    { value: "HIGH", label: "Haute" },
    { value: "URGENT", label: "Urgente" },
];

function TaskForm({ mode, projectId, owner, isOwner, members, initialData, onSuccess }: TaskFormProps) {
    const validMemberIds = getProjectMemberIds({ owner, members });
    const initialAssigneeIds = (initialData?.assigneeIds || []).filter((id) =>
        validMemberIds.has(id)
    );

    const [selectedAssignees, setSelectedAssignees] = useState<string[]>(initialAssigneeIds);
    const [status, setStatus] = useState(initialData?.status || "TODO");
    const [priority, setPriority] = useState(initialData?.priority || "MEDIUM");
    const [showAssignees, setShowAssignees] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<CreateTaskInput>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            dueDate: initialData?.dueDate || "",
        },
    });

    const watchedTitle = watch("title");
    const watchedDescription = watch("description");
    const watchedDueDate = watch("dueDate");

    const isFormValid = useMemo(() => {
        return watchedTitle?.trim();
    }, [watchedTitle]);

    function toggleAssigneeSelection(userId: string) {
        setSelectedAssignees((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    }

    async function onSubmit(data: CreateTaskInput) {
        try {
            let task: Task;
            if (mode === "create") {
                task = await createTask(projectId, {
                    title: data.title,
                    description: data.description || "",
                    dueDate: data.dueDate,
                    priority,
                    assigneeIds: selectedAssignees.length > 0 ? selectedAssignees : undefined,
                });
                toast.success("Tâche créée !");
            } else {
                task = await updateTask(projectId, initialData!.taskId, {
                    title: data.title,
                    description: data.description || "",
                    dueDate: data.dueDate,
                    status,
                    priority,
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
        ...members.map((m) => ({ id: m.user.id, name: m.user.name })),
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Titre */}
            <Input
                label="Titre *"
                placeholder="Titre de la tâche"
                error={errors.title?.message}
                {...register("title")}
            />

            {/* Description */}
            <Textarea
                label="Description *"
                placeholder="Description..."
                rows={3}
                error={errors.description?.message}
                {...register("description")}
            />

            {/* Échéance */}
            <Input
                label="Échéance"
                type="date"
                error={errors.dueDate?.message}
                {...register("dueDate")}
            />

            {/* Assigné à — accordéon */}
            {memberList.length > 0 && (
                <div>
                    <label className="mb-1 block text-body-s font-medium text-neutral-800">
                        Assigné à
                    </label>
                    <Accordion
                        label={
                            selectedAssignees.length > 0
                                ? `${selectedAssignees.length} collaborateur${selectedAssignees.length > 1 ? "s" : ""}`
                                : "Choisir un ou plusieurs contributeurs"
                        }
                        open={showAssignees}
                        onToggle={() => setShowAssignees((prev) => !prev)}
                    >
                        <div className="flex flex-wrap gap-2">
                            {memberList.map((member) => {
                                const isSelected = selectedAssignees.includes(member.id);
                                return (
                                    <button
                                        key={member.id}
                                        type="button"
                                        onClick={() => toggleAssigneeSelection(member.id)}
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
                    </Accordion>
                </div>
            )}

            {/* Statut */}
            <div>
                <label className="mb-2 block text-body-s text-neutral-950">Statut</label>
                <div className="flex gap-2">
                    {statusOptions.map((opt) => {
                        const isActive = status === opt.value;
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setStatus(opt.value)}
                                className={`rounded-full px-4 py-1.5 text-body-xs font-medium transition ${STATUS_COLORS[opt.value]} ${isActive ? "ring-2 ring-neutral-950" : "ring-0"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Priorité */}
            {isOwner && (
                <div>
                    <label className="mb-2 block text-body-s text-neutral-950">Priorité</label>
                    <div className="flex gap-2">
                        {priorityOptions.map((opt) => {
                            const isActive = priority === opt.value;
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setPriority(opt.value)}
                                    className={`rounded-full px-4 py-1.5 text-body-xs font-medium transition ${isActive
                                        ? "bg-brand-orange-main text-neutral-white ring-2 ring-neutral-950"
                                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 ring-0"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Bouton submit */}
            <div className="flex">
                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={!isFormValid}
                    className={!isFormValid ? "bg-neutral-200 text-neutral-400" : ""}
                >
                    + Ajouter une tâche
                </Button>
            </div>
        </form>
    );
}

export { TaskForm };
export type { TaskFormProps };
