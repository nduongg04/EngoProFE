"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#49BBBD]/20 to-white p-2">
      <Card className="w-full max-w-md rounded-xl border border-[#49BBBD]/20 bg-white/95 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
        <CardHeader className="space-y-0 pb-2 pt-4 text-center">
          <div className="flex justify-center">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="mt-2 text-xl font-bold text-gray-800">Oops! Something went wrong</h2>
        </CardHeader>
        <CardContent className="pb-4 pt-0 text-center">
          <p className="mb-4 text-sm text-gray-600">
            We apologize for the inconvenience. An error occurred while processing your request.
          </p>
          <p className="mb-6 text-xs text-gray-500">
            Error: {error.message || "Unknown error"}
          </p>
          <div className="space-y-2">
            <Button
              onClick={() => reset()}
              className="h-8 w-full bg-[#49BBBD] text-sm text-white hover:bg-[#49BBBD]/90"
            >
              Try again
            </Button>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="h-8 w-full text-sm"
            >
              <ArrowLeft className="mr-2 h-3 w-3" />
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}