"use client";

import { setQuestions } from "@/lib/store/slice/ai_gen_slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { ChangeEvent, ChangeEventHandler } from "react";

export const CustomInput = () => {
    const dispatch = useAppDispatch();
    const questions = useAppSelector((state) => state.aiQuesSlice.questions);
    const { isValid } = useAppSelector((state) => state.aiQuesSlice);
    //Method
    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        if (value == null || value === "") {
        }
        dispatch(setQuestions({ questions: value }));
    }
    return (
        <div className="flex flex-col gap-2">
            <div className="flex w-[200px] cursor-pointer items-center rounded-[18px] border border-[#AAAAAA] px-3 py-2 italic text-black">
                <input
                    type="number"
                    value={questions}
                    className="focus:outline-none"
                    onChange={onChange}
                />
            </div>
            {isValid ? (
                <></>
            ) : (
                <p className="text-[12px] font-light text-red-500">
                    Bạn chưa nhập số câu hỏi
                </p>
            )}
        </div>
    );
};
