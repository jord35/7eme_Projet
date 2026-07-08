"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { updateProject } from "@/lib/api";
import { updateProjectSchema, type UpdateProjectInput } from "@/lib/validators";
import type { Project } from "@/lib/api";

interface EditProjectFormProps {
    project: Project;
    onSuccess: (project: Project) => void;
}

function EditProjectForm({ project, onSuccess }: EditProjectFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UpdateProjectInput>({
        resolver: zodResolver(updateProjectSchema),
        defaultValues: {
            name: project.name,
            description: project.description,
        },
    });

    async function onSubmit(data: UpdateProjectInput) {
        try {
            const updated = await updateProject(project.id, {
                name: data.name,
                description: data.description || "",
            });
            toast.success("Projet modifié !");
            onSuccess(updated);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erreur de modification");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Nom du projet"
                error={errors.name?.message}
                {...register("name")}
            />
            <Textarea
                label="Description"
                rows={3}
                error={errors.description?.message}
                {...register("description")}
            />
            <Button type="submit" isLoading={isSubmitting} className="w-full">
                Enregistrer
            </Button>
        </form>
    );
}

export { EditProjectForm };
