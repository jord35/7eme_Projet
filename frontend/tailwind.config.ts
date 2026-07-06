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
                        main: "#FF8B42",
                        light: "#FFE8D9",
                        dark: "#D3590B",
                    },
                },
                neutral: {
                    50: "#F9FAFB",
                    100: "#F3F4F6",
                    200: "#E5E7EB",
                    400: "#9CA3AF",
                    600: "#6B7280",
                    800: "#1F1F1F",
                    950: "#0F0F0F",
                    white: "#FFFFFF",
                },
                success: {
                    main: "#27AE60",
                    light: "#F1FFF7",
                },
                error: {
                    main: "#EF4444",
                    light: "#FFE0E0",
                },
                info: {
                    main: "#3B82F6",
                    light: "#E0ECFF",
                },
                warning: {
                    main: "#E08D00",
                    light: "#FFF0D7",
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
