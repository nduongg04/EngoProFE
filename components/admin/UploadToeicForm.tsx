'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from '@/hooks/use-toast'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const optionSchema = z.object({
  option: z.string().length(1),
  text: z.string().min(1, 'Nội dung lựa chọn là bắt buộc')
})

const questionSchema = z.object({
  questionNumber: z.number().min(1),
  imageUrl: z.string().optional(),
  options: z.array(optionSchema).length(4),
  correctAnswer: z.string().length(1)
})

const clusterSchema = z.object({
  clusterId: z.string().min(1, 'ID cụm câu hỏi là bắt buộc'),
  imageUrl: z.string().optional(),
  questions: z.array(questionSchema)
})

const partSchema = z.object({
  partNumber: z.number().min(1).max(7),
  instructions: z.string().min(1, 'Hướng dẫn là bắt buộc'),
  questions: z.array(z.union([questionSchema, clusterSchema]))
})

const formSchema = z.object({
  testTitle: z.string().min(1, 'Tiêu đề bài kiểm tra là bắt buộc'),
  book: z.string().min(1, 'Tên sách là bắt buộc'),
  parts: z.array(partSchema).length(7)
})

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export function UploadToeicForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      testTitle: '',
      book: '',
      parts: Array.from({ length: 7 }, (_, i) => ({
        partNumber: i + 1,
        instructions: '',
        questions: []
      }))
    }
  })

  const { fields: partFields } = useFieldArray({
    control: form.control,
    name: 'parts'
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch(`${BASE_URL}/exam/upload-toeic`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      if (!response.ok) {
        throw new Error('Lỗi khi tải lên bài kiểm tra')
      }

      const data = await response.json()
      toast({
        title: 'Tải lên thành công',
        description: `Bài kiểm tra TOEIC "${data.data.testTitle}" đã được tạo.`
      })
      form.reset()
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Đã xảy ra lỗi khi tải lên bài kiểm tra. Vui lòng thử lại.',
        variant: 'destructive'
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="testTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiêu đề bài kiểm tra</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tiêu đề bài kiểm tra" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="book"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sách</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên sách" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Accordion type="single" collapsible className="w-full">
          {partFields.map((part, partIndex) => (
            <AccordionItem key={part.id} value={`part-${part.partNumber}`}>
              <AccordionTrigger>Phần {part.partNumber}</AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="pt-6">
                    <FormField
                      control={form.control}
                      name={`parts.${partIndex}.instructions`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hướng dẫn</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Nhập hướng dẫn cho phần này" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <QuestionsField partIndex={partIndex} partNumber={part.partNumber} />
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Button type="submit" disabled={isSubmitting} className="bg-[#49BBBD] hover:bg-[#3da7a9]">
          {isSubmitting ? 'Đang tải lên...' : 'Tải lên bài kiểm tra'}
        </Button>
      </form>
    </Form>
  )
}

function QuestionsField({ partIndex, partNumber }: { partIndex: number; partNumber: number }) {
  const { control } = useForm()
  const { fields, append } = useFieldArray({
    control,
    name: `parts.${partIndex}.questions`
  })

  const isClusterPart = [3, 4, 6, 7].includes(partNumber)

  return (
    <div className="space-y-4 mt-4">
      {fields.map((field, questionIndex) => (
        <Card key={field.id}>
          <CardContent className="pt-6">
            {isClusterPart ? (
              <ClusterFields partIndex={partIndex} clusterIndex={questionIndex} />
            ) : (
              <QuestionFields partIndex={partIndex} questionIndex={questionIndex} />
            )}
          </CardContent>
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append(isClusterPart ? { clusterId: '', questions: [] } : { questionNumber: fields.length + 1, options: [{}, {}, {}, {}], correctAnswer: '' })}
      >
        {isClusterPart ? 'Thêm cụm câu hỏi' : 'Thêm câu hỏi'}
      </Button>
    </div>
  )
}

function ClusterFields({ partIndex, clusterIndex }: { partIndex: number; clusterIndex: number }) {
  const { control } = useForm()
  const { fields, append } = useFieldArray({
    control,
    name: `parts.${partIndex}.questions.${clusterIndex}.questions`
  })

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name={`parts.${partIndex}.questions.${clusterIndex}.clusterId`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID cụm câu hỏi</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`parts.${partIndex}.questions.${clusterIndex}.imageUrl`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL hình ảnh (tùy chọn)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {fields.map((questionField, questionIndex) => (
        <QuestionFields
          key={questionField.id}
          partIndex={partIndex}
          clusterIndex={clusterIndex}
          questionIndex={questionIndex}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ questionNumber: fields.length + 1, options: [{}, {}, {}, {}], correctAnswer: '' })}
      >
        Thêm câu hỏi
      </Button>
    </div>
  )
}

function QuestionFields({ partIndex, clusterIndex, questionIndex }: { partIndex: number; clusterIndex?: number; questionIndex: number }) {
  const { control } = useForm()
  const fieldPrefix = clusterIndex !== undefined
    ? `parts.${partIndex}.questions.${clusterIndex}.questions.${questionIndex}`
    : `parts.${partIndex}.questions.${questionIndex}`

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name={`${fieldPrefix}.questionNumber`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Số câu hỏi</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {['A', 'B', 'C', 'D'].map((option, index) => (
        <FormField
          key={option}
          control={control}
          name={`${fieldPrefix}.options.${index}.text`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lựa chọn {option}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <FormField
        control={control}
        name={`${fieldPrefix}.correctAnswer`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Đáp án đúng</FormLabel>
            <FormControl>
              <Input {...field} maxLength={1} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

