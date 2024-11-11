"use client";

import { Button } from "@/components/ui/button";
import BackComponent from "@/components/vocabularies/flashcard/BackComponent";
import FrontComponent from "@/components/vocabularies/flashcard/FrontComponent";
import HeaderVocab from "@/components/vocabularies/HeaderFlashCard";
import { cn } from "@/lib/utils";
import { forwardRef, MutableRefObject, useRef, useState } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import FlashcardArrayProps from "react-quizlet-flashcard/dist/interfaces/IFlashcardArray";
import { styleText } from "util";

type FlashCardType = {
    id: number;
    frontHTML: string | JSX.Element;
    backHTML: string | JSX.Element;
};

const arrayData: FlashCardType[] = [
    {
        id: 1,
        frontHTML: <FrontComponent vocab="Vocabulary" />,
        backHTML: <BackComponent trans="Từ vựng" />,
    },
    {
        id: 1,
        frontHTML: <FrontComponent vocab="Vocabulary1" />,
        backHTML: <BackComponent trans="Từ vựng1" />,
    },
    {
        id: 1,
        frontHTML: <FrontComponent vocab="Vocabulary2" />,
        backHTML: <BackComponent trans="Từ vựng2" />,
    },
];
const FlashCardPage = () => {
    const forwardRef = useRef<{
        nextCard: () => void;
        prevCard: () => void;
        resetArray: () => void;
    }>({ nextCard: () => {}, prevCard: () => {}, resetArray: () => {} });
    const [isAllDone, setAllDone] = useState(false);
    const flipCardRef = useRef<() => void>(() => {});

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center gap-5 bg-white">
            <HeaderVocab />
            <div
                className={cn(
                    "absolute min-h-screen w-full flex-col items-center justify-center gap-5 bg-white",
                    isAllDone ? "hidden" : "flex",
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
                        className="rounded-lg bg-[#F04D6A] px-20 py-3 text-white shadow-cus hover:opacity-80"
                        onClick={() => {
                            if (forwardRef.current) {
                                forwardRef.current.nextCard();
                            }
                        }}
                    >
                        Bỏ qua
                    </button>
                    <button
                        className="rounded-lg bg-[#49BD70] px-20 py-3 text-white shadow-cus hover:opacity-80"
                        onClick={() => {
                            if (forwardRef.current && flipCardRef.current) {
                                flipCardRef.current();
                                setTimeout(() => {
                                    forwardRef.current.nextCard();
                                }, 5000);
                            }
                        }}
                        disabled={false}
                    >
                        Đã nhớ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlashCardPage;
