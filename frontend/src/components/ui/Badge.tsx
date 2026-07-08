type BadgeVariant = "success" | "error" | "warning" | "info" | "neutral";

interface BadgeProps {
    variant?: BadgeVariant;
    children: React.ReactNode;
    className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
    success: "bg-success-light text-success-main",
    error: "bg-error-light text-error-main",
    warning: "bg-warning-light text-warning-main",
    info: "bg-info-light text-info-main",
    neutral: "bg-neutral-100 text-neutral-600",
};

function Badge({ variant = "neutral", children, className = "" }: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-body-xs font-medium ${variantClasses[variant]} ${className}`}
        >
            {children}
        </span>
    );
}

export { Badge };
export type { BadgeProps, BadgeVariant };
