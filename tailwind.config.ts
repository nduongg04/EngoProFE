import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gray: "#5B5B5B",
                lightGreen: "#49BBBD",
                darkGreen: "#194F4F",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },

            boxShadow: {
                "3xl": "0 10px 40px -15px black",
                cus: "0 18px 47px 0 rgb(47,50,125,0.1)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
