"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { authenticatedFetch } from "@/lib/actions/fetch.action";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface UserProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  initialUsername: string;
  initialEmail: string;
  initialAvatarUrl: string;
}

export function UserProfileDialog({
  isOpen,
  onClose,
  userId,
  initialUsername,
  initialEmail,
  initialAvatarUrl,
}: UserProfileDialogProps) {
  const [username, setUsername] = useState(initialUsername);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(initialAvatarUrl);
  const { toast } = useToast();
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setUsername(initialUsername);
      setAvatarPreview(initialAvatarUrl);
      setAvatarFile(null);
    }
  }, [isOpen, initialUsername, initialAvatarUrl]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("username", username);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      const data = await authenticatedFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`,
        {
          method: "PATCH",
          body: formData,
        },
      );
      console.log(data);
      if (!data.message) {
        await update({
          user: {
            ...session?.user,
            username: username,
            avatar: data.avatar,
          },
        });
        toast({
          title: "Thông tin đã được cập nhật",
          description: "Thông tin cá nhân của bạn đã được cập nhật thành công.",
          variant: "success",
        });
        onClose();
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thông tin cá nhân</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarPreview} alt={username} />
              <AvatarFallback>
                {username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Label
              htmlFor="avatar"
              className="cursor-pointer text-sm text-[#49BBBD] hover:underline"
            >
              Thay đổi ảnh đại diện
            </Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Tên người dùng</Label>
            <Input
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={initialEmail} disabled />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#49BBBD] hover:bg-[#3DA8A9]"
            disabled={
              isLoading || (username === initialUsername && !avatarFile)
            }
          >
            {isLoading ? "Đang cập nhật..." : "Cập nhật thông tin"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
