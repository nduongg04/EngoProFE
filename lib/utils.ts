import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function onpenLink(url: string) {
    const win = window.open(url, "_blank");
    if (win != null) {
        win.focus();
    }
}
