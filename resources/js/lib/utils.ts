import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getMinutesOrSecondsAgo(date: Date | null) {
    if (!date) {
        return 0;
    }
    const now = new Date();
    const secondsAgo = (now.getTime() - date.getTime()) / 1000;
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo > 0) {
        return `${minutesAgo} minutes ago`;
    }
    return `${Math.floor(secondsAgo)} seconds ago`;
}
