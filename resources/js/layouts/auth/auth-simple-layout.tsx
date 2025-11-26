import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-primary p-3 md:p-6">
            <div className="w-full rounded-lg bg-white p-4 shadow-md md:max-w-md">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-9 w-9 items-center justify-center space-x-4 rounded-md">
                                {/* <img src="/logo.svg" alt="Logo" /> */}
                                <span className="text-xl font-bold text-black lg:text-4xl">PrioriTask</span>
                            </div>
                            <span className="sr-only text-black">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center text-black">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
