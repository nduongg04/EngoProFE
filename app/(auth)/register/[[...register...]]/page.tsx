"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Upload } from "lucide-react";
import Link from "next/link";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { Icons } from "@/components/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/actions/auth.action";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { getMessage } from "@/lib/utils";
import { handleSocialLogin } from "../../login/[[...login...]]/page";

import { useAppDispatch } from "@/lib/store/store";
import { disableAIChat } from "@/lib/store/slice/chat_slice";


const formSchema = z
  .object({
    avatar: z.instanceof(File).optional(),
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(disableAIChat());
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("username", values.fullName);
      formData.append("password", values.password);
      if (values.avatar) {
        formData.append("avatar", values.avatar);
      }

      const data = await signUp(formData);
      console.log(data);

      if (data?.message) {
        console.log("error");
        throw new Error(data.message || "Registration failed");
      } else {
        toast({
          title: "Account created successfully",
          description: "You can now log in with your new account.",
        });
        router.push("/login");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
      form.setError("root", { message: getMessage(error) });
    } finally {
      setIsPending(false);
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("avatar", file);
      const reader = new FileReader();
      reader.onload = (e) => setAvatarSrc(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#49BBBD]/20 to-white p-2">
      <Card className="w-full max-w-md rounded-xl border border-[#49BBBD]/20 bg-white/95 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
        <CardHeader className="space-y-0 pb-2 pt-4 text-center">
          <h2 className="text-gray-800 text-2xl font-bold">Create Account</h2>
          <p className="text-gray-600 text-sm">Sign up to get started</p>
        </CardHeader>
        <CardContent className="pb-4 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="flex items-center space-x-4">
                <FormField
                  control={form.control}
                  name="avatar"
                  render={() => (
                    <FormItem>
                      <FormLabel className="cursor-pointer">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={avatarSrc} alt="Avatar" />
                          <AvatarFallback>
                            <Upload className="text-gray-400 h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          {...field}
                          className="h-8 text-sm"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                        className="h-8 text-sm"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="h-8 pr-8 text-sm"
                          disabled={isPending}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-2 py-1 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="text-gray-400 h-3 w-3" />
                          ) : (
                            <Eye className="text-gray-400 h-3 w-3" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Confirm your password"
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                          className="h-8 pr-8 text-sm"
                          disabled={isPending}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-2 py-1 hover:bg-transparent"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="text-gray-400 h-3 w-3" />
                          ) : (
                            <Eye className="text-gray-400 h-3 w-3" />
                          )}
                          <span className="sr-only">
                            {showConfirmPassword
                              ? "Hide password"
                              : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending}
                className="mt-2 h-8 w-full bg-[#49BBBD] text-sm text-white hover:bg-[#49BBBD]/90 disabled:cursor-not-allowed"
              >
                {isPending ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </Form>
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="text-gray-500 bg-white px-2">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            type="button"
            className="h-8 w-full"
            onClick={() => handleSocialLogin("google")}
          >
            <Icons.google className="mr-2 h-3 w-3" />
            Continue with Google
          </Button>
          <p className="text-gray-600 mt-2 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[#49BBBD] hover:underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
