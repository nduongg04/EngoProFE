import TestsListQuestion from "@/components/tests/ListQuestion";
import { Card, CardContent } from "@/components/ui/card";

const IELTSExam = () => {
    return (
        <div className="flex-1 bg-[#F8F9FA]">
            <div className="flex flex-col gap-4">
                <div className="mt-5 flex items-center justify-center gap-2 font-semibold">
                    IELTS Cambridge 18 listening test
                    <div className="rounded-md border border-[#4B64A7] bg-[#E8F2FF] px-3 py-1">
                        Thoát
                    </div>
                </div>
                <div className="flex w-full gap-2 px-2">
                    <Card className="flex h-fit flex-1"></Card>
                    <Card className="flex h-fit w-[15%] flex-col">
                        <CardContent>
                            <div className="flex flex-col py-3">
                                <div>Thời gian còn lại</div>
                                <div className="text-[18px] font-semibold">
                                    34:28
                                </div>
                                <div className="mt-2 flex cursor-pointer self-center rounded-md border border-[#4B64A7] px-7 py-1 text-[#4B64A7] hover:bg-[#4B64A7] hover:text-white">
                                    Nộp bài
                                </div>
                                <div className="mt-5 flex flex-col gap-1">
                                    <div className="font-semibold">
                                        Recording 1
                                    </div>
                                    <TestsListQuestion />
                                    <div className="font-semibold">
                                        Recording 2
                                    </div>
                                    <TestsListQuestion />
                                    <div className="font-semibold">
                                        Recording 3
                                    </div>
                                    <TestsListQuestion />
                                    <div className="font-semibold">
                                        Recording 4
                                    </div>
                                    <TestsListQuestion />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default IELTSExam;
