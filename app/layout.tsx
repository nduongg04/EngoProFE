import { Toaster } from "@/components/ui/toaster";
import { Roboto_Condensed } from "next/font/google";

import { AiChat } from "@/components/AIChatIcon";
import StoreProvider from "./StoreProvider";

import HeaderHomeWhite from "@/components/HeaderHomeWhite";
import { Inter } from "next/font/google";
import AuthProvider from "./AuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EngoPro - TOEIC Practice",
  description: "Practice TOEIC tests online",
};
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={robotoCondensed.className}>
      <body className="antialiased">
        <Toaster />
        <AuthProvider>
          <StoreProvider>
            <main className="flex min-h-screen flex-col">
              <HeaderHomeWhite />
              {children} <AiChat />
            </main>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
