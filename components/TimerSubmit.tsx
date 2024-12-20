import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface TimerSubmitProps {
  timeRemaining: number
  onSubmit: () => void
}

export default function TimerSubmit({ timeRemaining, onSubmit }: TimerSubmitProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="mb-2 text-center sticky top-[70px] z-40 bg-white">
      <Button onClick={onSubmit} className="w-full mb-2 bg-[#49BBBD] hover:bg-[#49BBBD]/90">
        Nộp Bài
      </Button>
      <div className={`text-lg font-bold ${timeRemaining <= 300 ? 'text-red-500 animate-pulse' : ''}`}>
        {timeRemaining <= 300 && <AlertCircle className="inline mr-2" />}
        {formatTime(timeRemaining)}
      </div>
    </div>
  )
}

