import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";

import { AiChat } from "@/components/AIChatIcon";
import StoreProvider from "./StoreProvider";

import AuthProvider from "./AuthProvider";
import "./globals.css";

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
      <body className="antialiased">
        <Toaster />
        <AuthProvider>
          <StoreProvider>
            {children} <AiChat />
          </StoreProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
