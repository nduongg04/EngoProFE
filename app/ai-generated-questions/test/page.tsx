"use client";

import HeaderTestAIBar from "@/components/ai-generated-question/test/HeaderTestAIBar";
import ListQuestion from "@/components/ai-generated-question/test/ListQuestion";
import AIQuestion from "@/components/ai-generated-question/test/Question";
import { disableAIChat } from "@/lib/store/slice/chat_slice";
import {
  resetCompletedQuestion,
  resetMap,
} from "@/lib/store/slice/test_ai_slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

const TestAIView = () => {
  const router = useRouter();
  const dataQuestions = useAppSelector(
    (state) => state.testAiSlice.dataQuestion,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetCompletedQuestion());
    dispatch(resetMap());
    dispatch(disableAIChat());
  }, [dispatch]);
  useEffect(() => {
    if (dataQuestions.length == 0) {
      redirect("/error");
    }
  }, []);
  function onSubmit() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Submit",
    }).then((result) => {
      if (result.isConfirmed) {
        router.replace("/ai-generated-questions/test/result");
      }
    });
  }
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <HeaderTestAIBar />
      <div className="mt-8 flex">
        <div className="flex w-[65%] flex-col gap-8">
          {dataQuestions.map((question, index) => (
            <AIQuestion question={question} key={index} number={index + 1} />
          ))}
        </div>
        <div className="fixed right-0 w-[35%]">
          <ListQuestion number={dataQuestions.length} />
        </div>
      </div>
      <button
        className="my-5 ml-[120px] rounded-md bg-darkGreen px-5 py-2 text-[18px] text-white"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default TestAIView;
