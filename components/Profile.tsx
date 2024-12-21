'use client'

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { UserProfileDialog } from "./UserProfileDialog";

const Profile = () => {
  const { data: session } = useSession();
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  if (!session || !session.user) return null;

  async function logout() {
    await signOut({
      redirectTo: "/login",
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="group focus:outline-none">
          <div className="flex items-center gap-3 font-medium text-gray outline-none">
            <Avatar className="size-8">
              <AvatarImage
                src={session.user.avatar || "/assets/icons/profile-circle.svg"}
                alt="avatar"
              />
              <AvatarFallback>{session.user.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="transition-colors duration-300 group-hover:text-[#49BBBD]">
              {session.user.username}
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-base">Tài khoản của tôi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="flex min-w-32 cursor-pointer items-center gap-3 text-base"
            onClick={() => setIsProfileDialogOpen(true)}
          >
            <Image
              src="/assets/icons/profile-circle.svg"
              alt="profile"
              width={20}
              height={20}
            />
            Hồ sơ
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex min-w-32 cursor-pointer items-center gap-3 text-base"
            onClick={logout}
          >
            <Image
              src="/assets/icons/logout-circle.svg"
              alt="logout"
              width={20}
              height={20}
            />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserProfileDialog
        isOpen={isProfileDialogOpen}
        onClose={() => setIsProfileDialogOpen(false)}
        userId={session.user.id!}
        initialUsername={session.user.username || ''}
        initialEmail={session.user.email || ''}
        initialAvatarUrl={session.user.avatar || '/assets/icons/profile-circle.svg'}
      />
    </>
  );
};

export default Profile;

