"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  addVocabulary,
  updateVocabulary,
} from "@/lib/actions/vocabulary.action";
import { VocabularySet } from "@/types/vocabulary";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const formSchema = z.object({
  englishWord: z.string().min(1, { message: "Từ tiếng Anh là bắt buộc" }),
  definition: z.string().min(1, { message: "Định nghĩa là bắt buộc" }),
  wordType: z.string().min(1, { message: "Loại từ là bắt buộc" }),
  example: z.string(),
});

interface CreateWordFormProps {
  onSuccess?: (newVocabulary: VocabularySet) => void;
  onEdit?: (word: VocabularySet) => void;
  editWord?: VocabularySet | null;
  setEditWord?: (word: VocabularySet | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isGlobal: boolean;
}

export function CreateWordForm({
  onSuccess,
  onEdit,
  editWord,
  setEditWord,
  open,
  setOpen,
  isGlobal = false,
}: CreateWordFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      englishWord: "",
      definition: "",
      wordType: "",
      example: "",
    },
  });

  // Update form values when editWord changes
  useEffect(() => {
    if (editWord) {
      form.reset({
        englishWord: editWord.englishWord,
        definition: editWord.definition,
        wordType: editWord.wordType,
        example: editWord.example.join("\n"),
      });
    } else {
      form.reset({
        englishWord: "",
        definition: "",
        wordType: "",
        example: "",
      });
    }
  }, [editWord]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if (editWord) {
        // Handle edit
        const data = await updateVocabulary(editWord._id, values);
        if (data.message) {
          throw new Error(data.message);
        }
        toast({
          title: "Success",
          description: "Word updated successfully",
          variant: "success",
        });

        onEdit?.(data);
      } else {
        // Handle create
        const data = await addVocabulary(values);

        if (data.message) {
          throw new Error(data.message);
        }

        toast({
          title: "Success",
          description: "Word added successfully",
          variant: "success",
        });

        onSuccess?.(data);
      }

      setOpen(false);
      form.reset();
      setEditWord?.(null);
    } catch (error) {
      console.error("Error creating/updating vocabulary:", error);
      toast({
        title: "Error",
        description: "Failed to save word. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) {
          setEditWord?.(null);
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        {isGlobal ? (
            <Button className="fixed bottom-[80px] right-2.5 bg-[#49BBBD] hover:bg-[#49BBBD]/90 z-50 rounded-full group transition-all duration-500 ease-in-out flex items-center justify-center">
              <Plus className="h-4 w-4 group-hover:animate-bounce" />
							<span className="hidden group-hover:block animate-[fadeIn_1s_ease-in-out]">Thêm từ mới</span>
            </Button>
        ) : (
          <Button className="bg-[#49BBBD] hover:bg-[#49BBBD]/90">
            <Plus className="mr-2 h-4 w-4" /> Thêm từ mới
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editWord ? "Sửa từ" : "Thêm từ mới"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="englishWord"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Từ tiếng Anh</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập từ tiếng Anh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="definition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Định nghĩa</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập định nghĩa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wordType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại từ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập loại từ (v, n, adj, adv)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="example"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ví dụ (không bắt buộc)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập ví dụ (mỗi ví dụ một dòng)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-[#49BBBD] hover:bg-[#49BBBD]/90"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? editWord
                  ? "Đang sửa..."
                  : "Đang thêm..."
                : editWord
                  ? "Sửa từ"
                  : "Thêm từ mới"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
