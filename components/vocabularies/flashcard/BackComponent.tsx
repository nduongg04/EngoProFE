type Props = {
  vocab: string;
  wordType: string;
  definition: string;
};

const BackComponent = ({ vocab, wordType, definition }: Props) => {
  return (
    <div className="flex h-full flex-col gap-2 p-20">
      <p className="text-[30px] font-medium">
        {vocab} ({wordType})
      </p>
      <p className="text-[22px] font-medium">Định nghĩa</p>
      <p className="text-[22px]">{definition}</p>
    </div>
  );
};

export default BackComponent;
