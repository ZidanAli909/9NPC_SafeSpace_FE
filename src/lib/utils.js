import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

// Configurations
const defaultTimeZone = "Asia/Jakarta"
const defaultLocales = "id-ID"
// End-of-configurations

// Have issue with Tailwind's classes in shadcn/ui? Use this!
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(isoString, timeZone = defaultTimeZone) {
    return new Date(isoString).toLocaleString(defaultLocales, {
        dateStyle: "long",
        timeStyle: "short",
        timeZone,
    })
}

export function formatDate(isoString, timeZone = defaultTimeZone) {
    return new Date(isoString).toLocaleDateString(defaultLocales, {
        dateStyle: "long",
        timeZone,
    })
}

export function formatTime(isoString, timeZone = defaultTimeZone) {
    return new Date(isoString).toLocaleTimeString(defaultLocales, {
        timeStyle: "short",
        timeZone,
    })
}