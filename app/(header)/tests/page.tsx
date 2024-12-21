"use client";

import Loading from "@/components/Loading";
import TestList from "@/components/TestList";
import TestSidebar from "@/components/TestSidebar";
import { getAllExam } from "@/lib/actions/exam.action";
import { showAIChat } from "@/lib/store/slice/chat_slice";
import { useAppDispatch } from "@/lib/store/store";
import { useEffect, useState } from "react";


interface ExamType {
  _id: string;
  book: string;
  examType: string;
  createdAt: string;
  updatedAt: string;
}

interface Exam {
  _id: string;
  testId: string;
  testTitle: string;
  audioUrl: string;
  examType: ExamType;
  createdAt: string;
  updatedAt: string;
}

const Tests = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showAIChat());
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const data = await getAllExam();
      console.log(data);
      setExams(data.exams);
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      setLoading(false);
    }
  };

  // Transform backend exam data to match the format expected by ExamCard
  const transformedExams = exams.map((exam) => ({
    id: exam._id,
    type: exam.examType.examType,
    title: exam.testTitle,
    maxScore: exam.examType.examType === "TOEIC" ? 990 : 9,
    questionCount: 200, // Default value, adjust as needed
    partCount: 7, // Default value, adjust as needed
    tags: [exam.examType.examType, exam.examType.book],
    time: 120, // Default value, adjust as needed
  }));

  return (
    <main className="relative flex w-full flex-1 flex-col gap-10 pt-10">
      <div className="flex flex-1 flex-col items-center gap-10 px-10">
        {/* <div className="flex w-3/5 items-center rounded-md border border-neutral-200 bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-within:outline-none focus-within:ring-1 focus-within:ring-neutral-950">
          <Input
            placeholder="Nhập từ khóa bạn muốn tìm kiếm"
            className="border-0 px-6 py-6 tracking-wide focus-visible:ring-0"
          />
          <Button className="button" >Tìm kiếm</Button>
        </div> */}
        <div className="flex w-full flex-1 gap-2 lg:gap-20">
          <TestSidebar exams={exams} />
          {loading ? (
            <div className="m-auto flex">
              <Loading />
            </div>
          ) : (
            <TestList exams={transformedExams} />
          )}
        </div>
      </div>
    </main>
  );
};
export default Tests;
