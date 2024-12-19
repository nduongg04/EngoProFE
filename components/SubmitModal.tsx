import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface SubmitModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function SubmitModal({ isOpen, onClose, onConfirm }: SubmitModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xác nhận nộp bài</DialogTitle>
          <DialogDescription>
            Bạn chưa trả lời hết các câu hỏi. Bạn có chắc chắn muốn nộp bài không?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Tiếp tục làm bài</Button>
          <Button onClick={onConfirm}>Nộp bài</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

