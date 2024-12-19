import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Part1 from "./Part1Result";
import Part2 from "./Part2Result";
import Part3 from "./Part3Result";
import Part4 from "./Part4Result";
import Part5 from "./Part5Result";
import Part6 from "./Part6Result";
import Part7 from "./Part7Result";
import AudioPlayer from "../AudioPlayer";
import QuestionNavigationResult from "./QuestionNavigationResult";

interface ResultContentProps {
  testData: any;
  result: any;
}

const ResultContent: React.FC<ResultContentProps> = ({ testData, result }) => {
  if (!testData || !testData.parts || !Array.isArray(testData.parts)) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Không thể tải dữ liệu bài thi hoặc dữ liệu không hợp lệ. Vui lòng thử
          lại sau.
        </AlertDescription>
      </Alert>
    );
  }

  const answeredQuestions = Object.values(result.answersByPart).flat();
  const [currentQuestion, setCurrentQuestion] = useState(1);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Kết quả bài thi: {result.testTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <p className="text-gray-500 text-sm">Điểm số</p>
              <p className="text-2xl font-bold">{result.score}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tổng số câu hỏi</p>
              <p className="text-2xl font-bold">{result.totalQuestions}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Số câu đã trả lời</p>
              <p className="text-2xl font-bold">{result.totalAnswered}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Số câu đúng</p>
              <p className="text-2xl font-bold">{result.correctAnswers}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {testData.audioUrl && (
        <Card className="p-6">
          <AudioPlayer
            audioUrl={testData.audioUrl}
            onAudioEnd={() => {}}
            currentPart={1}
          />
        </Card>
      )}

      {/* <QuestionNavigationResult
        questions={testData.parts.flatMap((part: any) => part.questions)}
        answeredQuestions={answeredQuestions as any}
        currentQuestion={currentQuestion}
        onQuestionClick={setCurrentQuestion}
        testData={testData}
      /> */}

      <Tabs defaultValue="1" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          {testData.parts.map((part: any) => (
            <TabsTrigger
              key={part.partNumber}
              value={part.partNumber.toString()}
            >
              Phần {part.partNumber}
            </TabsTrigger>
          ))}
        </TabsList>
        {testData.parts.map((part: any) => (
          <TabsContent key={part.partNumber} value={part.partNumber.toString()}>
            {(() => {
              const Component = [
                Part1,
                Part2,
                Part3,
                Part4,
                Part5,
                Part6,
                Part7,
              ][part.partNumber - 1];
              return (
                <Component
                  partData={part}
                  answeredQuestions={
                    result.answersByPart[part.partNumber] || []
                  }
                />
              );
            })()}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ResultContent;
