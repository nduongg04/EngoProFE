"use client";

import HeaderHomeWhite from "@/components/HeaderHomeWhite";
import DetailSection from "@/components/landing-page/DetailSection";
import HeroSection from "@/components/landing-page/HeroSection";
import { disableAIChat } from "@/lib/store/slice/chat_slice";
import { useAppDispatch } from "@/lib/store/store";
import { useEffect } from "react";

const LandingPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(disableAIChat());
  }, []);
  return (
    <main className="relative flex min-h-screen w-full flex-col">
      <HeaderHomeWhite />
      <div className="absolute w-full">
        <HeroSection />
        <DetailSection />
      </div>
    </main>
  );
};

export default LandingPage;
