import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

interface QuestionNavigationProps {
  // currentQuestion: number
  // setCurrentQuestion: (question: number) => void
  // setCurrentPart: (part: number) => void
  answeredQuestions: { [key: number]: { questionNumber: number; selectedOption: string }[] }
  testData: {
    parts: {
      partNumber: number
      questions: any[]
    }[]
  }
}

export default function QuestionNavigation({
  // currentQuestion,
  // setCurrentQuestion,
  // setCurrentPart,
  answeredQuestions,
  testData,
}: QuestionNavigationProps) {
  if (!testData || !testData.parts) {
    return null
  }

  const flattenQuestions = (part: any) => {
    if (Array.isArray(part.questions)) {
      if (part.questions[0] && 'questions' in part.questions[0]) {
        // For parts 3, 4, 6, 7
        return part.questions.flatMap((cluster: any) => cluster.questions)
      }
      // For parts 1, 2, 5
      return part.questions
    }
    return []
  }

  // const handleQuestionClick = (questionNumber: number) => {
  //   setCurrentQuestion(questionNumber)
  //   const part = testData.parts.find((p: any) => 
  //     flattenQuestions(p).some((q: any) => q.questionNumber === questionNumber)
  //   )
  //   if (part) {
  //     setCurrentPart(part.partNumber)
  //   }
  // }

  return (
    <ScrollArea className="h-fit">
      <div className="space-y-4 p-2">
        {testData.parts.map((part) => {
          const questions = flattenQuestions(part)
          return (
            <div key={part.partNumber} className="space-y-2">
              <h3 className="font-semibold text-sm text-gray-600">
                Phần {part.partNumber} ({questions.length} câu)
              </h3>
              <div className="grid grid-cols-5 gap-1">
                {questions.map((question: any) => (
                  <Button
                    key={question.questionNumber}
                    size="sm"
                    variant="outline"
                    className={`p-0 w-8 h-8 ${
                      answeredQuestions[part.partNumber]?.some(q => q.questionNumber === question.questionNumber)
                        ? 'bg-[#49BBBD]/20 text-[#49BBBD]'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    // onClick={() => handleQuestionClick(question.questionNumber)}
                  >
                    {question.questionNumber}
                  </Button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}

