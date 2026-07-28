"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Spinner } from "@/components/ui/Spinner";

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex w-full flex-1 pt-[57px]">
                {children}
            </main>
            <Footer />
        </div>
    );
}
