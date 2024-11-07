"use client";

import { cn } from "@/lib/utils";
import { Fallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import { useState } from "react";

const TestSidebar = () => {
  const [shownExamType, setShownExamType] = useState<{
    [key: string]: boolean;
  }>({
    TOEIC: false,
    IELTS: false,
  });
  const [shownBookId, setShownBook] = useState("");
  const [tests, setTests] = useState([
    {
      examType: "TOEIC",
      books: [
        { id: "1", name: "Cambrige 18" },
        { id: "2", name: "Cambrige 18" },
        { id: "3", name: "Cambrige 18" },
        { id: "4", name: "Cambrige 18" },
      ],
    },
    {
      examType: "IELTS",
      books: [
        { id: "1", name: "Cambrige 18" },
        { id: "2", name: "Cambrige 18" },
        { id: "3", name: "Cambrige 18" },
        { id: "4", name: "Cambrige 18" },
      ],
    },
  ]);

  return (
    <div className="test-sidebar bg-gray-200 flex h-fit flex-col gap-2 rounded-md border border-[#B4B4B4]/60 bg-[#D8D8D8]/30 py-4 pl-5 pr-5">
      {tests.map((test) => (
        <div className="flex flex-col gap-2">
          <div
            className="transition-primary group flex min-w-32 cursor-pointer items-center justify-between text-lg font-medium hover:text-lightGreen"
            onClick={() => {
              setShownExamType({
                ...shownExamType,
                [test.examType]: !shownExamType[test.examType],
              });
            }}
          >
            {test.examType}
            <svg
              width="17"
              height="10"
              viewBox="0 0 17 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "transition-all duration-300 ease-in-out",
                shownExamType[test.examType] && "rotate-180",
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
              shownExamType[test.examType] ? "h-fit" : "h-0"
            } transition-all duration-300 ease-in-out`}
          >
            <ul
              className={`ml-3 flex flex-col gap-3 transition-all ${
                shownExamType[test.examType] ? "mt-0" : "mt-[-100%]"
              } duration-300 ease-in-out`}
            >
              {test.books.map((book) => (
                <li
                  className={cn(
                    "flex cursor-pointer items-center gap-2 transition-colors duration-300 hover:text-lightGreen",
                    shownBookId === book.id && "text-lightGreen",
                  )}
                  onClick={() => {
                    setShownBook(book.id === shownBookId ? "" : book.id);
                  }}
                >
                  {book.name}
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
