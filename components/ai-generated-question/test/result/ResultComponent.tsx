import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/lib/store/store";
import { cn } from "@/lib/utils";

const ResultComponent = () => {
    const { dataQuestion, userAnswerMap } = useAppSelector(
        (state) => state.testAiSlice,
    );
    const number = dataQuestion.length;
    const items = Array.from({ length: number });
    let correctAnser = 0;
    userAnswerMap.forEach((value, key, _) => {
        if (dataQuestion[key - 1].correctAnswer == value) {
            correctAnser++;
        }
    });
    return (
        <div className="ml-10 flex w-[80%] flex-col gap-8 rounded-lg bg-white p-5 shadow-cus">
            <div className="flex flex-col items-center rounded-lg bg-[#F9FAFB] py-5">
                <p className="text-[16px] font-semibold">Score</p>
                <p className="text-[20px] font-bold text-[#F78F19]">
                    <span className="text-black">{correctAnser}</span>/{number}
                </p>
            </div>
            <div className="flex flex-col gap-5">
                <p className="text-[16px] font-semibold">Questions</p>
                <div className="flex gap-5 self-center text-[13px] text-[#81899B]">
                    <div className="flex items-center gap-2">
                        <div className="h-[14px] w-[14px] rounded-sm bg-[#398039]" />
                        <p>Correct</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-[14px] w-[14px] rounded-sm bg-[#E94C4C]" />
                        <p>Incorrect</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-[14px] w-[14px] rounded-sm bg-[#F78F19]" />
                        <p>Not answer</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3 rounded-lg bg-[#F9FAFB] p-3">
                    {items.map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex rounded-lg p-3 text-[13px] text-white shadow-cus",
                                userAnswerMap.has(index + 1)
                                    ? userAnswerMap.get(index + 1) ==
                                      dataQuestion[index].correctAnswer
                                        ? "bg-[#398039]"
                                        : "bg-[#E94C4C]"
                                    : "bg-[#F78F19]",
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

export default ResultComponent;
