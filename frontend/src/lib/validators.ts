import { z } from "zod";

// ─── Auth ───────────────────────────────────────────────

export const loginSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(1, "Mot de passe requis"),
});

export const registerSchema = z
    .object({
        firstName: z.string().min(1, "Prénom requis"),
        lastName: z.string().min(1, "Nom requis"),
        email: z.string().email("Email invalide"),
        password: z
            .string()
            .min(8, "Minimum 8 caractères")
            .regex(/[A-Z]/, "Au moins une majuscule")
            .regex(/[a-z]/, "Au moins une minuscule")
            .regex(/[0-9]/, "Au moins un chiffre")
            .regex(/[@$!%*?&]/, "Au moins un caractère spécial"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
    });

// ─── Profil ─────────────────────────────────────────────

export const profileSchema = z.object({
    firstName: z.string().min(1, "Prénom requis"),
    lastName: z.string().min(1, "Nom requis"),
    email: z.string().email("Email invalide"),
});

export const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, "Mot de passe actuel requis"),
        newPassword: z
            .string()
            .min(8, "Minimum 8 caractères")
            .regex(/[A-Z]/, "Au moins une majuscule")
            .regex(/[a-z]/, "Au moins une minuscule")
            .regex(/[0-9]/, "Au moins un chiffre")
            .regex(/[@$!%*?&]/, "Au moins un caractère spécial"),
        confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmNewPassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: "Le nouveau mot de passe doit être différent de l'actuel",
        path: ["newPassword"],
    });

// ─── Projet ─────────────────────────────────────────────

export const createProjectSchema = z.object({
    name: z
        .string()
        .min(2, "Minimum 2 caractères")
        .max(100, "Maximum 100 caractères"),
    description: z.string().max(500, "Maximum 500 caractères").optional(),
});

export const updateProjectSchema = z.object({
    name: z
        .string()
        .min(2, "Minimum 2 caractères")
        .max(100, "Maximum 100 caractères")
        .optional(),
    description: z.string().max(500, "Maximum 500 caractères").optional(),
});

// ─── Tâche ──────────────────────────────────────────────

export const createTaskSchema = z.object({
    title: z
        .string()
        .min(2, "Minimum 2 caractères")
        .max(200, "Maximum 200 caractères"),
    description: z.string().max(1000, "Maximum 1000 caractères").optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
    dueDate: z.string().optional(),
    assigneeIds: z.array(z.string()).optional(),
});

export const updateTaskSchema = z.object({
    title: z
        .string()
        .min(2, "Minimum 2 caractères")
        .max(200, "Maximum 200 caractères")
        .optional(),
    description: z.string().max(1000, "Maximum 1000 caractères").optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE", "CANCELLED"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
    dueDate: z.string().optional(),
    assigneeIds: z.array(z.string()).optional(),
});

// ─── Commentaire ────────────────────────────────────────

export const createCommentSchema = z.object({
    content: z
        .string()
        .min(1, "Le commentaire ne peut pas être vide")
        .max(2000, "Maximum 2000 caractères"),
});

// ─── Types inférés ──────────────────────────────────────

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type PasswordInput = z.infer<typeof passwordSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
