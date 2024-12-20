"use client";

import { Button } from "@/components/ui/button";
import BackComponent from "@/components/vocabularies/flashcard/BackComponent";
import FrontComponent from "@/components/vocabularies/flashcard/FrontComponent";
import HeaderVocab from "@/components/vocabularies/HeaderFlashCard";
import { resetFlashCard } from "@/lib/store/slice/vocab_slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  forwardRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import FlashcardArrayProps from "react-quizlet-flashcard/dist/interfaces/IFlashcardArray";
import { styleText } from "util";

type FlashCardType = {
  id: number;
  frontHTML: string | JSX.Element;
  backHTML: string | JSX.Element;
};

const FlashCardPage = () => {
  const router = useRouter();
  const [isDaNho, setIsDaNho] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { listVocabFlashCar } = useAppSelector((state) => state.vocabSlice);
  const dispatch = useAppDispatch();
  const arrayData: FlashCardType[] = listVocabFlashCar.map((item, index) => {
    return {
      id: index + 1,
      frontHTML: (
        <FrontComponent
          examples={item.examples}
          vocab={item.vocab}
          wordType={item.wordType}
        />
      ),
      backHTML: (
        <BackComponent
          definition={item.definition}
          vocab={item.vocab}
          wordType={item.wordType}
        />
      ),
    };
  });
  const forwardRef = useRef<{
    nextCard: () => void;
    prevCard: () => void;
    resetArray: () => void;
  }>({ nextCard: () => {}, prevCard: () => {}, resetArray: () => {} });
  const [isAllDone, setAllDone] = useState(false);
  const flipCardRef = useRef<() => void>(() => {});

  const handleNextCar = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const resetCar = () => {
    setCurrentIndex(0);
  };

  return (
    <div className="relative flex flex-1 w-full flex-col items-center justify-center gap-5 bg-white">
      {isAllDone ? (
        <div
          className={cn(
            "absolute flex flex-1 w-full flex-col items-center justify-center gap-5 bg-white",
          )}
        >
          <p className="text-[35px] font-bold">All Done!!</p>
          <p>
            Bạn đã học được rất nhiều từ ngày hôm nay. Cùng bọn mình ôn tập lại
            nhé
          </p>
          <div className="flex gap-3">
            <button
              className="rounded-lg bg-[#B5C3C3] px-20 py-3 text-white shadow-cus hover:opacity-80"
              onClick={() => {
                router.back();
              }}
            >
              Trở về
            </button>
            <button
              className={cn(
                "rounded-lg px-20 py-3 text-white shadow-cus",
                "bg-[#49BD70] hover:opacity-80",
              )}
              onClick={() => {
                router.replace("/vocabularies/game");
              }}
              disabled={isDaNho}
            >
              Tiếp tục chơi
            </button>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "absolute flex flex-1 w-full flex-col items-center justify-center gap-5 bg-white",
          )}
        >
          <p className="text-[35px] font-bold">Flashcard - New words 1</p>
          <FlashcardArray
            cards={arrayData}
            controls={false}
            showCount={true}
            FlashcardArrayStyle={{ width: "60%" }}
            forwardRef={
              forwardRef as MutableRefObject<{
                nextCard: () => void;
                prevCard: () => void;
                resetArray: () => void;
              }>
            }
            currentCardFlipRef={flipCardRef}
          />
          <div className="flex gap-3">
            <button
              className={cn(
                "rounded-lg px-20 py-3 text-white shadow-cus",
                isDaNho ? "bg-[#B5C3C3]" : "bg-[#F04D6A] hover:opacity-80",
              )}
              onClick={() => {
                if (forwardRef.current && flipCardRef.current) {
                  flipCardRef.current();
                  setIsDaNho(true);
                  setTimeout(() => {
                    if (currentIndex < arrayData.length - 1) {
                      forwardRef.current.nextCard();
                      handleNextCar();
                    } else {
                      setAllDone(true);
                    }

                    setIsDaNho(false);
                  }, 5000);
                }
              }}
            >
              Chưa nhớ
            </button>
            <button
              className={cn(
                "rounded-lg bg-[#49BD70] px-20 py-3 text-white shadow-cus hover:opacity-80",
              )}
              onClick={() => {
                if (forwardRef.current) {
                  if (currentIndex < arrayData.length - 1) {
                    forwardRef.current.nextCard();
                    handleNextCar();
                  } else {
                    setAllDone(true);
                  }
                }
              }}
              disabled={isDaNho}
            >
              Đã nhớ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashCardPage;
