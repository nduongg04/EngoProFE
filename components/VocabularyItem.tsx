'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Volume2 } from 'lucide-react'
import { useState } from "react"

interface VocabularyItemProps {
  word: {
    id: string
    englishWord: string
    definition: string
    examples: string[]
  }
}

export default function VocabularyItem({ word }: VocabularyItemProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // const playAudio = (accent: 'UK' | 'US') => {
  //   setIsPlaying(true)
  //   // Implement audio playback logic here
  //   setTimeout(() => setIsPlaying(false), 1000)
		
  // }

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <span className="font-medium text-lg">{word.englishWord}</span>
            {/* <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-[#49BBBD]"
                onClick={() => playAudio('UK')}
                disabled={isPlaying}
              >
                <Volume2 className="h-4 w-4 mr-1" />
                UK
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-[#49BBBD]"
                onClick={() => playAudio('US')}
                disabled={isPlaying}
              >
                <Volume2 className="h-4 w-4 mr-1" />
                US
              </Button>
            </div> */}
          </div>

          <div className="space-y-2">
            <div>
              <span className="font-medium">Định nghĩa:</span>
              <p className="text-gray-600">{word.definition}</p>
            </div>

            <div>
              <span className="font-medium">Ví dụ:</span>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {word.examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-[#49BBBD]"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}

