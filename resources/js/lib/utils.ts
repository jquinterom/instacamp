import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getMinutesSecondsHoursOrDaysAgo(date: Date | null) {
    if (!date) {
        return 0;
    }
    const now = new Date();
    const secondsAgo = (now.getTime() - date.getTime()) / 1000;
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(secondsAgo / 3600);
    const daysAgo = Math.floor(secondsAgo / 86400);
    if (daysAgo > 0) {
        return `${daysAgo} days ago`;
    }
    if (hoursAgo > 0) {
        return `${hoursAgo} hours ago`;
    }
    if (minutesAgo > 0) {
        return `${minutesAgo} minutes ago`;
    }
    return `${Math.floor(secondsAgo)} seconds ago`;
}

export function formatDate(date?: Date) {
    if (!date) {
        return '';
    }
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
