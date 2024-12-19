type HMessageProps = {
    message: string;
};

export const HumanMessage = ({ message }: HMessageProps) => {
    return (
        <div className="max-w-[60%] self-end break-words rounded-[11px] bg-[#F1EDED] px-5 py-2 text-[15px]">
            {message}
        </div>
    );
};
