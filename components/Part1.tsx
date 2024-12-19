import React, { useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Part1Props {
  partData: {
    partNumber: number;
    instructions: string;
    questions: {
      questionNumber: number;
      imageUrl: string;
      options: { option: string; text: string }[];
    }[];
  };
  answeredQuestions: { questionNumber: number; selectedOption: string }[];
  onAnswerChange: (questionNumber: number, selectedOption: string) => void;
  onNextPart: () => void;
  isLastPart: boolean;
}

const Part1: React.FC<Part1Props> = React.memo(({
  partData,
  answeredQuestions,
  onAnswerChange,
  onNextPart,
  isLastPart,
}) => {
  const handleAnswer = useCallback((questionNumber: number, selectedOption: string) => {
    onAnswerChange(questionNumber, selectedOption);
  }, [onAnswerChange]);

  if (!partData || !partData.questions || !Array.isArray(partData.questions)) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">Không có dữ liệu cho phần này</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-md font-semibold">
          Phần {partData.partNumber}: {partData.instructions}
        </h2>
      </Card>
      <div >
        <div className="space-y-6 p-4">
          {partData.questions.map((questionData) => (
            <Card key={questionData.questionNumber} className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Câu {questionData.questionNumber}</h3>
                  {answeredQuestions.some((q) => q.questionNumber === questionData.questionNumber) && (
                    <span className="text-sm text-[#49BBBD]">Đã trả lời</span>
                  )}
                </div>
                <div className="relative h-64 w-full">
                  <Image
                    src={questionData.imageUrl}
                    alt={`Câu hỏi ${questionData.questionNumber}`}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                <RadioGroup
                  value={answeredQuestions.find((q) => q.questionNumber === questionData.questionNumber)?.selectedOption || ""}
                  onValueChange={(value) => handleAnswer(questionData.questionNumber, value)}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {questionData.options.map((option) => (
                      <div key={option.option} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.option}
                          id={`question-${questionData.questionNumber}-${option.option}`}
													className="data-[state=checked]:bg-[#49BBBD] data-[state=checked]:text-white data-[state=checked]:border-[#49BBBD]"
                        />
                        <Label htmlFor={`question-${questionData.questionNumber}-${option.option}`}>
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
      {!isLastPart && (
        <div className="flex justify-end mt-6">
          <Button
            onClick={onNextPart}
            className="bg-[#49BBBD] hover:bg-[#49BBBD]/90 text-white"
          >
            Phần tiếp theo
          </Button>
        </div>
      )}
    </div>
  );
});

Part1.displayName = 'Part1';

export default Part1;

