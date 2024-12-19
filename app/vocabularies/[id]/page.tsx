'use client'

import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import VocabularyItem from "@/components/VocabularyItem"
import { BookOpen, GraduationCap } from "lucide-react"
import HeaderHomeWhite from "@/components/HeaderHomeWhite"
import { CreateWordForm } from "@/components/CreateWordForm"

interface PageProps {
  params: {
    id: string
  }
}

export default function VocabularyListPage({ params }: PageProps) {
  // Mock data - replace with actual data fetching
  const vocabularyList = {
    title: "New words 1",
    totalWords: 100,
    words: [
      {
        id: "1",
        englishWord: "vocabulary (n)",
        definition: "all the words that a person knows or uses",
        examples: [
          "to have a wide/limited vocabulary",
          "your active vocabulary (= the words that you use)",
          "your passive vocabulary (= the words that you understand but don't use)",
          "Reading will increase your vocabulary.",
        ],
      },
      {
        id: "1",
        englishWord: "vocabulary (n)",
        definition: "all the words that a person knows or uses",
        examples: [
          "to have a wide/limited vocabulary",
          "your active vocabulary (= the words that you use)",
          "your passive vocabulary (= the words that you understand but don't use)",
          "Reading will increase your vocabulary.",
        ],
      },
      {
        id: "1",
        englishWord: "vocabulary (n)",
        definition: "all the words that a person knows or uses",
        examples: [
          "to have a wide/limited vocabulary",
          "your active vocabulary (= the words that you use)",
          "your passive vocabulary (= the words that you understand but don't use)",
          "Reading will increase your vocabulary.",
        ],
      },
    ],
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col">
      <HeaderHomeWhite />
      <div className="container flex flex-col justify-between gap-6 px-10 py-6 xl:flex-row">
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl font-semibold">
              {vocabularyList.title} - {vocabularyList.totalWords} từ
            </h1>
            <CreateWordForm />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {vocabularyList.words.map((word) => (
              <VocabularyItem key={word.id} word={word} />
            ))}
          </div>
        </div>
        <div className="space-y-4 md:col-span-4">
          <Button className="h-12 w-full bg-[#49BBBD] text-white hover:bg-[#49BBBD]/90">
            <BookOpen className="mr-2 h-5 w-5" />
            Flashcards
          </Button>

          <Button className="h-12 w-full bg-[#49BBBD] text-white hover:bg-[#49BBBD]/90">
            <GraduationCap className="mr-2 h-5 w-5" />
            Bài tập
          </Button>

          <Card className="max-w-fit p-4">
            <Calendar
              mode="single"
              className="w-full"
              selected={new Date()}
              modifiers={{
                booked: [
                  new Date(),
                  {
                    from: new Date(2024, 10, 15),
                    to: new Date(2024, 10, 20),
                  },
                ],
              }}
              modifiersStyles={{
                booked: {
                  backgroundColor: "#49BBBD",
                  color: "white",
                },
              }}
            />
          </Card>
        </div>
      </div>
    </main>
  );
}

