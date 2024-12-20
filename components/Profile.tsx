import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Profile = () => {
  const { data: session } = useSession();
  if (!session || !session.user) return null;
  console.log(session.user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group focus:outline-none">
        <div className="flex items-center gap-3 font-medium text-gray outline-none">
          <Avatar className="size-8">
            <Image
              src={session.user.avatar || "/assets/icons/profile-circle.svg"}
              alt="avatar"
              width={32}
              height={32}
            />
          </Avatar>
          <span className="transition-colors duration-300 group-hover:text-lightGreen">
            {session.user.username}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-base">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex min-w-32 cursor-pointer items-center gap-3 text-base">
          <Image
            src="/assets/icons/profile-circle.svg"
            alt="profile"
            width={20}
            height={20}
          />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="flex min-w-32 cursor-pointer items-center gap-3 text-base">
          <Image
            src="/assets/icons/logout-circle.svg"
            alt="logout"
            width={20}
            height={20}
          />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Profile;
