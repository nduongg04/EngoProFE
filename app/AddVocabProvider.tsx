"use client";

import { CreateWordForm } from "@/components/CreateWordForm";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const AddVocabProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const excludePath = [
    "/login",
    "/register",
    "/admin",
  ];

  const isExcludePath = excludePath.some((path) => pathname.includes(path));
  return (
    <div>
      {!isExcludePath && pathname !== "/" && (
        <CreateWordForm open={open} setOpen={setOpen} isGlobal={true} />
      )}
      {children}
    </div>
  );
};

export default AddVocabProvider;
