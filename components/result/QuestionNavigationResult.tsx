import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface AnsweredQuestion {
  questionNumber: number;
  selectedOption: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface QuestionNavigationResultProps {
  testData: {
    parts: {
      partNumber: number;
      questions: any[];
    }[];
  };
  result: {
    answersByPart: {
      [key: string]: AnsweredQuestion[];
    };
  };
}

export default function QuestionNavigationResult({
  testData,
  result,
}: QuestionNavigationResultProps) {
  const flattenQuestions = (part: any) => {
    if (Array.isArray(part.questions)) {
      if (part.questions[0] && "questions" in part.questions[0]) {
        return part.questions.flatMap((cluster: any) => cluster.questions);
      }
      return part.questions;
    }
    return [];
  };

  const getAnswerStatus = (partNumber: number, questionNumber: number) => {
    const answer = result.answersByPart[partNumber]?.find(
      (a) => a.questionNumber === questionNumber,
    );
    return answer
      ? { answered: true, isCorrect: answer.isCorrect }
      : { answered: false, isCorrect: false };
  };

  return (
    <ScrollArea className="h-fit">
      <div className="space-y-4 p-2">
        {testData.parts.map((part) => {
          const partQuestions = flattenQuestions(part);
          return (
            <div key={part.partNumber} className="space-y-2">
              <h3 className="text-gray-600 text-sm font-semibold">
                Phần {part.partNumber} ({partQuestions.length} câu)
              </h3>
              <div className="grid grid-cols-5 gap-1">
                {partQuestions.map((question: any) => {
                  const { answered, isCorrect } = getAnswerStatus(
                    part.partNumber,
                    question.questionNumber,
                  );

                  return (
                    <Button
                      key={question.questionNumber}
                      size="sm"
                      variant="outline"
                      className={cn(
                        "h-8 w-8 p-0",
                        answered && isCorrect
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : answered && !isCorrect
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                      )}
                    >
                      {question.questionNumber}
                    </Button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
