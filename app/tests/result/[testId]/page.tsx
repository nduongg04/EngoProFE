"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import QuestionNavigationResult from "@/components/result/QuestionNavigationResult";
import ResultContent from "@/components/result/ResultContent";
import { getExamResult } from "@/lib/actions/exam.action";
import { authenticatedFetch } from "@/lib/actions/fetch.action";
import type { TestData } from "@/types/test";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type AnsweredQuestions = {
  [key: number]: { questionNumber: number; selectedOption: string }[];
};

export default function TestPage() {
  const { testId } = useParams();
  const searchParams = useSearchParams();
  const [testData, setTestData] = useState<TestData | undefined>(undefined);
  const [result, setResult] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestResult = useCallback(
    async (turn: number) => {
      try {
        const data = await getExamResult(testId as string, turn);
        console.log(data);
        if (data.error) {
          throw new Error("Không thể tải kết quả bài thi");
        }
        setResult(data.data);
        // Fetch test data (you may need to adjust this based on your API)
        const testData = await authenticatedFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/exam/${testId}`,
        );
        if (testData.error) {
          throw new Error("Không thể tải dữ liệu bài thi");
        }
        setTestData(testData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
      } finally {
        setIsLoading(false);
      }
    },
    [testId],
  );

  useEffect(() => {
    const turn = Number(searchParams.get("turn"));
    if (turn) {
      fetchTestResult(turn);
    } else {
      throw new Error("Turn phải là số");
    }
  }, [fetchTestResult]);

  if (isLoading) {
    return <Loading />;
  }

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
          <ResultContent testData={testData} result={result} />
        </section>
        <aside className="border-gray-200 order-1 h-fit w-full border-r bg-white p-4 md:order-2 md:w-64">
          <QuestionNavigationResult testData={testData!} result={result} />
        </aside>
      </main>
      <Footer />
    </div>
  );
}
