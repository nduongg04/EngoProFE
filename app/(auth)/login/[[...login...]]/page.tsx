"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { signIn } from "next-auth/react";

import { Icons } from "@/components/Icons";
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
import { useToast } from "@/hooks/use-toast";
import { getMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const handleSocialLogin = (provider: string) => {
	signIn(provider, { callbackUrl: "/" });
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        switch (result.error) {
          case "CredentialsSignin":
            throw new Error("Invalid credentials");

          default:
            console.error(result.error);
            throw new Error("An error occurred");
        }
      }

      router.push("/");
      router.refresh(); // This will update the session on the client-side
    } catch (error) {
      const message = getMessage(error);
      form.setError("root", {
        type: "manual",
        message,
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#49BBBD]/20 to-white p-2" >
      <Card className="w-full max-w-md rounded-xl border border-[#49BBBD]/20 bg-white/95 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
        <CardHeader className="space-y-0 pb-2 pt-4 text-center">
          <h2 className="text-gray-800 text-2xl font-bold">Welcome Back</h2>
          <p className="text-gray-600 text-sm">Log in to your account</p>
        </CardHeader>
        <CardContent className="pb-4 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                        className="h-8 text-sm"
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
                          disabled={isPending}
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="h-8 pr-8 text-sm"
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
              <div className="flex items-center justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#49BBBD] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
							{form.formState.errors.root && (
                    <FormMessage className="text-red-500">
                        {form.formState.errors.root.message}
                    </FormMessage>
                )}
              <Button
                disabled={isPending}
                type="submit"
                className="mt-2 h-8 w-full bg-[#49BBBD] text-sm text-white hover:bg-[#49BBBD]/90 disabled:cursor-not-allowed"
              >
                {isPending ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </Form>
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="text-gray-500 bg-white px-2 text-sm">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            type="button"
            className="h-8 w-full text-sm"
            onClick={() => handleSocialLogin("google")}
          >
            <Icons.google className="mr-2 h-3 w-3" />
            Continue with Google
          </Button>
          <p className="text-gray-600 mt-2 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#49BBBD] hover:underline">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
