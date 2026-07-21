"use client";

import Image from "next/image";

/**
 * Onglet individuel dans la barre de navigation.
 */
interface Tab {
    key: string;
    label: string;
    icon: string;
}

/**
 * Props du composant Tabs.
 */
interface TabsProps {
    /** Liste des onglets à afficher */
    tabs: Tab[];
    /** Clé de l'onglet actif */
    activeTab: string;
    /** Callback appelé quand l'utilisateur clique sur un onglet */
    onChange: (key: string) => void;
}

/**
 * Barre d'onglets réutilisable.
 * Utilisée dans le dashboard (Liste/Kanban) et le détail projet (Liste/Calendrier).
 *
 * @example
 * <Tabs
 *   tabs={[
 *     { key: "list", label: "Liste", icon: "/icons/list.svg" },
 *     { key: "kanban", label: "Kanban", icon: "/icons/kanban.svg" }
 *   ]}
 *   activeTab={viewMode}
 *   onChange={setViewMode}
 * />
 */
function Tabs({ tabs, activeTab, onChange }: TabsProps) {
    return (
        <div className="mb-6 flex gap-2">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                    <button
                        key={tab.key}
                        onClick={() => onChange(tab.key)}
                        className={`flex items-center gap-2 rounded-md px-4 py-2 text-body-s font-medium transition-colors ${isActive
                            ? "bg-[#FFE8D9]"
                            : "bg-neutral-white"
                            }`}
                    >
                        <Image src={tab.icon} alt="" width={16} height={16} className="text-brand-orange-dark" />
                        <span className="text-brand-orange-dark">{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

export { Tabs };
export type { TabsProps, Tab };
