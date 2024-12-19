"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface TimerProps {
  initialTime: number // in seconds
}

export function Timer({ initialTime }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="flex items-center gap-2 px-4 py-2">
      <span className="text-sm font-medium">Thời gian còn lại:</span>
      <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
    </Card>
  )
}

