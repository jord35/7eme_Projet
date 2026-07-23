"use client";

import { useAuth } from "@/context/AuthContext";
import { ProfileForm } from "@/components/forms/ProfileForm";

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <div className="mx-auto max-w-2xl">
            <h1 className="text-h3 font-heading text-neutral-950">Mon compte</h1>
            <p className="mt-1 text-body-s text-neutral-600">
                {user?.name || "Prénom, nom"}
            </p>
            <div className="mt-6">
                <ProfileForm />
            </div>
        </div>
    );
}
