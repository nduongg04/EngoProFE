import ExamCard, { ExamCardProps } from "./ExamCard";
type TestListProps = {
    exams: ExamCardProps[];
};

const TestList = ({ exams }: TestListProps) => {
    return (
        <div>
            {exams.map((exam: ExamCardProps) => (
                <ExamCard
                    type={exam.type}
                    title={exam.title}
                    maxScore={exam.maxScore}
                    questionCount={exam.questionCount}
                    partCount={exam.partCount}
                    tags={exam.tags}
                />
            ))}
        </div>
    );
};
export default TestList;
