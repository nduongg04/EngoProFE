'use client'

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
				<SessionProvider>{children}</SessionProvider>
		);
}
