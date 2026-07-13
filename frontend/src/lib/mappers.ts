import type { Task } from "./api";

/**
 * Transformations de données entre le format API brute et le format d'affichage.
 *
 * Règles :
 * - Fonctions pures uniquement (pas d'appel API, pas d'effet de bord)
 * - Nommage explicite : extractXxx, formatXxx, etc.
 * - Typage strict
 */

/** Extrait les IDs des utilisateurs assignés à une tâche */
export function extractAssigneeIds(task: Task): string[] {
    return task.assignees?.map((a) => a.user.id) || [];
}
