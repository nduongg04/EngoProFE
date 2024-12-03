"use client";

import HeaderHomeWhite from "@/components/HeaderHomeWhite";
import { showAIChat } from "@/lib/store/slice/chat_slice";
import { useAppDispatch } from "@/lib/store/store";
import { useEffect } from "react";

const Vocabularies = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(showAIChat());
  }, []);

  return (
    <main className="relative flex min-h-screen w-full flex-col">
      <HeaderHomeWhite />
      <div>abc</div>
    </main>
  );
};
export default Vocabularies;
