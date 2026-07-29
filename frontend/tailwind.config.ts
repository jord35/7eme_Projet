import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    orange: {
                        main: "#C74C00",
                        light: "#FFE8D9",
                        dark: "#C2510A",
                        vibrant: "#FF8B42",
                        badge: "#B34B09",
                    },
                },
                neutral: {
                    50: "#F9FAFB",
                    100: "#F3F4F6",
                    200: "#E5E7EB",
                    400: "#9CA3AF",
                    600: "#616775",
                    800: "#1F1F1F",
                    950: "#0F0F0F",
                    white: "#FFFFFF",
                },
                success: {
                    main: "#27AE60",
                    light: "#F1FFF7",
                    badge: "#1D8148",
                },
                error: {
                    main: "#E71313",
                    light: "#FFE0E0",
                    badge: "#C03030",
                },
                info: {
                    main: "#3B82F6",
                    light: "#E0ECFF",
                },
                warning: {
                    main: "#E08D00",
                    light: "#FFF0D7",
                    badge: "#996300",
                },
            },
            fontFamily: {
                heading: ["Manrope", "sans-serif"],
                body: ["Inter", "sans-serif"],
            },
            fontSize: {
                "h1": ["40px", { fontWeight: "700" }],
                "h2": ["32px", { fontWeight: "700" }],
                "h3": ["28px", { fontWeight: "600" }],
                "h4": ["24px", { fontWeight: "600" }],
                "h5": ["18px", { fontWeight: "600" }],
                "body-l": ["18px", { fontWeight: "400" }],
                "body-m": ["16px", { fontWeight: "400" }],
                "body-s": ["14px", { fontWeight: "400" }],
                "body-xs": ["12px", { fontWeight: "400" }],
                "body-2xs": ["10px", { fontWeight: "400" }],
                "caption-l": ["14px", { fontWeight: "400", letterSpacing: "0.02em", textTransform: "uppercase" }],
                "caption-m": ["12px", { fontWeight: "400", letterSpacing: "0.02em", textTransform: "uppercase" }],
                "caption-s": ["10px", { fontWeight: "400", letterSpacing: "0.02em", textTransform: "uppercase" }],
            },
        },
    },
    plugins: [],
};

export default config;
