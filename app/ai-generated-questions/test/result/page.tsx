"use client";
import HeaderTestAIBar from "@/components/ai-generated-question/test/HeaderTestAIBar";
import AIQuestion from "@/components/ai-generated-question/test/Question";
import ResultQuestion from "@/components/ai-generated-question/test/result/QuestionResult";
import ResultComponent from "@/components/ai-generated-question/test/result/ResultComponent";
import { showAIChat } from "@/lib/store/slice/chat_slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { onpenLink } from "@/lib/utils";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const ResultPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const dataQuestions = useAppSelector(
    (state) => state.testAiSlice.dataQuestion,
  );

  useEffect(() => {
    if (dataQuestions.length == 0) {
      throw new Error("You need to generate questions first");
    }
    dispatch(showAIChat());
  }, []);
  return (
    <div>
      <div className="min-h-screen bg-[#F9FAFB]">
        <HeaderTestAIBar />
        <div className="mt-8 flex">
          <div className="flex w-[65%] flex-col gap-8">
            {dataQuestions.map((question, index) => (
              <ResultQuestion
                question={question}
                key={index}
                number={index + 1}
              />
            ))}
          </div>
          <div className="fixed right-0 w-[35%]">
            <ResultComponent />
          </div>
        </div>
        <div className="flex gap-5">
          <button
            className="my-5 ml-[120px] rounded-md bg-darkGreen px-5 py-2 text-[18px] text-white"
            onClick={() => {
              onpenLink("https://forms.gle/2JEaL3JuUTGv8UDw7");
            }}
          >
            Feedback
          </button>
          <button
            className="my-5 rounded-md bg-[#B5C3C3] px-5 py-2 text-[18px] text-[#706868]"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
