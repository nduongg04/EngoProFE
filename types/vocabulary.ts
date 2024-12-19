export interface VocabularySet {
  _id: string
  englishWord: string
  vietnameseWord: string
  subject: string
  createdAt: string
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
