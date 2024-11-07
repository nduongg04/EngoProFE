import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMessage (error: unknown) {
	if (error instanceof Error) {
			return error.message;
	} else if (typeof error === "string") {
			return error;
	} else {
			return "An error occurred";
	}
};