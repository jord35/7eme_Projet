"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { createProject } from "@/lib/api";
import { createProjectSchema, type CreateProjectInput } from "@/lib/validators";
import type { Project } from "@/lib/api";

interface CreateProjectFormProps {
    onSuccess: (project: Project) => void;
}

function CreateProjectForm({ onSuccess }: CreateProjectFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateProjectInput>({
        resolver: zodResolver(createProjectSchema),
    });

    async function onSubmit(data: CreateProjectInput) {
        try {
            const project = await createProject({
                name: data.name,
                description: data.description || "",
            });
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
            <Button type="submit" isLoading={isSubmitting} className="w-full">
                Créer le projet
            </Button>
        </form>
    );
}

export { CreateProjectForm };
