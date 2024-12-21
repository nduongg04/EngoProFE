import { Toaster } from "@/components/ui/toaster";
import { Roboto_Condensed } from "next/font/google";

import { AiChat } from "@/components/AIChatIcon";
import StoreProvider from "./StoreProvider";

import { Inter } from "next/font/google";
import AuthProvider from "./AuthProvider";
import "./globals.css";
import AddVocabProvider from "./AddVocabProvider";

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
            <AddVocabProvider>
              <main className="flex min-h-screen flex-col">
                {children} <AiChat />
              </main>
            </AddVocabProvider>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
