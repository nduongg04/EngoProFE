// components/Part4Result.tsx
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

interface Part4Props {
  partData: {
    partNumber: number;
    instructions: string;
    questions: {
      clusterId: string;
      imageUrl?: string;
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

const Part4Result: React.FC<Part4Props> = ({ partData, answeredQuestions }) => {
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
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-md font-semibold">
          Phần {partData.partNumber}: {partData.instructions}
        </h2>
      </Card>
      <div className="space-y-8 p-4">
        {partData.questions.map((cluster) => (
          <Card key={cluster.clusterId} className="p-6">
            <div className="space-y-6">
              {cluster.imageUrl && (
                <div className="relative h-64 w-full">
                  <Image
                    src={cluster.imageUrl}
                    alt={`Cluster ${cluster.clusterId}`}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )}
              {cluster.questions.map((question) => {
                const answer = answeredQuestions.find(
                  q => q.questionNumber === question.questionNumber
                );

                return (
                  <div key={question.questionNumber} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">
                        Câu {question.questionNumber}
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
                    <p className="text-lg">{question.questionText}</p>
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
                                "flex items-center space-x-2 p-2 rounded-md",
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
                              >
                                {option.option}. {option.text}
                              </Label>
                            </div>
                          )}
                        )}
                      </div>
                    </RadioGroup>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Part4Result;