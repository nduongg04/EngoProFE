'use client'

import { Card, CardContent } from "@/components/ui/card"
import { VocabularySet } from "@/types/vocabulary"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "./ui/button"

interface VocabularyItemProps {
  word: VocabularySet
  onEdit?: (word: VocabularySet) => void
  onDelete?: (id: string) => void
}

export default function VocabularyItem({ word, onEdit, onDelete }: VocabularyItemProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium">
              {word.englishWord} <span className="text-sm text-muted-foreground">({word.wordType})</span>
            </h3>
            <p className="mt-2 text-muted-foreground">{word.definition}</p>
            {word.example && word.example.length > 0 && (
              <div className="mt-4">
                <p className="font-medium">Examples:</p>
                <ul className="ml-4 mt-1 list-disc space-y-1">
                  {word.example.map((example, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-[#49BBBD]/10"
                onClick={() => onEdit(word)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-destructive/10 group"
                onClick={() => onDelete(word._id)}
              >
                <Trash2 className="h-4 w-4 group-hover:text-red-500 transition-all duration-300" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

