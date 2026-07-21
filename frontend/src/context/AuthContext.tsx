"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { getProfile } from "@/lib/api";

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    loginSuccess: (token: string, user: User) => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getToken = (): string | null => {
        try {
            return sessionStorage.getItem("token");
        } catch {
            return null;
        }
    };

    const setToken = (token: string): void => {
        try {
            sessionStorage.setItem("token", token);
        } catch {
            // sessionStorage non disponible (navigation privée, etc.)
        }
    };

    const removeToken = (): void => {
        try {
            sessionStorage.removeItem("token");
        } catch {
            // sessionStorage non disponible
        }
    };

    const loginSuccess = useCallback((token: string, user: User) => {
        setToken(token);
        setUser(user);
    }, []);

    const logout = useCallback(() => {
        removeToken();
        setUser(null);
    }, []);

    const refreshUser = useCallback(async () => {
        try {
            const profile = await getProfile();
            setUser(profile);
        } catch {
            // Silently fail — le user reste inchangé
        }
    }, []);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            setIsLoading(false);
            return;
        }

        getProfile()
            .then((profile) => setUser(profile))
            .catch(() => {
                removeToken();
                setUser(null);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                loginSuccess,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };
export type { User, AuthContextType };
