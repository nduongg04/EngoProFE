import {
    AnsweredQuestion,
    increaseCompletedQuestion,
    setuserAnswserMap,
} from "@/lib/store/slice/test_ai_slice";
import { useAppDispatch } from "@/lib/store/store";
import {
    RadioGroup,
    RadioGroupIndicator,
    RadioGroupItem,
} from "@radix-ui/react-radio-group";

type AIProp = {
    number: number;
    question: AnsweredQuestion;
};

const AIQuestion = ({ number, question }: AIProp) => {
    let isChecked = false;
    const dispatch = useAppDispatch();
    return (
        <div className="ml-[120px] flex flex-col gap-5 rounded-lg bg-white px-10 py-7 shadow-cus">
            <p className="text-[17px] font-semibold text-darkGreen">
                Question {number}:
            </p>
            <p className="text-[18px] font-semibold"> {question.question}</p>
            <div className="flex flex-col">
                <RadioGroup
                    className="flex flex-col gap-6"
                    onValueChange={(value) => {
                        if (isChecked == false) {
                            dispatch(increaseCompletedQuestion());
                        }
                        dispatch(
                            setuserAnswserMap({
                                number: number,
                                value: value,
                            }),
                        );
                        isChecked = true;
                    }}
                    onChange={(e) => {
                        console.log(e.currentTarget);
                    }}
                >
                    <div className="flex items-center gap-5">
                        <RadioGroupItem
                            value="A"
                            id="a"
                            className="h-[17px] w-[17px] rounded-full border-none bg-white p-1 shadow-radio hover:bg-lightGreen"
                        >
                            <RadioGroupIndicator
                                className="flex h-full w-full items-center justify-center rounded-full bg-darkGreen"
                                color="black"
                            />
                        </RadioGroupItem>
                        <label className="text-[17px]">A. {question.A}</label>
                    </div>
                    <div className="flex items-center gap-5">
                        <RadioGroupItem
                            value="B"
                            id="b"
                            className="h-[17px] w-[17px] rounded-full border-none bg-white p-1 shadow-radio hover:bg-lightGreen"
                        >
                            <RadioGroupIndicator
                                className="flex h-full w-full items-center justify-center rounded-full bg-darkGreen"
                                color="black"
                            />
                        </RadioGroupItem>
                        <label className="text-[17px]">B. {question.B}</label>
                    </div>
                    <div className="flex items-center gap-5">
                        <RadioGroupItem
                            value="C"
                            id="c"
                            className="h-[17px] w-[17px] rounded-full border-none bg-white p-1 shadow-radio hover:bg-lightGreen"
                        >
                            <RadioGroupIndicator
                                className="flex h-full w-full items-center justify-center rounded-full bg-darkGreen"
                                color="black"
                            />
                        </RadioGroupItem>
                        <label className="text-[17px]">C. {question.C}</label>
                    </div>
                    <div className="flex items-center gap-5">
                        <RadioGroupItem
                            value="D"
                            id="d"
                            className="h-[17px] w-[17px] rounded-full border-none bg-white p-1 shadow-radio hover:bg-lightGreen"
                        >
                            <RadioGroupIndicator
                                className="flex h-full w-full items-center justify-center rounded-full bg-darkGreen"
                                color="black"
                            />
                        </RadioGroupItem>
                        <label className="text-[17px]">D. {question.D}</label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
};

export default AIQuestion;
