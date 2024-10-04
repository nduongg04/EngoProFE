"use client";

import HeaderHomeWhite from "@/components/HeaderHomeWhite";
import TestList from "@/components/TestList";
import TestSidebar from "@/components/TestSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Tests = () => {
    const [exams, setExams] = useState([
        {
            type: "TOEIC",
            title: "Cambrige 18",
            maxScore: 990,
            questionCount: 120,
            partCount: 4,
            tags: ["TOEIC", "Cambrige", "18"],
        },
		{
			type: "IELTS",
            title: "Cambrige 18",
            maxScore: 9,
            questionCount: 120,
            partCount: 4,
            tags: ["IELTS", "Cambrige", "18"],
        },
        {
            type: "TOEIC",
            title: "Cambrige 18",
            maxScore: 990,
            questionCount: 120,
            partCount: 4,
            tags: ["TOEIC", "Cambrige", "18"],
        },
    ]);

    return (
        <main className="relative flex min-h-screen w-full flex-col gap-10">
            <HeaderHomeWhite />
            <div className="flex flex-1 flex-col items-center gap-10 px-10">
                <div className="flex w-3/5 items-center rounded-md border border-neutral-200 bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-within:outline-none focus-within:ring-1 focus-within:ring-neutral-950">
                    <Input
                        placeholder="Nhập từ khóa bạn muốn tìm kiếm"
                        className="border-0 px-6 py-6 tracking-wide focus-visible:ring-0"
                    />
                    <Button className="button">Tìm kiếm</Button>
                </div>
                <div className="flex w-full flex-1 justify-between">
                    <TestSidebar />
                    <TestList exams={exams} />
                </div>
            </div>
        </main>
    );
};
export default Tests;
