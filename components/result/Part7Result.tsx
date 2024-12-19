// components/Part7Result.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import Image from "next/image";

interface AnsweredQuestion {
  questionNumber: number;
  selectedOption: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface Part7Props {
  partData: {
    partNumber: number;
    instructions: string;
    questions: {
      passageType: 'single' | 'multi';
      passageId: string;
      imageUrl: string;
      paragraphs?: number;
      questions: {
        questionNumber: number;
        questionText: string;
        options: { option: string; text: string }[];
        correctAnswer: string;
      }[];
    }[];
  };
  answeredQuestions: AnsweredQuestion[];
}

const Part7Result: React.FC<Part7Props> = ({ partData, answeredQuestions }) => {
  const getAnswerStatus = (questionNumber: number, option: string) => {
    const question = partData.questions.find(q => q.questions.find(q => q.questionNumber === questionNumber));
    const userAnswer = answeredQuestions.find(q => q.questionNumber === questionNumber)?.selectedOption;
    
    if (option === question?.questions.find(q => q.questionNumber === questionNumber)?.correctAnswer) {
      return 'correct';
    }
    if (option === userAnswer) {
      return 'incorrect';
    }
    return 'normal';
  };

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
                {passage.questions.map((question) => {
                  const answer = answeredQuestions.find(
                    q => q.questionNumber === question.questionNumber
                  );

                  return (
                    <Card key={question.questionNumber} className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-lg">
                            Câu {question.questionNumber}: {question.questionText}
                          </h3>
                          {answer && (
                            <span className={cn(
                              "flex items-center gap-1",
                              answer.isCorrect ? "text-green-500" : "text-red-500"
                            )}>
                              {answer.isCorrect ? (
                                <><Check className="w-4 h-4" /> Đúng</>
                              ) : (
                                <><X className="w-4 h-4" /> Sai</>
                              )}
                            </span>
                          )}
                        </div>
                        <RadioGroup
                          value={answer?.selectedOption}
                          disabled
                        >
                          <div className="space-y-2">
                            {question.options.map((option) => {
                              const status = getAnswerStatus(question.questionNumber, option.option);
                              return (
                                <div
                                  key={option.option}
                                  className={cn(
                                    "flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100",
                                    status === 'correct' && "bg-green-100",
                                    status === 'incorrect' && "bg-red-100"
                                  )}
                                >
                                  <RadioGroupItem
                                    value={option.option}
                                    id={`question-${question.questionNumber}-${option.option}`}
                                    className={cn(
                                      status === 'correct' && "text-green-500 border-green-500",
                                      status === 'incorrect' && "text-red-500 border-red-500"
                                    )}
                                  />
                                  <Label
                                    htmlFor={`question-${question.questionNumber}-${option.option}`}
                                    className="flex-grow cursor-pointer"
                                  >
                                    {option.option}. {option.text}
                                  </Label>
                                </div>
                              );
                            })}
                          </div>
                        </RadioGroup>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default Part7Result;