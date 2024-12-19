import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface Part7Props {
  partData: {
    partNumber: number
    instructions: string
    questions: {
      passageType: 'single' | 'multi'
      passageId: string
      imageUrl: string
      paragraphs?: number
      questions: {
        questionNumber: number
        questionText: string
        options: { option: string; text: string }[]
      }[]
    }[]
  }
  answeredQuestions: { questionNumber: number; selectedOption: string }[]
	onAnswerChange: (questionNumber: number, selectedOption: string) => void;
}

export default function Part7({
  partData,
  answeredQuestions,
	onAnswerChange,
}: Part7Props) {
  if (!partData || !partData.questions || !Array.isArray(partData.questions) || partData.questions.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">Không có dữ liệu cho phần này</p>
      </Card>
    )
  }

  const handleAnswer = (questionNumber: number, value: string) => {
    onAnswerChange(questionNumber, value);
  }

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-md font-semibold">
          Phần {partData.partNumber}: {partData.instructions}
        </h2>
      </Card>

      <Card className="space-y-6 p-6">
        

        {partData.questions.map((passage) => (
          <div key={passage.passageId} className="space-y-6 border-b pb-6 last:border-b-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="w-full rounded-md border p-4">
                <div className="space-y-4">
                  <div className="relative h-full w-full min-h-[400px]">
                    <Image
                      src={passage.imageUrl}
                      alt="Đoạn văn"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                    />
                  </div>
                  {passage.passageType === 'multi' && (
                    <p className="text-sm text-gray-500">
                      Đoạn văn này có {passage.paragraphs} đoạn.
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {passage.questions.map((question) => (
                  <Card key={question.questionNumber} className="p-4">
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">
                        Câu {question.questionNumber}: {question.questionText}
                      </h3>
                      <RadioGroup
                        onValueChange={(value) => handleAnswer(question.questionNumber, value)}
												value={answeredQuestions.find(q => q.questionNumber === question.questionNumber)?.selectedOption || ''}
                      >
                        <div className="space-y-2">
                          {question.options.map((option) => (
                            <div
                              key={option.option}
                              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                            >
                              <RadioGroupItem
                                value={option.option}
                                id={`question-${question.questionNumber}-${option.option}`}
																className="data-[state=checked]:bg-[#49BBBD] data-[state=checked]:text-white data-[state=checked]:border-[#49BBBD]"
                              />
                              <Label
                                htmlFor={`question-${question.questionNumber}-${option.option}`}
                                className="flex-grow cursor-pointer"
                              >
                                {option.option}. {option.text}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

