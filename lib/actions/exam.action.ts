"use server";

import { auth } from "@/auth";
import { authenticatedFetch } from "./fetch.action";
const submitExam = async (
  testId: string,
  answeredQuestions: any,
  timeSpent: number,
) => {
  const session = await auth();
  console.log("testId", testId);
  console.log("answeredQuestions", answeredQuestions);
  const data = await authenticatedFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/exam/submit`,
    {
      method: "POST",
      body: JSON.stringify({
        testId,
        answeredQuestions,
        userId: session?.user?.id,
        duration: timeSpent,
      }),
    },
  );
  console.log(data);
  return data;
};

const getExamResult = async (testId: string, turn: number) => {
  const session = await auth();
  const data = await authenticatedFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/exam/result/${testId}?userId=${session?.user?.id}&turn=${turn}`,
  );
  return data;
};

const getAllExamResult = async (testId: string) => {
  const session = await auth();
  const data = await authenticatedFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/exam/result/all/${testId}?userId=${session?.user?.id}`,
  );
  return data;
};

const deleteExam = async (examId: string) => {
  await authenticatedFetch(
    `${process.env.BACKEND_URL}/exam/${examId}`,
    { method: "DELETE" },
  );

};

export { deleteExam, getAllExamResult, getExamResult, submitExam };
