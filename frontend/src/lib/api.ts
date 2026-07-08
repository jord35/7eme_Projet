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

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Erreur inconnue" }));
        throw new Error(body.error || `Erreur ${res.status}`);
    }
    const json = await res.json();
    return json.data as T;
}

function getAuthHeaders(): Record<string, string> {
    const token = sessionStorage.getItem("token");
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}

// ─── Auth ────────────────────────────────────────────────

export async function login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    return handleResponse<LoginResponse>(res);
}

export async function register(
    email: string,
    password: string,
    name: string,
): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
    });
    return handleResponse<LoginResponse>(res);
}

export async function getProfile(): Promise<User> {
    const res = await fetch(`${API_URL}/auth/profile`, {
        headers: getAuthHeaders(),
    });
    const data = await handleResponse<{ user: User }>(res);
    return data.user;
}

export async function updateProfile(data: { name?: string; email?: string }): Promise<User> {
    const res = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse<User>(res);
}

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

export interface AssignedTask {
    id: string;
    title: string;
    description: string | null;
    status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    dueDate: string | null;
    project: { id: string; name: string };
    _count: { comments: number };
}

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

export async function getProjects(): Promise<{ projects: Project[] }> {
    const res = await fetch(`${API_URL}/projects`, {
        headers: getAuthHeaders(),
    });
    return handleResponse<{ projects: Project[] }>(res);
}

export async function getProject(id: string): Promise<Project> {
    const res = await fetch(`${API_URL}/projects/${id}`, {
        headers: getAuthHeaders(),
    });
    const data = await handleResponse<{ project: Project }>(res);
    return data.project;
}

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

export async function deleteProject(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    await handleResponse<{ message: string }>(res);
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

export async function getProjectTasks(projectId: string): Promise<Task[]> {
    const res = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
        headers: getAuthHeaders(),
    });
    const data = await handleResponse<{ tasks: Task[] }>(res);
    return data.tasks;
}

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
