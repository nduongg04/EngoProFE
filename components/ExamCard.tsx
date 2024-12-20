"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export type ExamCardProps = {
  id: string;
  type: string;
  title: string;
  maxScore: number;
  time: number;
  questionCount: number;
  partCount: number;
  tags: string[];
  isAdmin?: boolean;
  onDelete?: () => void;
};

const ExamCard = ({
  id,
  title,
  time,
  questionCount,
  partCount,
  tags,
  isAdmin,
  onDelete,
}: ExamCardProps) => {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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

      {isAdmin ? (
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogTrigger>
            <Button
              className="w-full border border-black/15 bg-white text-[#252641] shadow-none hover:bg-lightGreen/40"
            >
              Xóa
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Xác nhận xóa đề thi</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa đề thi này không?
            </DialogDescription>
            <DialogFooter>
              <Button variant="outline" className="px-6" onClick={() => setDeleteModalOpen(false)}>Hủy</Button>
              <Button className="bg-red-500 px-6 hover:bg-red-600/90" onClick={onDelete}>Xóa</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          className="border border-black/15 bg-white text-[#252641] shadow-none hover:bg-lightGreen/40"
          onClick={() => {
            router.push(`/tests/${id}`);
          }}
        >
          Chi tiết
        </Button>
      )}
    </div>
  );
};
export default ExamCard;
