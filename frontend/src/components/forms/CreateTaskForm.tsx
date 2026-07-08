"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { createTask } from "@/lib/api";
import { createTaskSchema, type CreateTaskInput } from "@/lib/validators";
import type { Task } from "@/lib/api";

interface CreateTaskFormProps {
    projectId: string;
    onSuccess: (task: Task) => void;
}

const priorityOptions = [
    { value: "LOW", label: "Basse" },
    { value: "MEDIUM", label: "Moyenne" },
    { value: "HIGH", label: "Haute" },
    { value: "URGENT", label: "Urgente" },
];

function CreateTaskForm({ projectId, onSuccess }: CreateTaskFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateTaskInput>({
        resolver: zodResolver(createTaskSchema),
    });

    async function onSubmit(data: CreateTaskInput) {
        try {
            const task = await createTask(projectId, {
                title: data.title,
                description: data.description || "",
                priority: data.priority,
                dueDate: data.dueDate,
            });
            toast.success("Tâche créée !");
            onSuccess(task);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erreur de création");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Titre"
                placeholder="Titre de la tâche"
                error={errors.title?.message}
                {...register("title")}
            />
            <Textarea
                label="Description"
                placeholder="Description..."
                rows={3}
                error={errors.description?.message}
                {...register("description")}
            />
            <Select
                label="Priorité"
                options={priorityOptions}
                placeholder="Choisir une priorité"
                error={errors.priority?.message}
                {...register("priority")}
            />
            <Input
                label="Date d'échéance"
                type="date"
                error={errors.dueDate?.message}
                {...register("dueDate")}
            />
            <Button type="submit" isLoading={isSubmitting} className="w-full">
                Créer la tâche
            </Button>
        </form>
    );
}

export { CreateTaskForm };
