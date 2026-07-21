/**
 * Module API — Toutes les fonctions d'appel au backend.
 *
 * Base URL : NEXT_PUBLIC_API_URL (défaut: http://localhost:8000)
 * Authentification : token JWT dans sessionStorage, envoyé via header Authorization.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ─── Types ───────────────────────────────────────────────

export interface User {
    id: string;
    email: string;
    name: string;
    createdAt?: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

// ─── Helpers ─────────────────────────────────────────────

/** Gère la réponse API : parse le JSON, extrait `data`, ou throw une erreur */
async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const body = await res.json().catch(() => ({ message: "Erreur inconnue" }));
        const message =
            body.message ||
            body.error ||
            `Erreur ${res.status}`;
        throw new Error(message);
    }
    const json = await res.json();
    return json.data as T;
}

/** Récupère les headers avec le token JWT si disponible */
function getAuthHeaders(): Record<string, string> {
    const token = sessionStorage.getItem("token");
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}

// ─── Auth ────────────────────────────────────────────────

/** Connexion : POST /auth/login */
export async function login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    return handleResponse<LoginResponse>(res);
}

/** Inscription : POST /auth/register */
export async function register(
    email: string,
    password: string,
    name?: string,
): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, ...(name ? { name } : {}) }),
    });
    return handleResponse<LoginResponse>(res);
}

/** Profil utilisateur connecté : GET /auth/profile */
export async function getProfile(): Promise<User> {
    const res = await fetch(`${API_URL}/auth/profile`, {
        headers: getAuthHeaders(),
    });
    const data = await handleResponse<{ user: User }>(res);
    return data.user;
}

/** Mise à jour du profil : PUT /auth/profile */
export async function updateProfile(data: { name?: string; email?: string }): Promise<User> {
    const res = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse<User>(res);
}

/** Changement de mot de passe : PUT /auth/password */
export async function updatePassword(
    currentPassword: string,
    newPassword: string,
): Promise<{ success: boolean }> {
    const res = await fetch(`${API_URL}/auth/password`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword }),
    });
    return handleResponse<{ success: boolean }>(res);
}

// ─── Dashboard ───────────────────────────────────────────

/** Tâche assignée à l'utilisateur connecté (dashboard) */
export interface AssignedTask {
    id: string;
    title: string;
    description: string | null;
    status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    dueDate: string | null;
    projectId: string;
    creatorId: string;
    createdAt: string;
    project: { id: string; name: string };
    _count: { comments: number };
}

/** Tâches assignées à l'utilisateur : GET /dashboard/assigned-tasks */
export async function getAssignedTasks(): Promise<AssignedTask[]> {
    const res = await fetch(`${API_URL}/dashboard/assigned-tasks`, {
        headers: getAuthHeaders(),
    });
    const data = await handleResponse<{ tasks: AssignedTask[] }>(res);
    return data.tasks;
}

// ─── Projets ─────────────────────────────────────────────

export interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    ownerId: string;
    owner: { id: string; email: string; name: string };
    members: Array<{
        id: string;
        role: "ADMIN" | "CONTRIBUTOR";
        userId: string;
        user: { id: string; email: string; name: string };
    }>;
    _count: { tasks: number };
    userRole?: "ADMIN" | "CONTRIBUTOR";
}

/** Liste des projets : GET /projects */
export async function getProjects(): Promise<{ projects: Project[] }> {
    const res = await fetch(`${API_URL}/projects`, {
        headers: getAuthHeaders(),
    });
    return handleResponse<{ projects: Project[] }>(res);
}

/** Détail d'un projet : GET /projects/:id */
export async function getProject(id: string): Promise<Project> {
    const res = await fetch(`${API_URL}/projects/${id}`, {
        headers: getAuthHeaders(),
    });
    const data = await handleResponse<{ project: Project }>(res);
    return data.project;
}

/** Créer un projet : POST /projects */
export async function createProject(data: {
    name: string;
    description: string;
}): Promise<Project> {
    const res = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    const result = await handleResponse<{ project: Project }>(res);
    return result.project;
}

/** Modifier un projet : PUT /projects/:id */
export async function updateProject(
    id: string,
    data: { name?: string; description?: string },
): Promise<Project> {
    const res = await fetch(`${API_URL}/projects/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    const result = await handleResponse<{ project: Project }>(res);
    return result.project;
}

/** Supprimer un projet : DELETE /projects/:id */
export async function deleteProject(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    await handleResponse<{ message: string }>(res);
}

// ─── Contributeurs ─────────────────────────────────────────

export interface UserSearchResult {
    id: string;
    email: string;
    name: string | null;
}

/** Rechercher des utilisateurs : GET /users/search?query=... */
export async function searchUsers(query: string): Promise<UserSearchResult[]> {
    const res = await fetch(
        `${API_URL}/users/search?query=${encodeURIComponent(query)}`,
        { headers: getAuthHeaders() }
    );
    const data = await handleResponse<{ users: UserSearchResult[] }>(res);
    return data.users;
}

/** Ajouter un contributeur : POST /projects/:id/contributors */
export async function addContributor(
    projectId: string,
    email: string
): Promise<void> {
    const res = await fetch(
        `${API_URL}/projects/${projectId}/contributors`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ email, role: "CONTRIBUTOR" }),
        }
    );
    await handleResponse(res);
}

/** Retirer un contributeur : DELETE /projects/:id/contributors/:userId */
export async function removeContributor(
    projectId: string,
    userId: string
): Promise<void> {
    const res = await fetch(
        `${API_URL}/projects/${projectId}/contributors/${userId}`,
        {
            method: "DELETE",
            headers: getAuthHeaders(),
        }
    );
    await handleResponse(res);
}

// ─── Tâches ──────────────────────────────────────────────

export interface Task {
    id: string;
    title: string;
    description: string | null;
    status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    dueDate: string | null;
    projectId: string;
    creatorId: string;
    createdAt: string;
    _count?: { comments: number };
    assignees?: Array<{
        userId: string;
        user: { id: string; name: string; email: string };
    }>;
}

/** Tâches d'un projet : GET /projects/:id/tasks */
export async function getProjectTasks(projectId: string): Promise<Task[]> {
    const res = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
        headers: getAuthHeaders(),
    });
    const data = await handleResponse<{ tasks: Task[] }>(res);
    return data.tasks;
}

/** Créer une tâche : POST /projects/:id/tasks */
export async function createTask(
    projectId: string,
    data: {
        title: string;
        description?: string;
        dueDate?: string;
        priority?: string;
        assigneeIds?: string[];
    },
): Promise<Task> {
    const res = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    const result = await handleResponse<{ task: Task }>(res);
    return result.task;
}

/** Modifier une tâche : PUT /projects/:id/tasks/:taskId */
export async function updateTask(
    projectId: string,
    taskId: string,
    data: {
        title?: string;
        description?: string;
        status?: string;
        dueDate?: string;
        priority?: string;
        assigneeIds?: string[];
    }
): Promise<Task> {
    const res = await fetch(
        `${API_URL}/projects/${projectId}/tasks/${taskId}`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        }
    );
    const result = await handleResponse<{ task: Task }>(res);
    return result.task;
}

/** Supprimer une tâche : DELETE /projects/:id/tasks/:taskId */
export async function deleteTask(
    projectId: string,
    taskId: string
): Promise<void> {
    const res = await fetch(
        `${API_URL}/projects/${projectId}/tasks/${taskId}`,
        {
            method: "DELETE",
            headers: getAuthHeaders(),
        }
    );
    await handleResponse<{ message: string }>(res);
}

// ─── Commentaires ─────────────────────────────────────────

export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    taskId: string;
    author: { id: string; name: string; email: string };
}

/** Commentaires d'une tâche : GET /projects/:id/tasks/:taskId/comments */
export async function getComments(
    projectId: string,
    taskId: string
): Promise<Comment[]> {
    const res = await fetch(
        `${API_URL}/projects/${projectId}/tasks/${taskId}/comments`,
        { headers: getAuthHeaders() }
    );
    const data = await handleResponse<{ comments: Comment[] }>(res);
    return data.comments;
}

/** Ajouter un commentaire : POST /projects/:id/tasks/:taskId/comments */
export async function createComment(
    projectId: string,
    taskId: string,
    content: string
): Promise<Comment> {
    const res = await fetch(
        `${API_URL}/projects/${projectId}/tasks/${taskId}/comments`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ content }),
        }
    );
    const data = await handleResponse<{ comment: Comment }>(res);
    return data.comment;
}

/** Modifier un commentaire : PUT /projects/:id/tasks/:taskId/comments/:commentId */
export async function updateComment(
    projectId: string,
    taskId: string,
    commentId: string,
    content: string
): Promise<Comment> {
    const res = await fetch(
        `${API_URL}/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({ content }),
        }
    );
    const data = await handleResponse<{ comment: Comment }>(res);
    return data.comment;
}

/** Supprimer un commentaire : DELETE /projects/:id/tasks/:taskId/comments/:commentId */
export async function deleteComment(
    projectId: string,
    taskId: string,
    commentId: string
): Promise<void> {
    const res = await fetch(
        `${API_URL}/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
        {
            method: "DELETE",
            headers: getAuthHeaders(),
        }
    );
    await handleResponse<{ message: string }>(res);
}
