"use client";

import { AIFirstSection } from "@/components/ai-generated-question/FirstSection";
import { AISecondSection } from "@/components/ai-generated-question/SecondSection";
import { showAIChat } from "@/lib/store/slice/chat_slice";
import { useAppDispatch } from "@/lib/store/store";
import { useEffect } from "react";

const AIQuestions = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(showAIChat());
  }, [dispatch]);
  return (
    <main className="relative flex w-full flex-1 flex-col">
      <div className="absolute w-full">
        <AIFirstSection />
        <AISecondSection />
      </div>
    </main>
  );
};
export default AIQuestions;
