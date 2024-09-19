"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "../lib/utils";
import Profile from "./Profile";

const HeaderHome = () => {
    const pathName = usePathname();

    return (
        <div className="shadow-gray/6 sticky left-0 top-0 flex items-center justify-between px-10 py-3 shadow-md">
            <Link href="/">
                <Image
                    src="/assets/icons/logo-white.svg"
                    alt="logo"
                    width={90}
                    height={90}
                />
            </Link>
            <div className="flex items-center gap-40">
                <nav>
                    <ul className="flex gap-10">
                        <li>
                            <Link
                                href="/ai-generated-questions"
                                className={cn(
                                    "text-gray hover:text-lightGreen px-1 py-1 font-medium",
                                    {
                                        "border-gray hover:border-lightGreen text-gray border-b-2":
                                            pathName ===
                                            "/ai-generated-questions",
                                    },
                                )}
                            >
                                Câu hỏi AI
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/tests"
                                className={cn(
                                    "text-gray hover:text-lightGreen px-1 py-1 font-medium",
                                    {
                                        "border-gray hover:border-lightGreen border-b-2":
                                            pathName === "/tests",
                                    },
                                )}
                            >
                                Đề thi
                            </Link>
                        </li>
                        <li className="focus:outline-none focus-visible:outline">
                            <Link
                                href="/vocabularies"
                                className={cn(
                                    "text-gray hover:text-lightGreen px-1 py-1 font-medium",
                                    {
                                        "border-gray hover:border-lightGreen border-b-2":
                                            pathName === "/vocabularies",
                                    },
                                )}
                            >
                                Từ vựng
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Profile />
            </div>
        </div>
    );
};
export default HeaderHome;
