"use client";

import { setMinute, setSubject } from "@/lib/store/slice/ai_gen_slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type Props = {
    data: string[];
    type: string;
};

export const CustomComboBox = ({ data, type }: Props) => {
    const [isShowList, setIsShowList] = useState(false);
    const [selectedItem, setSeletedItem] = useState(data[0]);
    const { isValid } = useAppSelector((state) => state.aiQuesSlice);
    const dispatch = useAppDispatch();

    //Method
    function onClick() {
        setIsShowList(!isShowList);
    }
    function onSelect(event: React.MouseEvent<HTMLLIElement>) {
        const content = event.currentTarget.textContent;
        if (content) {
            setSeletedItem(content);
            if (type == "sub") {
                dispatch(setSubject({ subject: content }));
            } else if (type == "min") {
                dispatch(setMinute({ minute: content }));
            }
            setIsShowList(false);
        }
    }

    return (
        <div className="relative flex flex-col gap-2">
            <div
                className="flex w-[200px] cursor-pointer items-center rounded-lg border border-[#AAAAAA] px-3 py-2 italic text-black"
                onClick={onClick}
            >
                <p className="flex flex-1 text-[16px]">{selectedItem}</p>
                <svg
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={cn(
                        "flex transition-all duration-300 ease-in-out",
                        isShowList ? "rotate-180" : "",
                    )}
                >
                    <path
                        d="M10.8065 9.33333H5.19314C4.97153 9.33361 4.75436 9.27897 4.56677 9.17574C4.37917 9.0725 4.22883 8.9249 4.13314 8.75C4.02111 8.54248 3.97797 8.3116 4.00861 8.08367C4.03926 7.85575 4.14246 7.63993 4.30647 7.46083L7.11314 4.48583C7.22328 4.37463 7.35946 4.28545 7.51244 4.22432C7.66542 4.1632 7.83163 4.13157 7.9998 4.13157C8.16798 4.13157 8.33419 4.1632 8.48717 4.22432C8.64015 4.28545 8.77632 4.37463 8.88647 4.48583L11.6931 7.46083C11.8571 7.63993 11.9603 7.85575 11.991 8.08367C12.0216 8.3116 11.9785 8.54248 11.8665 8.75C11.7708 8.9249 11.6204 9.0725 11.4328 9.17574C11.2452 9.27897 11.0281 9.33361 10.8065 9.33333Z"
                        fill="black"
                    />
                </svg>
            </div>
            <div
                className={cn(
                    "absolute top-12 w-full rounded-[18px] border border-[#AAAAAA] bg-white",
                    isShowList ? "block" : "hidden",
                )}
            >
                <ul>
                    {data.map((obj, index) =>
                        index == 0 ? (
                            <li
                                key={index}
                                className="cursor-pointer rounded-t-[18px] hover:bg-[#AAAAAA]"
                                onClick={onSelect}
                            >
                                {obj}
                            </li>
                        ) : index == data.length - 1 ? (
                            <li
                                key={index}
                                className="cursor-pointer rounded-b-[18px] hover:bg-[#AAAAAA]"
                                onClick={onSelect}
                            >
                                {obj}
                            </li>
                        ) : (
                            <li
                                key={index}
                                className="cursor-pointer hover:bg-[#AAAAAA]"
                                onClick={onSelect}
                            >
                                {obj}
                            </li>
                        ),
                    )}
                </ul>
            </div>
            {isValid ? (
                <></>
            ) : (
                <p className="text-[12px] font-light text-red-500">
                    {cn(
                        "Bạn chưa chọn ",
                        type == "sub" ? "chủ đề" : "thời gian",
                    )}
                </p>
            )}
        </div>
    );
};
