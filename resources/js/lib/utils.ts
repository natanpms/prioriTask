import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export function formatDateToText(date: Date | undefined): string {
    if (!date) return "";

    return date.toLocaleDateString('pt-BR', {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}
