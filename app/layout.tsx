import type { Metadata } from "next";
import "./globals.css";
import { Roboto_Condensed } from "next/font/google";

export const metadata: Metadata = {
    title: "EngoPro",
    description: "AI-powered English learning website",
};

const robotoCondensed = Roboto_Condensed({
	subsets: ["latin"],

});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={robotoCondensed.className}>
            <body className="antialiased">{children}</body>
        </html>
    );
}
