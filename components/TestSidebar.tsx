"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

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

interface TestSidebarProps {
  exams: Exam[];
}

const TestSidebar = ({ exams }: TestSidebarProps) => {
  const [shownExamType, setShownExamType] = useState<{
    [key: string]: boolean;
  }>({});
  const [shownBookId, setShownBook] = useState("");

  // Group exams by exam type and book
  const groupedExams = exams.reduce((acc, exam) => {
    const examType = exam.examType.examType;
    const book = exam.examType.book;
    
    if (!acc[examType]) {
      acc[examType] = new Set();
    }
    acc[examType].add(book);
    
    return acc;
  }, {} as { [key: string]: Set<string> });

  return (
    <div className="test-sidebar bg-gray-200 flex h-fit flex-col gap-2 rounded-md border border-[#B4B4B4]/60 bg-[#D8D8D8]/30 py-4 pl-5 pr-5">
      {Object.entries(groupedExams).map(([examType, books]) => (
        <div key={examType} className="flex flex-col gap-2">
          <div
            className="transition-primary group flex min-w-32 cursor-pointer items-center justify-between text-lg font-medium hover:text-lightGreen"
            onClick={() => {
              setShownExamType({
                ...shownExamType,
                [examType]: !shownExamType[examType],
              });
            }}
          >
            {examType}
            <svg
              width="17"
              height="10"
              viewBox="0 0 17 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "transition-all duration-300 ease-in-out",
                shownExamType[examType] && "rotate-180",
              )}
            >
              <path
                d="M7.70312 9.54688L1.32812 3.17188C0.859375 2.70312 0.859375 2 1.32812 1.57812L2.35938 0.5C2.82812 0.078125 3.53125 0.078125 3.95312 0.5L8.45312 5.04688L13 0.5C13.4219 0.078125 14.125 0.078125 14.5938 0.5L15.625 1.57812C16.0938 2 16.0938 2.70312 15.625 3.17188L9.25 9.54688C8.82812 9.96875 8.125 9.96875 7.70312 9.54688Z"
                className="transition-primary fill-gray group-hover:fill-lightGreen"
              />
            </svg>
          </div>
          <div
            className={`overflow-hidden ${
              shownExamType[examType] ? "h-fit" : "h-0"
            } transition-all duration-300 ease-in-out`}
          >
            <ul
              className={`ml-3 flex flex-col gap-3 transition-all ${
                shownExamType[examType] ? "mt-0" : "mt-[-100%]"
              } duration-300 ease-in-out`}
            >
              {Array.from(books).map((book) => (
                <li
                  key={book}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 transition-colors duration-300 hover:text-lightGreen",
                    shownBookId === book && "text-lightGreen",
                  )}
                  onClick={() => {
                    setShownBook(book === shownBookId ? "" : book);
                  }}
                >
                  {book}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TestSidebar;
