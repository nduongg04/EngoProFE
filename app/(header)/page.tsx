"use client";

import DetailSection from "@/components/landing-page/DetailSection";
import HeroSection from "@/components/landing-page/HeroSection";
import { disableAIChat } from "@/lib/store/slice/chat_slice";
import { useAppDispatch } from "@/lib/store/store";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(disableAIChat());
  }, []);
  return (
    <div className="absolute w-full flex-1">
      <HeroSection />
      <DetailSection />
    </div>
  );
}
