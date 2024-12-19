"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import TimerSubmit from "@/components/TimerSubmit";
import QuestionNavigation from "@/components/QuestionNavigation";
import TestContent from "@/components/TestContent";
import Footer from "@/components/Footer";
import SubmitModal from "@/components/SubmitModal";
import type { TestData } from "@/types/test";
import { authenticatedFetch } from "@/lib/actions/fetch.action";
import { submitExam } from "@/lib/actions/exam.action";
import TimeOutModal from "@/components/TimeOutModal";

type AnsweredQuestions = {
  [key: number]: { questionNumber: number; selectedOption: string }[];
};

const MAX_TIME_SPENT = 7200;

export default function TestPage() {
  const { testId } = useParams();
  const [currentPart, setCurrentPart] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestions>(
    {},
  );
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [testData, setTestData] = useState<TestData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(answeredQuestions);
  }, [answeredQuestions]);
  const fetchTestData = useCallback(async () => {
    try {
      const data = await authenticatedFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/exam/${testId}`,
      );
      if (data.error) {
        throw new Error("Không thể tải dữ liệu bài thi");
      }
      setTestData(data);
      setTimeRemaining(data.duration || 7200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
    } finally {
      setIsLoading(false);
    }
  }, [testId]);

  useEffect(() => {
    fetchTestData();
  }, [fetchTestData]);

  useEffect(() => {
    if (timeRemaining === null) return;

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === null || prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleSubmitExam = useCallback(
    async (testId: string, answeredQuestions: AnsweredQuestions) => {
      const timeSpent = MAX_TIME_SPENT - (timeRemaining || 0);
      const data = await submitExam(
        testId as string,
        answeredQuestions,
        timeSpent,
      );
      console.log("data submit exam", data);
    },
    [testId, answeredQuestions, timeRemaining, testData],
  );

  // Just handle "nộp bài" button, not submit exam
  const handleSubmitButton = useCallback(async () => {
    const allQuestions = Object.values(answeredQuestions).flat();
    const totalQuestions = testData
      ? testData.parts.reduce((acc, part) => acc + part.questions.length, 0)
      : 0;

    if (allQuestions.length < totalQuestions) {
      setIsSubmitModalOpen(true);
    } else {
      // Submit the test
      console.log("Bài thi đã được nộp", {
        answeredQuestions,
        testId,
      });
      await handleSubmitExam(testId as string, answeredQuestions);
    }
  }, [answeredQuestions, testData, testId]);

  const memoizedTestContent = useMemo(
    () => (
      <TestContent
        currentPart={currentPart}
        setCurrentPart={setCurrentPart}
        answeredQuestions={answeredQuestions}
        setAnsweredQuestions={setAnsweredQuestions}
        testData={testData}
        isLoading={isLoading}
      />
    ),
    [currentPart, answeredQuestions, testData, isLoading],
  );

  const memoizedQuestionNavigation = useMemo(
    () =>
      testData && (
        <QuestionNavigation
          answeredQuestions={answeredQuestions}
          testData={testData}
        />
      ),
    [currentPart, answeredQuestions, testData],
  );

  if (error) {
    return (
      <div className="bg-gray-50 flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-2 text-xl font-semibold text-red-600">Lỗi</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row">
        <section className="order-2 flex-1 p-4 md:order-1">
          {memoizedTestContent}
        </section>
        <aside className="border-gray-200 order-1 h-fit w-full border-r bg-white p-4 md:order-2 md:w-64">
          <TimerSubmit
            timeRemaining={timeRemaining || 0}
            onSubmit={handleSubmitButton}
          />
          {memoizedQuestionNavigation}
        </aside>
      </main>
      <Footer />
      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={async () => {
          console.log("Bài thi đã được nộp", {
            answeredQuestions,
            testId,
          });
          await handleSubmitExam(testId as string, answeredQuestions);
          setIsSubmitModalOpen(false);
        }}
      />
      <TimeOutModal
        isOpen={timeRemaining !== null && timeRemaining <= 0}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={async () => {
          console.log("Bài thi đã được nộp", {
            answeredQuestions,
            testId,
          });
          await handleSubmitExam(testId as string, answeredQuestions);
          setIsSubmitModalOpen(false);
        }}
      />
    </div>
  );
}
