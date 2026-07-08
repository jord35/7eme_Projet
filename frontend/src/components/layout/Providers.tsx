"use client";

import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import type { ReactNode } from "react";

function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            {children}
            <Toaster position="top-right" richColors />
        </AuthProvider>
    );
}

export { Providers };
