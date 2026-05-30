import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Generate an array of realistic mock data
export const generateId = () => Math.random().toString(36).substr(2, 9);
