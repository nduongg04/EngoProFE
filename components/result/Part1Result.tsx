import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface Part1Props {
  partData: {
    partNumber: number;
    instructions: string;
    questions: {
      questionNumber: number;
      imageUrl: string;
      options: { option: string; text: string }[];
      correctAnswer: string;
    }[];
  };
  answeredQuestions: { questionNumber: number; selectedOption: string }[];
}

const Part1Result: React.FC<Part1Props> = ({ partData, answeredQuestions }) => {
  const getAnswerStatus = (questionNumber: number, option: string) => {
    const question = partData.questions.find(q => q.questionNumber === questionNumber);
    const userAnswer = answeredQuestions.find(q => q.questionNumber === questionNumber)?.selectedOption;
    
    if (option === question?.correctAnswer) {
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
      <div className="space-y-6 p-4">
        {partData.questions.map((questionData) => (
          <Card key={questionData.questionNumber} className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  Câu {questionData.questionNumber}
                </h3>
                {answeredQuestions.find(
                  (q) => q.questionNumber === questionData.questionNumber
                )?.selectedOption ? answeredQuestions.find(
                  (q) => q.questionNumber === questionData.questionNumber
                )?.selectedOption === questionData.correctAnswer ? (
                  <span className="text-green-500 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Đúng
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center gap-1">
                    <X className="w-4 h-4" /> Sai
                  </span>
                ) : null}
              </div>
              <div className="relative h-64 w-full">
                <Image
                  src={questionData.imageUrl}
                  alt={`Question ${questionData.questionNumber}`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>

              <RadioGroup
                value={answeredQuestions.find(
                  (q) => q.questionNumber === questionData.questionNumber
                )?.selectedOption}
                disabled
              >
                <div className="grid grid-cols-2 gap-4">
                  {questionData.options.map((option) => {
                    const status = getAnswerStatus(questionData.questionNumber, option.option);
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
                          id={`question-${questionData.questionNumber}-${option.option}`}
                          className={cn(
                            status === 'correct' && "text-green-500 border-green-500",
                            status === 'incorrect' && "text-red-500 border-red-500"
                          )}
                        />
                        <Label
                          htmlFor={`question-${questionData.questionNumber}-${option.option}`}
                        >
                          {option.option}. {option.text}
                        </Label>
                      </div>
                    )}
                  )}
                </div>
              </RadioGroup>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Part1Result;

