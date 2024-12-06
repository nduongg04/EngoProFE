import {
    setIsGenAI,
    setMinute,
    setQuestions,
    setSubject,
} from "@/lib/store/slice/ai_gen_slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import Link from "next/link";

export const StartDotheTestCompo = () => {
    const { subject, minute, questions, isGenAI } = useAppSelector(
        (state) => state.aiQuesSlice,
    );
    const dispatch = useAppDispatch();
    //Method
    function hoanTacBtn() {
        dispatch(setIsGenAI({ isGenAI: false }));
        dispatch(setSubject({ subject: "" }));
        dispatch(setMinute({ minute: "" }));
        dispatch(setQuestions({ questions: "" }));
    }

    return (
        <div className="mt-10 flex flex-col items-center rounded-[36px] bg-white px-[90px] py-8 shadow-cus">
            <p className="text-[20px] font-bold">Bài thi tiếng Anh</p>
            <p className="mt-3 text-[15px] font-semibold">Chủ đề: {subject}</p>
            <p className="mt-3 text-[20px] font-semibold">
                Thời gian: {minute}
            </p>
            <p className="text-[15px]">Số câu hỏi: {questions}</p>
            <p className="text-[13px] italic">Được tạo bởi EngoProAI</p>
            <div className="mt-5 flex gap-8">
                {isGenAI ? (
                    <Link
                        href={"/ai-generated-questions/test"}
                        className="rounded-sm bg-lightGreen px-7 py-1 font-bold text-white shadow-cus"
                    >
                        Bắt đầu
                    </Link>
                ) : (
                    <></>
                )}
                <button
                    className="rounded-sm bg-[#B5C3C3] px-7 py-1 font-bold text-[#706868] shadow-cus"
                    onClick={hoanTacBtn}
                >
                    Hoàn tác
                </button>
            </div>
        </div>
    );
};
