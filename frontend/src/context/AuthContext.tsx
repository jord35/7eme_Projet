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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loginSuccess = useCallback((token: string, user: User) => {
        sessionStorage.setItem("token", token);
        setUser(user);
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem("token");
        setUser(null);
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            setIsLoading(false);
            return;
        }

        getProfile()
            .then((profile) => setUser(profile))
            .catch(() => {
                sessionStorage.removeItem("token");
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
