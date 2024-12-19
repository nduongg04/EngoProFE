import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface TimeOutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function TimeOutModal({ isOpen, onClose, onConfirm }: TimeOutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">Thời gian đã hết</DialogTitle>
          <DialogDescription>
            Thời gian đã hết. Bạn có chắc chắn muốn nộp bài không?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Hủy bài thi</Button>
          <Button onClick={onConfirm}>Nộp bài</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

