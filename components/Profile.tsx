import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const Profile = () => {
	
    const [username, setUsername] = useState("Nguyễn Văn A");
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
                <div className="text-gray flex items-center gap-3 font-medium outline-none">
                    <Avatar>
                        <AvatarImage src="/assets/images/avatar-placeholder.jpg" />
                        <AvatarFallback className="bg-lightGreen text-white">
                            CN
                        </AvatarFallback>
                    </Avatar>
                    {username}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default Profile;
