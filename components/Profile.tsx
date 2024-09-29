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
			<DropdownMenuTrigger className="group focus:outline-none">
				<div className="text-gray flex items-center gap-3 font-medium outline-none">
					<Avatar className="size-8">
						<AvatarImage src="/assets/images/avatar-placeholder.jpg" />
						{/* <AvatarFallback className="bg-lightGreen text-white">
							CN
						</AvatarFallback> */}
						<AvatarFallback className="bg-lightGreen">
							<img 
								src="/assets/images/avatar-placeholder.jpg" 
								alt={username}
								className="w-full h-full object-cover"
							/>
						</AvatarFallback>
					</Avatar>
					<span className="group-hover:text-lightGreen transition-colors duration-300">
						{username}
					</span>
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
