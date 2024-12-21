import { ExamManager } from '@/components/admin/ExamManager'

export default function ManageExamPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#49BBBD]">Nhập bài kiểm tra TOEIC</h1>
      <ExamManager />
    </div>
  )
}

