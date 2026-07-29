"use client";

import { useAuth } from "@/context/AuthContext";
import { ProfileForm } from "@/components/forms/ProfileForm";

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <div className="ml-[100px] mr-[125px] mb-[133px] w-[calc(100%-225px)] rounded-lg bg-neutral-white px-[59px] py-[40px] shadow-sm ring-1 ring-neutral-200 max-md:ml-0 max-md:mr-0 max-md:w-full max-[375px]:px-[10px]">
            <h1 className="text-h4 font-heading text-neutral-800">Mon compte</h1>
            <p className="mt-1 text-body-m text-neutral-600">
                {user?.name || "Prénom, nom"}
            </p>
            <div className="mt-6">
                <ProfileForm />
            </div>
        </div>
    );
}
