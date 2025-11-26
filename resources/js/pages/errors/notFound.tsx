import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { RiArrowRightFill } from 'react-icons/ri';

export default function NotFound() {
    return (
        <div className="grid min-h-screen place-content-center bg-background px-4">
            <Head>
                <title>404 - Página Não Encontrada</title>
            </Head>
            <div className="text-center">
                <h1 className="text-9xl font-black text-foreground/20">404</h1>

                <p className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">Página Não Encontrada</p>

                <p className="mt-4 text-muted-foreground dark:text-gray-200">
                    Ocorreu um problema, a página que você está procurando não foi encontrada.
                </p>
                <Link href={route('dashboard')} className={cn('mt-6 flex items-center text-white', buttonVariants())}>
                    Voltar para o Dashboard <RiArrowRightFill className="h-10 w-10" />
                </Link>
            </div>
        </div>
    );
}
