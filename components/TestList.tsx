import ExamCard, { ExamCardProps } from "./ExamCard";
type TestListProps = {
  exams: ExamCardProps[];
};

const TestList = ({ exams }: TestListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {exams.map((exam: ExamCardProps) => (
        <ExamCard
          id={exam.id}
          type={exam.type}
          title={exam.title}
          maxScore={exam.maxScore}
          questionCount={exam.questionCount}
          partCount={exam.partCount}
          tags={exam.tags}
          time={exam.time}
        />
      ))}
    </div>
  );
};
export default TestList;
