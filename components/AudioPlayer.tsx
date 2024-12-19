import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AudioPlayerProps {
  audioUrl: string
  onAudioEnd: () => void
	className?: string;
	currentPart: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, onAudioEnd, className, currentPart }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  //const audioRef = useRef<HTMLAudioElement | null>(null) //Removed

  const handleLoadedData = useCallback(() => {
    console.log("Audio loaded successfully")
  }, [])

  const handleError = useCallback((e: Event) => {
    console.error("Error loading audio:", e);
    if (e instanceof Event && e.target instanceof HTMLAudioElement) {
      console.error("Audio error details:", e.target.error);
    }
    setError("Không thể tải audio. Vui lòng kiểm tra kết nối mạng và thử lại.");
  }, []);

	useEffect(() => {
		if (currentPart > 4) {
			audioRef.current?.pause();
			setIsPlaying(false);
		}
	}, [currentPart]);

  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false)
      onAudioEnd()
    }

    audioRef.current?.addEventListener('ended', handleEnded)
    audioRef.current?.addEventListener('loadeddata', handleLoadedData)
    audioRef.current?.addEventListener('error', handleError)

    // return () => {
    //   audio.removeEventListener('ended', handleEnded)
    //   audio.removeEventListener('loadeddata', handleLoadedData)
    //   audio.removeEventListener('error', handleError)
    //   audio.pause()
    // }
  }, [audioRef, handleLoadedData, handleError, onAudioEnd])

  //const handleStartAudio = useCallback(() => { //Removed
  //  if (audioRef.current) {
  //    audioRef.current.play()
  //      .then(() => {
  //        console.log('Audio started playing successfully')
  //        setIsPlaying(true)
  //      })
  //      .catch((error) => {
  //        console.error("Error playing audio:", error)
  //        setError("Không thể phát audio. Vui lòng thử lại.")
  //      })
  //  }
  //}, [audioRef]) //Removed

  const handleToggleAudio = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      audioRef.current?.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Error playing audio:", error)
          setError("Không thể phát audio. Vui lòng thử lại.")
        })
    }
  }, [audioRef, isPlaying])

	useEffect(() => {
		console.log("AudioPlayer", isPlaying);
	}, [isPlaying]);

  return (
    <div className={cn("bg-white p-4 rounded-lg shadow mb-4", className)}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
			<audio ref={audioRef} src={audioUrl} controls className="pointer-events-none opacity-90 w-full" />
      <Button 
        onClick={handleToggleAudio}
        className="w-full bg-[#49BBBD] hover:bg-[#49BBBD]/90 text-white"
      >
        {isPlaying ? 'Tạm dừng' : 'Bắt đầu'}
      </Button>
    </div>
  )
}

export default React.memo(AudioPlayer)

