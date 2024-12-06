"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import path from "path";
import OptionComponent from "./OptionComponent";

const HeaderVocab = () => {
    return (
        <div className="shadow-gray/6 sticky left-0 top-0 z-10 flex w-full items-center justify-between bg-white px-10 py-3 shadow-md">
            <OptionComponent />
            <p className="font-semibold">19.0</p>
            <div></div>
        </div>
    );
};
export default HeaderVocab;
