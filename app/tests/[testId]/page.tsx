"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authenticatedFetch } from "@/lib/actions/fetch.action";
import { getAllExamResult } from '@/lib/actions/exam.action';
import Loading from '@/components/Loading';

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
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Lỗi</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const testTitle = results.length > 0 ? results[0].exam.testTitle : "TOEIC";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#49BBBD]">Kết Quả Bài Kiểm Tra: {testTitle}</h1>
        <Button 
          onClick={handleStartTest}
          className="bg-[#49BBBD] hover:bg-[#49BBBD]/90 text-white font-bold py-2 px-4 rounded"
        >
          Bắt Đầu Bài Kiểm Tra Mới
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <p className="font-bold">{result.totalAnswered}/{result.totalQuestions}</p>
                </div>
                <div>
                  <p className="text-gray-500">Câu đúng</p>
                  <p className="font-bold">{result.correctAnswers}</p>
                </div>
                <div>
                  <p className="text-gray-500">Thời gian (phút)</p>
                  <p className="font-bold">{Math.floor(result.duration / 60)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Ngày thi</p>
                  <p className="font-bold">{new Date(result.createdAt).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleViewResult(result.exam._id, result.turn)}
                className="w-full bg-[#49BBBD] hover:bg-[#49BBBD]/90 text-white"
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

