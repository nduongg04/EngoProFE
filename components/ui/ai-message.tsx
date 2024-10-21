import { AIIcon } from "./ai-icon";

type AiMessageProps = {
    message: string;
};

export const AIMessage = ({ message }: AiMessageProps) => {
    return (
        <div className="flex gap-2">
            <AIIcon />
            <div className="bg-darkGreen max-w-[60%] rounded-[11px] px-5 py-2 text-white">
                {message}
            </div>
        </div>
    );
};
