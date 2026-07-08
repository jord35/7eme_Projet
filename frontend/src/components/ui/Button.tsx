import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-brand-orange-main text-neutral-white hover:bg-brand-orange-dark focus:ring-brand-orange-main",
    secondary:
        "bg-neutral-white text-neutral-600 ring-1 ring-neutral-200 hover:bg-neutral-50 focus:ring-brand-orange-main",
    danger:
        "bg-error-main text-neutral-white hover:opacity-90 focus:ring-error-main",
    ghost:
        "bg-transparent text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-400",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", isLoading, children, className = "", disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="-ml-1 mr-2 h-4 w-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    },
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant };
