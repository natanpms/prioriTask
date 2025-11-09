import { Task } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDateToText(date: Date | string): string {
    if (!date) return '';

    const newDate = typeof date === 'string' ? new Date(date) : date;

    const today = new Date();
    const isToday = newDate.getFullYear() === today.getFullYear() && newDate.getMonth() === today.getMonth() && newDate.getDate() === today.getDate();

    if (isToday) {
        return 'Hoje';
    }

    const day = newDate.getDate();
    const month = newDate.toLocaleString('pt-BR', { month: 'long' });
    const year = newDate.getFullYear();

    return `${day} de ${month}, ${year}`;
}

export function formatFirstLetterToUpperCase(text: string): string {
    if (!text) return '';

    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function filterTasksByStep(tasks: Task[], stepKeyword: string) {
    return tasks.filter((t) => t.step?.toLowerCase().includes(stepKeyword.toLowerCase()));
}

export function filterTasksByPriority(tasks: Task[]) {
    const low = tasks.filter((t) => t.priority === 'baixa').length;
    const medium = tasks.filter((t) => t.priority === 'media').length;
    const high = tasks.filter((t) => t.priority === 'alta').length;

    return [
        { priority: 'Baixa', Qtd: low, color: '#008000' },
        { priority: 'Média', Qtd: medium, color: '#FFA500' },
        { priority: 'Alta', Qtd: high, color: '#FF0000' },
    ];
}

// valida se uma data ja passou da data atual
export function verifyIfDateIsPastDue(date: string | Date): boolean {
    const dueDate = new Date(date);
    const currentDate = new Date();

    // seta que o ultimo horario do dia seria 23:59:59 para comparar apenas a data
    dueDate.setHours(23, 59, 59, 999);
    currentDate.setHours(23, 59, 59, 999);

    return dueDate < currentDate;
}
