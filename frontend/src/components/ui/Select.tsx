import { type SelectHTMLAttributes, forwardRef } from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, placeholder, id, className = "", ...props }, ref) => {
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
                <select
                    ref={ref}
                    id={inputId}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-body-m text-neutral-950 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${error
                        ? "border-error-main focus:ring-error-main"
                        : "border-neutral-200 focus:border-brand-orange-main focus:ring-brand-orange-main"
                        } ${className}`}
                    aria-invalid={error ? "true" : undefined}
                    aria-describedby={error ? `${inputId}-error` : undefined}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p id={`${inputId}-error`} className="mt-1 text-body-xs text-error-main" role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    },
);

Select.displayName = "Select";

export { Select };
export type { SelectProps, SelectOption };
