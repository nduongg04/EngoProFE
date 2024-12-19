export interface VocabularySet {
  _id: string
  englishWord: string
  definition: string
  wordType: string
  example: string[]
  subject: string | null
  createdAt: string
  updatedAt: string
}

export interface VocabularyList {
  _id: string
  title: string
  totalWords: number
  rememberedWords: number
  needToLearnWords: number
  date: string
  vocabularies: VocabularySet[]
}

export interface VocabularyWord {
  id: string
  englishWord: string
  definition: string
  wordType: string
  examples: string[]
}

export interface MatchCard {
  id: string
  content: {
    englishWord?: string
    wordType?: string
    example?: string[]
    definition?: string
  }
  type: 'english' | 'vietnamese'
  isMatched: boolean
  isIncorrect: boolean
  isSelected: boolean
  originalId: string
}

