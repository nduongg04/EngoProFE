"use client";

import { CreateWordForm } from "@/components/CreateWordForm";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import VocabularyItem from "@/components/VocabularyItem";
import { useToast } from "@/hooks/use-toast";
import {
  deleteVocabulary,
  getVocabularies,
} from "@/lib/actions/vocabulary.action";
import { VocabularySet } from "@/types/vocabulary";
import { BookOpen, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VocabularyListPage() {
  const [vocabularies, setVocabularies] = useState<VocabularySet[]>([]);
  const [loading, setLoading] = useState(true);
  const [editWord, setEditWord] = useState<VocabularySet | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchVocabularies();
  }, []);

  const fetchVocabularies = async () => {
    try {
      const data = await getVocabularies();
      setVocabularies(data);
    } catch (error) {
      console.error("Error fetching vocabularies:", error);
      toast({
        title: "Error",
        description: "Failed to fetch vocabularies. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (word: VocabularySet) => {
    setEditWord(word);
    setOpen(true);
  };

  const handleEditSuccess = (updatedWord: VocabularySet) => {
    setVocabularies((prev) =>
      prev.map((word) => (word._id === updatedWord._id ? updatedWord : word)),
    );
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteVocabulary(id);
      setVocabularies((prev) => prev.filter((word) => word._id !== id));
      toast({
        title: "Success",
        description: "Word deleted successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting vocabulary:", error);
      toast({
        title: "Error",
        description: "Failed to delete word. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddVocabulary = (newVocabulary: VocabularySet) => {
    setVocabularies((prev) => [...prev, newVocabulary]);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <main className="relative flex w-full flex-1 flex-col">
      <div className="container flex flex-col justify-between gap-6 px-10 py-6 xl:flex-row">
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-semibold">
              Vocabulary List - {vocabularies.length} words
            </h1>
            <CreateWordForm
              onSuccess={handleAddVocabulary}
              editWord={editWord}
              setEditWord={setEditWord}
              open={open}
              setOpen={setOpen}
              onEdit={handleEditSuccess}
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {vocabularies.map((word) => (
              <VocabularyItem
                key={word._id}
                word={word}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4 md:col-span-4">
          <Button className="h-12 w-full bg-[#49BBBD] text-white hover:bg-[#49BBBD]/90">
            <BookOpen className="mr-2 h-5 w-5" />
            Flashcards
          </Button>

          <Button className="h-12 w-full bg-[#49BBBD] text-white hover:bg-[#49BBBD]/90" onClick={() => router.push('/vocabularies/game')}>
            <GraduationCap className="mr-2 h-5 w-5" />
            Bài tập
          </Button>

          <Card className="max-w-fit p-4">
            <Calendar
              mode="single"
              className="w-full"
              selected={new Date()}
              modifiers={{
                booked: [
                  new Date(),
                  {
                    from: new Date(2024, 10, 15),
                    to: new Date(2024, 10, 20),
                  },
                ],
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
    </main>
  );
}
