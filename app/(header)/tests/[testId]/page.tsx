"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllExamResult } from "@/lib/actions/exam.action";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TestResult {
  _id: string;
  exam: {
    _id: string;
    testId: string;
    testTitle: string;
  };
  score: number;
  totalQuestions: number;
  totalAnswered: number;
  correctAnswers: number;
  duration: number;
  turn: number;
  createdAt: string;
  updatedAt: string;
}

export default function TestResultsPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { testId } = useParams();
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getAllExamResult(testId as string);
        if (data.error) {
          throw new Error("Không thể tải kết quả bài thi");
        }
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [testId]);

  const handleStartTest = () => {
    router.push(`/tests/${testId}/do`);
  };

  const handleViewResult = (testId: string, turn: number) => {
    router.push(`/tests/result/${testId}?turn=${turn}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-2 text-xl font-semibold text-red-600">Lỗi</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const testTitle = results.length > 0 ? results[0].exam.testTitle : "TOEIC";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#49BBBD]">
          Kết Quả Bài Kiểm Tra: {testTitle}
        </h1>
        <Button
          onClick={handleStartTest}
          className="rounded bg-[#49BBBD] px-4 py-2 font-bold text-white hover:bg-[#49BBBD]/90"
        >
          Bắt Đầu Bài Kiểm Tra Mới
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <Card key={result._id} className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">Lần thử: {result.turn}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Điểm số</p>
                  <p className="font-bold">{result.score}</p>
                </div>
                <div>
                  <p className="text-gray-500">Câu hỏi</p>
                  <p className="font-bold">
                    {result.totalAnswered}/{result.totalQuestions}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Câu đúng</p>
                  <p className="font-bold">{result.correctAnswers}</p>
                </div>
                <div>
                  <p className="text-gray-500">Thời gian (phút)</p>
                  <p className="font-bold">
                    {Math.floor(result.duration / 60)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Ngày thi</p>
                  <p className="font-bold">
                    {new Date(result.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleViewResult(result.exam._id, result.turn)}
                className="w-full bg-[#49BBBD] text-white hover:bg-[#49BBBD]/90"
              >
                Xem Chi Tiết
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
