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
