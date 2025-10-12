import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDateToText(date: Date | string): string {
    if (!date) return '';

    if (typeof date === 'string') {
        const newDate = new Date(date);
        const day = newDate.getDate();
        const month = newDate.toLocaleString('pt-BR', { month: 'long' });
        const year = newDate.getFullYear();

        return `${day} de ${month}, ${year}`;
    }

    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

export function formatFirstLetterToUpperCase(text: string): string {
    if (!text) return '';
    
    return text.charAt(0).toUpperCase() + text.slice(1);
}
