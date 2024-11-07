import Image from "next/image";
import { Button } from "./ui/button";

export type ExamCardProps = {
  id: string;
  type: string;
  title: string;
  maxScore: number;
  time: number;
  questionCount: number;
  partCount: number;
  tags: string[];
};

const ExamCard = ({
  id,
  type,
  title,
  maxScore,
  time,
  questionCount,
  partCount,
  tags,
}: ExamCardProps) => {
  return (
    <div className="flex h-fit cursor-pointer flex-col gap-2 rounded-lg border border-black/15 p-4 hover:shadow-[0_18px_47px_0px_rgba(47,50,125,0.1)]">
      <div className="flex gap-2 text-sm text-lightGray">
        <Image
          src="/assets/icons/square.svg"
          alt="square"
          width={16}
          height={16}
        />
        {partCount} phần thi | {questionCount} câu hỏi
      </div>
      <div className="flex gap-2 text-sm text-lightGray">
        <Image
          src="/assets/icons/timer.svg"
          alt="timer"
          width={16}
          height={16}
        />
        {time} phút
      </div>
      <h1 className="text-lg font-medium text-[#252641]">{title}</h1>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="rounded-full bg-lightGreen/15 px-2 py-1 text-sm font-semibold text-lightGreen"
          >
            #{tag}
          </div>
        ))}
      </div>
      <Button className="border border-black/15 bg-white text-[#252641] shadow-none hover:bg-lightGreen/40">
        Chi tiết
      </Button>
    </div>
  );
};
export default ExamCard;
