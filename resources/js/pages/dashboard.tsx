import GridDashboard from '@/components/grid-dashboard';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { filterTasksByStep } from '@/lib/utils';
import { Task, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { GrInProgress } from 'react-icons/gr';
import { MdOutlineTaskAlt } from 'react-icons/md';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage();

    const tasks = useMemo(() => {
        return (props?.tasks as Task[]) || [];
    }, [props.tasks]);

    const [tasksPending, setTasksPending] = useState<Task[]>([]);
    const [tasksLoading, setTasksLoading] = useState<Task[]>([]);
    const [tasksFinished, setTasksFinished] = useState<Task[]>([]);

    useEffect(() => {
        const pending = filterTasksByStep(tasks, 'pendente');
        setTasksPending(pending);

        const loadingTask = filterTasksByStep(tasks, 'andamento');
        setTasksLoading(loadingTask);

        const finished = filterTasksByStep(tasks, 'concluido');
        setTasksFinished(finished);
    }, [tasks]);

    const pendingData = useMemo(() => {
        const low = tasksPending.filter((t) => t.priority === 'baixa').length;
        const medium = tasksPending.filter((t) => t.priority === 'media').length;
        const high = tasksPending.filter((t) => t.priority === 'alta').length;

        return [
            { priority: 'Baixa', Qtd: low, color: '#008000' },
            { priority: 'Média', Qtd: medium, color: '#FFA500' },
            { priority: 'Alta', Qtd: high, color: '#FF0000' },
        ];
    }, [tasksPending]);

    const loadingData = useMemo(() => {
        const low = tasksLoading.filter((t) => t.priority === 'baixa').length;
        const medium = tasksLoading.filter((t) => t.priority === 'media').length;
        const high = tasksLoading.filter((t) => t.priority === 'alta').length;

        return [
            { priority: 'Baixa', Qtd: low, color: '#008000' },
            { priority: 'Média', Qtd: medium, color: '#FFA500' },
            { priority: 'Alta', Qtd: high, color: '#FF0000' },
        ];
    }, [tasksLoading]);

    const FinishData = useMemo(() => {
        const low = tasksFinished.filter((t) => t.priority === 'baixa').length;
        const medium = tasksFinished.filter((t) => t.priority === 'media').length;
        const high = tasksFinished.filter((t) => t.priority === 'alta').length;

        return [
            { priority: 'Baixa', Qtd: low, color: '#008000' },
            { priority: 'Média', Qtd: medium, color: '#FFA500' },
            { priority: 'Alta', Qtd: high, color: '#FF0000' },
        ];
    }, [tasksFinished]);

    const gridOptions = [
        {
            type: 'pending',
            title: 'Tarefas Pendentes',
            count: tasksPending.length,
            data: pendingData,
            icon: <FaClockRotateLeft className="text-black/40" />,
        },
        {
            type: 'loading',
            title: 'Tarefas em Andamento',
            count: tasksLoading.length,
            data: loadingData,
            icon: <GrInProgress className="text-black/40" />,
        },
        {
            type: 'finished',
            title: 'Tarefas concluídas',
            count: tasksFinished.length,
            data: FinishData,
            icon: <MdOutlineTaskAlt className="text-black/40" />,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {gridOptions?.map((grid, index) => (
                        <GridDashboard key={index} type={grid.type} title={grid.title} tasksCount={grid.count} tasks={grid.data} icon={grid.icon} />
                    ))}
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
