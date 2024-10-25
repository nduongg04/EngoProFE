import { AIIcon } from "./ai-icon";
import Markdown from "react-markdown";
type AiMessageProps = {
    message: string;
};

export const AIMessage = ({ message }: AiMessageProps) => {
    return (
        <div className="flex gap-2">
            <AIIcon />
            <div className="max-w-[60%] rounded-[11px] bg-darkGreen px-5 py-2 text-white">
                <Markdown>{message}</Markdown>
            </div>
        </div>
    );
};
