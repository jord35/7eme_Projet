"use client";

interface Member {
    id: string;
    name: string;
}

interface TaskAssigneeSelectorProps {
    members: Member[];
    selectedIds: string[];
    onToggle: (userId: string) => void;
}

function TaskAssigneeSelector({
    members,
    selectedIds,
    onToggle,
}: TaskAssigneeSelectorProps) {
    return (
        <div>
            <label className="block text-body-xs font-medium text-neutral-600">
                Assigner à
            </label>
            <div className="mt-1 flex flex-wrap gap-2">
                {members.map((member) => {
                    const isSelected = selectedIds.includes(member.id);
                    return (
                        <button
                            key={member.id}
                            type="button"
                            onClick={() => onToggle(member.id)}
                            className={`rounded-full px-3 py-1 text-body-xs font-medium transition ${isSelected
                                    ? "bg-brand-orange-main text-neutral-white"
                                    : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
                                }`}
                        >
                            {member.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export { TaskAssigneeSelector };
export type { TaskAssigneeSelectorProps };
