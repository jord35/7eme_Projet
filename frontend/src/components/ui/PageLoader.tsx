"use client";

import { Spinner } from "@/components/ui/Spinner";

/**
 * Indicateur de chargement pleine page.
 * Affiche un spinner centré verticalement.
 *
 * @example
 * if (isLoading) return <PageLoader />;
 */
function PageLoader() {
    return (
        <div className="flex min-h-[50vh] items-center justify-center">
            <Spinner size="lg" />
        </div>
    );
}

export { PageLoader };
