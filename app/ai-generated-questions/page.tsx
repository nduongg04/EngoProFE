"use client";

import { AIFirstSection } from "@/components/ai-generated-question/FirstSection";
import { AISecondSection } from "@/components/ai-generated-question/SecondSection";
import { AiChat } from "@/components/AIChatIcon";
import HeaderHomeWhite from "@/components/HeaderHomeWhite";
import { showAIChat } from "@/lib/store/slice/chat_slice";
import { useAppDispatch } from "@/lib/store/store";
import { useEffect } from "react";

const AIQuestions = () => {

    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(showAIChat());
    }, []);
  return (
    <main className="relative flex min-h-screen w-full flex-col">
      <HeaderHomeWhite />
      <div className="absolute w-full">
        <AIFirstSection />
        <AISecondSection />
      </div>
    </main>
  );
};
export default AIQuestions;
