type Props = {
  vocab: string;
  wordType: string;
  examples: string[];
};

const FrontComponent = ({ vocab, wordType, examples }: Props) => {
  return (
    <div className="flex h-full flex-col gap-2 px-20 pb-16 pt-20">
      <p className="text-[30px] font-medium">
        {vocab} ({wordType})
      </p>
      <p className="text-[22px] font-medium">Ví dụ</p>
      <ul className="list ml-5 list-inside list-disc overflow-scroll break-words text-[22px]">
        {examples.map((item, index) => (
          <li key={index}> {item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FrontComponent;
