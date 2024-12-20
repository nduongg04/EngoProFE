import { UploadToeicForm } from '@/components/admin/UploadToeicForm'

export default function UploadToeicPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#49BBBD]">Tải lên bài kiểm tra TOEIC</h1>
      <UploadToeicForm />
    </div>
  )
}

