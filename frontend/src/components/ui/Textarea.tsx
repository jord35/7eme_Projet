import { type TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, id, className = "", rows = 3, ...props }, ref) => {
        const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="mb-1 block text-body-s font-medium text-neutral-800"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={inputId}
                    rows={rows}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-body-m text-neutral-950 shadow-sm transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-0 ${error
                        ? "border-error-main focus:ring-error-main"
                        : "border-neutral-200 focus:border-brand-orange-main focus:ring-brand-orange-main"
                        } ${className}`}
                    aria-invalid={error ? "true" : undefined}
                    aria-describedby={error ? `${inputId}-error` : undefined}
                    {...props}
                />
                {error && (
                    <p id={`${inputId}-error`} className="mt-1 text-body-xs text-error-main" role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    },
);

Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaProps };
