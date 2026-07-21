/**
 * Petit badge circulaire pour afficher un nombre (ex: compteur de tâches).
 */
interface BadgeCountProps {
    count: number;
}

function BadgeCount({ count }: BadgeCountProps) {
    return (
        <span className="inline-flex items-center justify-center rounded-full bg-neutral-200 px-2 py-0.5 text-body-xs font-medium text-neutral-600">
            {count}
        </span>
    );
}

export { BadgeCount };
export type { BadgeCountProps };
