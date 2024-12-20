import HeaderHomeWhite from "@/components/HeaderHomeWhite";
import React from "react";

const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-1 flex-col">
      <HeaderHomeWhite />
      {children}
    </main>
  );
};

export default HeaderLayout;
