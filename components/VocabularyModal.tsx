'use client'

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { VocabularyList } from "@/types/vocabulary"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Tiêu đề phải có ít nhất 2 ký tự.",
  }),
})

type VocabularyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
  action: "create" | "edit";
  list: VocabularyList | null;
};

export default function VocabularyModal({ isOpen, onClose, onSave, action, list }: VocabularyModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  useEffect(() => {
    if (list && action === 'edit') {
      form.reset({ title: list.title })
    } else {
      form.reset({ title: "" })
    }
  }, [list, action, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values.title)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{action === 'create' ? 'Tạo danh sách mới' : 'Chỉnh sửa danh sách'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tiêu đề danh sách" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="bg-[#49BBBD] hover:bg-[#49BBBD]/90">
                {action === 'create' ? 'Tạo' : 'Cập nhật'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
