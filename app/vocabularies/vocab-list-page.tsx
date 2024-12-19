"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import VocabularyCard from "@/components/VocabularyCard";
import VocabularyModal from "@/components/VocabularyModal";
import { showAIChat } from "@/lib/store/slice/chat_slice";
import { useAppDispatch } from "@/lib/store/store";
import { VocabularyList } from "@/types/vocabulary";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function VocabulariesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<"create" | "edit">(
    "create",
  );
  const [currentList, setCurrentList] = useState<VocabularyList | null>(null);

  const mockData = [
    {
      _id: "1",
      title: "Từ mới 1",
      totalWords: 100,
      rememberedWords: 50,
      needToLearnWords: 50,
      date: "19/10/2024",
      vocabularies: [],
    },
    {
      _id: "2",
      title: "Từ mới 2",
      totalWords: 80,
      rememberedWords: 30,
      needToLearnWords: 50,
      date: "20/10/2024",
      vocabularies: [],
    },
    {
      _id: "3",
      title: "Từ mới 3",
      totalWords: 120,
      rememberedWords: 60,
      needToLearnWords: 60,
      date: "21/10/2024",
      vocabularies: [],
    },
    {
      _id: "3",
      title: "Từ mới 3",
      totalWords: 120,
      rememberedWords: 60,
      needToLearnWords: 60,
      date: "21/10/2024",
      vocabularies: [],
    },
    {
      _id: "3",
      title: "Từ mới 3",
      totalWords: 120,
      rememberedWords: 60,
      needToLearnWords: 60,
      date: "21/10/2024",
      vocabularies: [],
    },
  ];

  const handleCreate = () => {
    setCurrentAction("create");
    setCurrentList(null);
    setIsModalOpen(true);
  };

  const handleEdit = (list: VocabularyList) => {
    setCurrentAction("edit");
    setCurrentList(list);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentList(null);
  };

  const handleSave = (title: string) => {
    // Placeholder function for saving data
    console.log("Saving data:", title);
    setIsModalOpen(false);
    // Here you would typically update your state or make an API call
    // For now, we'll just close the modal
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(showAIChat());
  }, []);

  return (
    <main className="relative flex w-full flex-1 flex-col">
      <div className="container flex flex-col justify-between gap-6 px-10 py-6 xl:flex-row">
        <div className="flex w-full flex-col items-center justify-between gap-6">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-semibold">Danh sách từ đã tạo</h1>
            <Button
              onClick={handleCreate}
              className="bg-[#49BBBD] hover:bg-[#49BBBD]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Tạo danh sách mới
            </Button>
          </div>
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockData.map((list) => (
              <VocabularyCard
                key={list._id}
                list={list}
                onEdit={() => handleEdit(list)}
              />
            ))}
          </div>
        </div>
        <div className="max-w-fit">
          <Card className="p-4">
            <Calendar
              mode="single"
              className="rounded-md"
              selected={new Date()}
              modifiers={{
                booked: [new Date()],
              }}
              modifiersStyles={{
                booked: {
                  backgroundColor: "#49BBBD",
                  color: "white",
                },
              }}
            />
          </Card>
        </div>
      </div>
      <VocabularyModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        action={currentAction}
        list={currentList || null}
      />
    </main>
  );
}
