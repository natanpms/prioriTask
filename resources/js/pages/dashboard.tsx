import GridDashboard from '@/components/grid-dashboard';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { filterTasksByPriority, filterTasksByStep } from '@/lib/utils';
import { Task, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { GrInProgress } from 'react-icons/gr';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage();

    const tasks = useMemo(() => (props?.tasks as Task[]) || [] , [props.tasks]);

    const [tasksPending, setTasksPending] = useState<Task[]>([]);
    const [tasksLoading, setTasksLoading] = useState<Task[]>([]);

    useEffect(() => {
        const pending = filterTasksByStep(tasks, 'pendente');
        const loadingTask = filterTasksByStep(tasks, 'andamento');

        setTasksPending(pending);
        setTasksLoading(loadingTask);
    }, [tasks]);

    const pendingData = useMemo(() => filterTasksByPriority(tasksPending), [tasksPending]);
    const loadingData = useMemo(() => filterTasksByPriority(tasksLoading), [tasksLoading]);

    const gridOptions = [
        {
            type: 'pending',
            title: 'Tarefas Pendentes',
            count: tasksPending.length,
            data: pendingData,
            icon: <FaClockRotateLeft className="text-primary/40" />,
        },
        {
            type: 'loading',
            title: 'Tarefas em Andamento',
            count: tasksLoading.length,
            data: loadingData,
            icon: <GrInProgress className="text-primary/40" />,
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
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
