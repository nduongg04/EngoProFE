import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { VocabularyList } from "@/types/vocabulary"
import { Clock, Edit } from "lucide-react"

interface VocabularyCardProps {
  list: VocabularyList;
  onEdit: () => void;
}

export default function VocabularyCard({ list, onEdit }: VocabularyCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow relative">
      <Button
        onClick={onEdit}
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 hover:bg-[#49BBBD]/10"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{list.totalWords} từ</span>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{list.date}</span>
          </div>
        </div>

        <h3 className="font-medium text-xl mb-4">{list.title}</h3>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline" 
          className="w-full hover:bg-[#49BBBD] hover:text-white"
        >
          Học
        </Button>
      </CardFooter>
    </Card>
  )
}

