"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import Loading from "./Loading";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import Part4 from "./Part4";
import Part5 from "./Part5";
import Part6 from "./Part6";
import Part7 from "./Part7";

interface TestContentProps {
  currentPart: number;
  setCurrentPart: (part: number) => void;
  answeredQuestions: {
    [key: number]: { questionNumber: number; selectedOption: string }[];
  };
  setAnsweredQuestions: React.Dispatch<
    React.SetStateAction<{
      [key: number]: { questionNumber: number; selectedOption: string }[];
    }>
  >;
  testData: any;
  isLoading: boolean;
}

const TestContent: React.FC<TestContentProps> = React.memo(
  ({
    currentPart,
    setCurrentPart,
    answeredQuestions,
    setAnsweredQuestions,
    testData,
    isLoading,
  }) => {
    const [audioEnded, setAudioEnded] = useState<{
      [key: number]: boolean;
    }>({});
    const [isPlaying, setIsPlaying] = useState(false);

    const handleTabChange = useCallback(
      (value: string) => {
        setCurrentPart(parseInt(value));
      },
      [setCurrentPart],
    );

    const handleAudioEnded = useCallback(() => {
      setAudioEnded((prev) => ({
        ...prev,
        [currentPart]: true,
      }));
      setIsPlaying(false);
    }, [currentPart]);

    const handlePlayPause = useCallback(() => {
      setIsPlaying((prev) => !prev);
    }, []);

    const handleAnswerChange = useCallback(
      (partNumber: number, questionNumber: number, selectedOption: string) => {
        setAnsweredQuestions((prev) => {
          const updatedPart = [
            ...(prev[partNumber]?.filter(
              (q) => q.questionNumber !== questionNumber,
            ) || []),
            { questionNumber, selectedOption },
          ];
          return {
            ...prev,
            [partNumber]: updatedPart,
          };
        });
      },
      [setAnsweredQuestions],
    );

    useEffect(() => {
      if (testData && testData.parts) {
        const initialAudioState = testData.parts.reduce(
          (acc: { [key: number]: boolean }, part: any) => {
            if (part.partNumber <= 4) {
              acc[part.partNumber] = false;
            }
            return acc;
          },
          {} as { [key: number]: boolean },
        );
        setAudioEnded(initialAudioState);
      }
    }, [testData]);

    const memoizedParts = useMemo(() => {
      if (!testData || !testData.parts || !Array.isArray(testData.parts)) {
        return null;
      }

      return testData.parts.map((part: any) => {
        const partNumber = part.partNumber;
        const PartComponent = [Part1, Part2, Part3, Part4, Part5, Part6, Part7][
          partNumber - 1
        ];

        return (
          <TabsContent key={partNumber} value={partNumber.toString()}>
            <PartComponent
              partData={part}
              answeredQuestions={answeredQuestions[partNumber] || []}
              onAnswerChange={(questionNumber, selectedOption) =>
                handleAnswerChange(partNumber, questionNumber, selectedOption)
              }
              onNextPart={() => setCurrentPart(partNumber + 1)}
              isLastPart={partNumber === 7}
            />
          </TabsContent>
        );
      });
    }, [testData, answeredQuestions, handleAnswerChange, setCurrentPart]);

    if (isLoading) {
      return <Loading />;
    }

    if (!testData || !testData.parts || !Array.isArray(testData.parts)) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Không thể tải dữ liệu bài thi hoặc dữ liệu không hợp lệ. Vui lòng
            thử lại sau.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="space-y-4">
        <AudioPlayer
          currentPart={currentPart}
          audioUrl={testData.audioUrl}
          onAudioEnd={handleAudioEnded}
          key="audio-player"
          className={`${currentPart > 4 && "hidden"}`}
        />
        <Tabs
          value={currentPart.toString()}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="sticky top-[70px] z-30 bg-white shadow-md">
            <TabsList className="grid w-full grid-cols-7">
              {testData.parts.map((part: any) => (
                <TabsTrigger
                  key={part.partNumber}
                  value={part.partNumber.toString()}
                  // disabled={part.partNumber <= 4 && !audioEnded[part.partNumber]}
                >
                  Phần {part.partNumber}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {memoizedParts}
        </Tabs>
      </div>
    );
  },
);

TestContent.displayName = "TestContent";

export default TestContent;
