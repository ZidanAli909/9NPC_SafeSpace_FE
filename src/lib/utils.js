import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

// Have issue with Tailwind's classes in shadcn/ui? Use this!
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}