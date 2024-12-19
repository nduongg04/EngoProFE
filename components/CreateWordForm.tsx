'use client'

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
import { Textarea } from "@/components/ui/textarea"
import { Plus } from 'lucide-react'

const formSchema = z.object({
  englishWord: z.string().min(1, { message: "Từ tiếng Anh là bắt buộc" }),
  definition: z.string().min(1, { message: "Định nghĩa là bắt buộc" }),
  wordType: z.string().min(1, { message: "Loại từ là bắt buộc" }),
  example: z.string().min(1, { message: "Ví dụ là bắt buộc" }),
})

export function CreateWordForm() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      englishWord: "",
      definition: "",
      wordType: "",
      example: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#49BBBD] hover:bg-[#49BBBD]/90">
          <Plus className="mr-2 h-4 w-4" /> Thêm từ mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm từ mới</DialogTitle>
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
                    <Input placeholder="Nhập loại từ" {...field} />
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
                  <FormLabel>Ví dụ</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Nhập ví dụ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-[#49BBBD] hover:bg-[#49BBBD]/90">Thêm từ</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

