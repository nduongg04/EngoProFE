import Image from "next/image";
import Profile from "./ProfileAI";

const HeaderTestAIBar = () => {
    return (
        <div className="shadow-gray/6 sticky left-0 top-0 z-10 flex items-center justify-between bg-lightGreen px-10 py-3 shadow-md">
            <Image
                src="/assets/icons/logo_white.svg"
                alt="logo"
                width={90}
                height={90}
            />
            <div className="flex items-center gap-40">
                <Profile />
            </div>
        </div>
    );
};

export default HeaderTestAIBar;
