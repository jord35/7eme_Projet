"use client";

import { ProfileForm } from "@/components/forms/ProfileForm";

export default function ProfilePage() {
    return (
        <div className="mx-auto max-w-2xl">
            <h1 className="text-h3 font-heading text-neutral-950">Mon profil</h1>
            <p className="mt-1 text-body-s text-neutral-600">
                Gérez vos informations personnelles et votre mot de passe.
            </p>
            <div className="mt-6">
                <ProfileForm />
            </div>
        </div>
    );
}
