import {
    AnsweredQuestion,
    increaseCompletedQuestion,
    setuserAnswserMap,
} from "@/lib/store/slice/test_ai_slice";
import { useAppSelector } from "@/lib/store/store";
import { cn } from "@/lib/utils";
import {
    RadioGroup,
    RadioGroupIndicator,
    RadioGroupItem,
} from "@radix-ui/react-radio-group";
import Image from "next/image";
import { useState } from "react";

type AIProp = {
    number: number;
    question: AnsweredQuestion;
};

const ResultQuestion = ({ number, question }: AIProp) => {
    let isChecked = false;
    const [isShowExplan, setIsShowExplan] = useState(false);
    const { userAnswerMap, dataQuestion } = useAppSelector(
        (state) => state.testAiSlice,
    );
    const userAnswer = userAnswerMap.get(number);
    const isMissing = !userAnswerMap.has(number);
    function onClick() {
        setIsShowExplan(!isShowExplan);
    }

    return (
        <div className="relative ml-[120px] flex flex-col gap-5 rounded-lg bg-white px-10 py-7 shadow-cus">
            <Image
                src="/assets/icons/missing_icon.svg"
                alt=""
                className={cn(
                    "absolute right-[-8px] top-[-8px]",
                    isMissing ? "block" : "hidden",
                )}
                width={16}
                height={16}
            />
            <p className="text-[17px] font-semibold text-darkGreen">
                Question {number}:
            </p>
            <p className="text-[18px] font-semibold"> {question.question}</p>
            <div className="flex flex-col">
                <RadioGroup
                    className="flex flex-col gap-6"
                    disabled={true}
                    defaultValue={userAnswerMap.get(number)}
                >
                    <div className="flex items-center gap-5">
                        <RadioGroupItem
                            value="A"
                            id="a"
                            className="h-[17px] w-[17px] rounded-full border-none bg-white p-1 shadow-radio"
                        >
                            <RadioGroupIndicator
                                className="flex h-full w-full items-center justify-center rounded-full bg-darkGreen"
                                color="black"
                            />
                        </RadioGroupItem>
                        <label className="flex flex-1 text-[17px]">
                            A. {question.A}
                        </label>
                        <Image
                            src={"/assets/icons/correct_icon.svg"}
                            alt=""
                            className={
                                dataQuestion[number - 1].correctAnswer == "A"
                                    ? ""
                                    : "hidden"
                            }
                            width={18}
                            height={18}
                        />
                        <Image
                            src={"/assets/icons/wrong_icon.svg"}
                            alt=""
                            className={
                                dataQuestion[number - 1].correctAnswer != "A" &&
                                userAnswer == "A"
                                    ? ""
                                    : "hidden"
                            }
                            width={20}
                            height={20}
                        />
                    </div>
                    <div className="flex items-center gap-5">
                        <RadioGroupItem
                            value="B"
                            id="b"
                            className="h-[17px] w-[17px] rounded-full border-none bg-white p-1 shadow-radio"
                        >
                            <RadioGroupIndicator
                                className="flex h-full w-full items-center justify-center rounded-full bg-darkGreen"
                                color="black"
                            />
                        </RadioGroupItem>
                        <label className="flex flex-1 text-[17px]">
                            B. {question.B}
                        </label>
                        <Image
                            src={"/assets/icons/correct_icon.svg"}
                            alt=""
                            className={
                                dataQuestion[number - 1].correctAnswer == "B"
                                    ? ""
                                    : "hidden"
                            }
                            width={18}
                            height={18}
                        />
                        <Image
                            src={"/assets/icons/wrong_icon.svg"}
                            alt=""
                            className={
                                dataQuestion[number - 1].correctAnswer != "B" &&
                                userAnswer == "B"
                                    ? ""
                                    : "hidden"
                            }
                            width={20}
                            height={20}
                        />
                    </div>
                    <div className="flex items-center gap-5">
                        <RadioGroupItem
                            value="C"
                            id="c"
                            className="h-[17px] w-[17px] rounded-full border-none bg-white p-1 shadow-radio"
                        >
                            <RadioGroupIndicator
                                className="flex h-full w-full items-center justify-center rounded-full bg-darkGreen"
                                color="black"
                            />
                        </RadioGroupItem>
                        <label className="flex flex-1 text-[17px]">
                            C. {question.C}
                        </label>
                        <Image
                            src={"/assets/icons/correct_icon.svg"}
                            alt=""
                            className={
                                dataQuestion[number - 1].correctAnswer == "C"
                                    ? ""
                                    : "hidden"
                            }
                            width={18}
                            height={18}
                        />
                        <Image
                            src={"/assets/icons/wrong_icon.svg"}
                            alt=""
                            className={
                                dataQuestion[number - 1].correctAnswer != "C" &&
                                userAnswer == "C"
                                    ? ""
                                    : "hidden"
                            }
                            width={20}
                            height={20}
                        />
                    </div>
                    <div className="flex items-center gap-5">
                        <RadioGroupItem
                            value="D"
                            id="d"
                            className="h-[17px] w-[17px] rounded-full border-none bg-white p-1 shadow-radio"
                        >
                            <RadioGroupIndicator
                                className="flex h-full w-full items-center justify-center rounded-full bg-darkGreen"
                                color="black"
                            />
                        </RadioGroupItem>
                        <label className="flex flex-1 text-[17px]">
                            D. {question.D}
                        </label>
                        <Image
                            src={"/assets/icons/correct_icon.svg"}
                            alt=""
                            className={
                                dataQuestion[number - 1].correctAnswer == "D"
                                    ? ""
                                    : "hidden"
                            }
                            width={18}
                            height={18}
                        />
                        <Image
                            src={"/assets/icons/wrong_icon.svg"}
                            alt=""
                            className={
                                dataQuestion[number - 1].correctAnswer != "D" &&
                                userAnswer == "D"
                                    ? ""
                                    : "hidden"
                            }
                            width={20}
                            height={20}
                        />
                    </div>
                </RadioGroup>
            </div>
            <p
                className="flex cursor-pointer self-end text-[14px] text-darkGreen underline"
                onClick={onClick}
            >
                Explanation
            </p>
            <div
                className={cn(
                    "flex flex-col gap-3 overflow-hidden transition-all duration-500 ease-in-out",
                    isShowExplan ? "h-fit" : "hidden h-0",
                )}
            >
                <p className="text-[17px] font-semibold">Explanation:</p>
                <p>{question.explanation}</p>
            </div>
        </div>
    );
};

export default ResultQuestion;
