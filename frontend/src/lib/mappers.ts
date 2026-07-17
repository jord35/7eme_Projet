import type { Task, AssignedTask, Comment } from "./api";

/**
 * Transformations de données entre le format API brute et le format d'affichage.
 *
 * Règles :
 * - Fonctions pures uniquement (pas d'appel API, pas d'effet de bord)
 * - Nommage explicite : extractXxx, formatXxx, getXxx
 * - Typage strict
 */

// ─── Dates ────────────────────────────────────────────────

/** Formate une date ISO en français (ex: "13 juil. 2026, 14:30") */
export function formatDate(
    dateStr: string | null | undefined,
    options?: { withTime?: boolean },
): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const localeOptions: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    if (options?.withTime) {
        localeOptions.hour = "2-digit";
        localeOptions.minute = "2-digit";
    }
    return date.toLocaleDateString("fr-FR", localeOptions);
}

/** Formate une date ISO en date courte française (ex: "13/07/2026") */
export function formatShortDate(dateStr: string | null | undefined): string {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("fr-FR");
}

// ─── Statuts ──────────────────────────────────────────────

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type BadgeVariant = "info" | "warning" | "success" | "error" | "neutral";

const STATUS_LABELS: Record<TaskStatus, string> = {
    TODO: "À faire",
    IN_PROGRESS: "En cours",
    DONE: "Terminé",
    CANCELLED: "Annulé",
};

const STATUS_VARIANTS: Record<TaskStatus, BadgeVariant> = {
    TODO: "info",
    IN_PROGRESS: "warning",
    DONE: "success",
    CANCELLED: "error",
};

const PRIORITY_LABELS: Record<TaskPriority, string> = {
    LOW: "Basse",
    MEDIUM: "Moyenne",
    HIGH: "Haute",
    URGENT: "Urgente",
};

/** Retourne le libellé français d'un statut de tâche */
export function getStatusLabel(status: string): string {
    return STATUS_LABELS[status as TaskStatus] || status;
}

/** Retourne la variante de badge correspondant à un statut */
export function getStatusVariant(status: string): BadgeVariant {
    return STATUS_VARIANTS[status as TaskStatus] || "neutral";
}

/** Retourne le libellé français d'une priorité */
export function getPriorityLabel(priority: string): string {
    return PRIORITY_LABELS[priority as TaskPriority] || priority;
}

// ─── Noms / Initiales ─────────────────────────────────────

/** Extrait les initiales d'un nom (ex: "Jean Dupont" → "JD") */
export function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

// ─── Tâches ───────────────────────────────────────────────

/** Extrait les IDs des utilisateurs assignés à une tâche */
export function extractAssigneeIds(task: Task): string[] {
    return task.assignees?.map((a) => a.user.id) || [];
}

/** Retourne le nombre de commentaires d'une tâche (depuis _count ou comments[]) */
export function getCommentCount(task: Task | AssignedTask): number {
    if ("comments" in task && Array.isArray((task as any).comments)) {
        return (task as any).comments.length;
    }
    return task._count?.comments ?? 0;
}

// ─── Membres / Équipe ─────────────────────────────────────

/** Détermine le libellé du rôle d'un membre */
export function getRoleLabel(
    userId: string,
    ownerId: string,
    role: string | undefined,
): string {
    if (userId === ownerId) return "Propriétaire";
    if (role === "ADMIN") return "Admin";
    return "Contributeur";
}

/** Formate le libellé d'un groupe de membres (ex: "Contributeurs 3 personnes") */
export function formatMemberLabel(
    label: string,
    count: number,
): string {
    if (!label) return "";
    if (label === "Contributeurs") {
        return `Contributeurs ${count} personne${count > 1 ? "s" : ""}`;
    }
    return `${label} (${count})`;
}

/** Construit un Set des IDs des membres valides d'un projet (owner + contributeurs) */
export function getProjectMemberIds(project: {
    owner: { id: string };
    members: Array<{ user: { id: string } }>;
}): Set<string> {
    return new Set([
        project.owner.id,
        ...project.members.map((m) => m.user.id),
    ]);
}

// ─── Filtres / Recherche ──────────────────────────────────

/**
 * Filtre une liste d'éléments par recherche textuelle sur le titre et la description.
 * La recherche est insensible à la casse.
 */
export function filterBySearchQuery<T extends { title: string; description?: string | null }>(
    items: T[],
    query: string,
): T[] {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(
        (item) =>
            item.title.toLowerCase().includes(q) ||
            (item.description || "").toLowerCase().includes(q),
    );
}
