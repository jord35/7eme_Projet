import Image from "next/image";

/**
 * Footer de l'application, affiché sur les pages authentifiées.
 * Logo Abricot à gauche, copyright à droite.
 */
function Footer() {
    return (
        <footer
            className="flex items-center justify-between bg-neutral-white"
            style={{ height: 68, paddingLeft: 30, paddingRight: 50 }}
        >
            <Image src="/logos/logo-black.svg" alt="Abricot" width={101} height={13} />
            <p className="text-body-m text-neutral-600">Abricot 2025</p>
        </footer>
    );
}

export { Footer };
