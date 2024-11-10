"use client";

import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/lib/store/store";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
type Props = {
    number: number;
    time: string;
};

const ListQuestion = ({ number, time }: Props) => {
    const items = Array.from({ length: number });
    const { completedQuestion, userAnswerMap } = useAppSelector(
        (state) => state.testAiSlice,
    );
    return (
        <div className="ml-10 flex w-[80%] flex-col gap-8 rounded-lg bg-white p-5 shadow-cus">
            <div className="flex flex-col items-center rounded-lg bg-[#F9FAFB] py-5">
                <p className="text-[16px] font-semibold">Time to complete</p>
                <p className="text-[20px] font-bold text-[#F78F19]">
                    29:59 / {time}
                </p>
            </div>
            <div className="flex flex-col gap-5">
                <p className="text-[16px] font-semibold">Questions</p>
                <div className="flex items-center justify-center gap-3">
                    <label className="text-[12px] font-bold">
                        {completedQuestion}/{number}
                    </label>
                    <Progress
                        value={(completedQuestion / number) * 100}
                        className="w-[60%]"
                    />
                </div>
                <div className="flex gap-5 self-center text-[13px] text-[#81899B]">
                    <div className="flex items-center gap-2">
                        <div className="h-[14px] w-[14px] rounded-sm bg-[#5179E3]" />
                        <p>Answered</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="h-[14px] w-[14px] rounded-sm border border-[#5179E3]" />
                        <p>In Progress</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3 rounded-lg bg-[#F9FAFB] p-3">
                    {items.map((_, index) => (
                        <div
                            className={cn(
                                "flex rounded-lg border border-[#5179E3] p-3 text-[13px] shadow-cus",
                                userAnswerMap.has(index + 1)
                                    ? "bg-[#5179E3] text-white"
                                    : "bg-white text-black",
                            )}
                        >
                            {index + 1 > 9 ? index + 1 : `0${index + 1}`}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListQuestion;
