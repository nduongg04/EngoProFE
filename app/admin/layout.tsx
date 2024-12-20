import HeaderAdminHomeWhite from "@/components/HeaderAdminHomeWhite";
import React from "react";

const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-1 flex-col">
      <HeaderAdminHomeWhite />
      {children}
    </main>
  );
};

export default HeaderLayout;
