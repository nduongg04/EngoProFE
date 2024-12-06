import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const OptionComponent = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="group group-hover:opacity-70">
                <div className="flex items-center gap-6">
                    <Image
                        src={"/assets/icons/flash-card.svg"}
                        alt=""
                        width={25}
                        height={25}
                    />
                    <p>FlashCard</p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20">
                <DropdownMenuItem>
                    <div className="flex items-center gap-6">
                        <Image
                            src={"/assets/icons/learn_vocab.svg"}
                            alt=""
                            width={25}
                            height={25}
                        />
                        <p>Học</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <div className="flex items-center gap-6">
                        <Image
                            src={"/assets/icons/match_vocab.svg"}
                            alt=""
                            width={25}
                            height={25}
                        />
                        <p>Ghép nối</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Trở về</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default OptionComponent;
