export type ExamCardProps = {	
    type: string;
    title: string;
    maxScore: number;
    questionCount: number;
    partCount: number;
    tags: string[];
};

const ExamCard = ({ type, title, maxScore, questionCount, partCount, tags }: ExamCardProps) => {
  return (
	<div>
		<h1>{title}</h1>
	</div>
  )
};
export default ExamCard;
