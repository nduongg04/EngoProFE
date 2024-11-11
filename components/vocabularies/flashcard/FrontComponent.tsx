type Props = {
    vocab: string;
};

const FrontComponent = ({ vocab }: Props) => {
    return (
        <div className="flex h-full items-center justify-center text-[30px] font-semibold">
            {vocab}
        </div>
    );
};

export default FrontComponent;
