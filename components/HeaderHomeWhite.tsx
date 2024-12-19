"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import Profile from "./Profile";

const HeaderHomeWhite = () => {
  const pathName = usePathname();
  const navigations = [
    {
      name: "Câu hỏi AI",
      path: "/ai-generated-questions",
    },
    {
      name: "Đề thi",
      path: "/tests",
    },
    {
      name: "Từ vựng",
      path: "/vocabularies",
    },
  ];

  return (
    <div className="shadow-gray/6 sticky left-0 top-0 z-10 flex items-center justify-between bg-white px-10 py-3 shadow-md">
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
            {navigations.map((nav, index) => (
              <li key={index}>
                <Link
                  className={cn(
                    "p-1 font-medium text-gray transition-colors duration-300 hover:text-lightGreen",
                    {
                      "border-b-2 border-gray hover:border-lightGreen":
                        pathName.includes(nav.path),
                    },
                  )}
                  href={nav.path}
                >
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Profile />
      </div>
    </div>
  );
};
export default HeaderHomeWhite;
