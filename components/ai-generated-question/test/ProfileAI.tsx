import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Profile = () => {
  const { data: session } = useSession();
  if (!session || !session.user) return null;
  return (
    <div className="flex items-center gap-3 font-medium text-gray outline-none">
      <Avatar className="size-8">
        <AvatarImage src="/assets/images/avatar-placeholder.jpg" />
        {/* <AvatarFallback className="bg-lightGreen text-white">
							CN
						</AvatarFallback> */}
        <AvatarFallback className="bg-lightGreen">
          <img
            src={session.user.avatar || "/assets/images/avatar-placeholder.jpg"}
            alt="avatar"
            className="h-full w-full object-cover"
          />
        </AvatarFallback>
      </Avatar>
      <span className="cursor-pointer text-white transition-colors duration-300 hover:text-black">
        {session.user.name}
      </span>
    </div>
  );
};
export default Profile;
