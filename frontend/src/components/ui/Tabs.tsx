"use client";

/**
 * Onglet individuel dans la barre de navigation.
 */
interface Tab {
    key: string;
    label: string;
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
 *   tabs={[{ key: "list", label: "Liste" }, { key: "kanban", label: "Kanban" }]}
 *   activeTab={viewMode}
 *   onChange={setViewMode}
 * />
 */
function Tabs({ tabs, activeTab, onChange }: TabsProps) {
    return (
        <div className="mb-6 flex gap-2 border-b border-neutral-200">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onChange(tab.key)}
                    className={`px-4 py-2 text-body-s font-medium transition-colors border-b-2 -mb-px ${activeTab === tab.key
                            ? "border-brand-orange-main text-brand-orange-main"
                            : "border-transparent text-neutral-400 hover:text-neutral-600"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

export { Tabs };
export type { TabsProps, Tab };
