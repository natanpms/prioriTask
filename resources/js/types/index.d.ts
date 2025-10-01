import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { ReactIcon } from 'react-icons';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | ReactIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar_path?: File | string | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export type ResponseFlash = {
    success?: string;
}

interface ColumnTask {
    title: string;
    tasks: Task[];
}


export interface Task {
    id: number;
    tag: string;
    tagColor?: string;
    image?: string;
    title: string;
    description: string;
    date: string;
    assignees?: string[];
    comments?: number;
    files?: number;
    progress?: { current: number; total: number };
}

export type Category = {
    id: string
    name: string
    color: string
}