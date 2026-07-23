import { type ReactNode } from "react";
import Image from "next/image";

interface AccordionProps {
    /** Texte affiché dans le bouton quand fermé */
    label: string;
    /** État ouvert/fermé */
    open: boolean;
    /** Callback pour basculer l'état */
    onToggle: () => void;
    /** Contenu affiché quand ouvert */
    children: ReactNode;
}

function Accordion({ label, open, onToggle, children }: AccordionProps) {
    return (
        <div>
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between rounded-md border border-neutral-200 px-3 py-2 text-body-m text-neutral-400 hover:border-brand-orange-main transition-colors"
            >
                <span>{label}</span>
                <Image
                    src="/icons/arrow.svg"
                    alt=""
                    width={12}
                    height={8}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && <div className="mt-2">{children}</div>}
        </div>
    );
}

export { Accordion };
export type { AccordionProps };
