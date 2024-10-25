import { AIIcon } from "./ai-icon";
import ReactLoading from "react-loading";

export const AILoading = () => {
    return (
        <div className="flex gap-2">
            <AIIcon />
            <div className="max-w-[60%] rounded-[11px] bg-darkGreen px-5 py-2 text-white">
                <ReactLoading
                    type="bars"
                    color="white"
                    width={"30px"}
                    height={"30px"}
                />
            </div>
        </div>
    );
};
