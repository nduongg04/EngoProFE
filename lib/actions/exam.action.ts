"use server";

import { authenticatedFetch } from "./fetch.action";
import { auth } from "@/auth";
const submitExam = async (testId: string, answeredQuestions: any, timeSpent: number) => {
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
    }
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


export { submitExam, getExamResult, getAllExamResult };
