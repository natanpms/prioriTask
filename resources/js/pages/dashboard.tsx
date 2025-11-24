import GridDashboard from '@/components/grid-dashboard';
import { GridTaskDate } from '@/components/grid-task-date';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { filterTasksByPriority, filterTasksByStep } from '@/lib/utils';
import { Task, tasksByCategories, tasksDueDate, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Download } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { GrInProgress } from 'react-icons/gr';
import { HiOutlineCollection } from 'react-icons/hi';
import { MdDateRange } from 'react-icons/md';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage();
    const isMobile = useIsMobile();
    const tasks = useMemo(() => (props?.tasks as Task[]) || [], [props.tasks]);
    const tasksByCategories = useMemo(() => (props?.tasksByCategories as tasksByCategories[]) || [], [props.tasksByCategories]);
    const tasksDueDate = useMemo(() => (props.tasksDueDate as tasksDueDate[]) || [], [props.tasksDueDate]);
    const tasksNotDueDate = useMemo(() => (props.tasksNotDueDate as tasksDueDate[]) || [], [props.tasksNotDueDate]);

    const [tasksPending, setTasksPending] = useState<Task[]>([]);
    const [tasksLoading, setTasksLoading] = useState<Task[]>([]);
    const [tasksFinished, setTasksFinished] = useState<Task[]>([]);

    useEffect(() => {
        const pending = filterTasksByStep(tasks, 'pendente');
        const loadingTask = filterTasksByStep(tasks, 'andamento');
        const finishTask = filterTasksByStep(tasks, 'concluido');

        setTasksPending(pending);
        setTasksLoading(loadingTask);
        setTasksFinished(finishTask);
    }, [tasks]);

    const pendingData = useMemo(() => filterTasksByPriority(tasksPending), [tasksPending]);
    const loadingData = useMemo(() => filterTasksByPriority(tasksLoading), [tasksLoading]);
    const finishedData = useMemo(() => filterTasksByPriority(tasksFinished), [tasksFinished]);

    const gridOptions = [
        {
            type: 'pending',
            title: 'Tarefas Pendentes',
            count: tasksPending.length,
            data: pendingData,
            icon: <FaClockRotateLeft className="text-primary/40" />,
        },
        {
            type: 'finished',
            title: 'Tarefas Concluídas',
            count: tasksFinished.length,
            data: finishedData,
            icon: <FaCheck className="text-primary/40" />,
        },
        {
            type: 'loading',
            title: 'Tarefas em Andamento',
            count: tasksLoading.length,
            data: loadingData,
            icon: <GrInProgress className="text-primary/40" />,
        },
    ];

    const gridDate = [
        {
            titleSection: 'Tarefas não concluidas vencidas',
            icon: <MdDateRange className="text-primary/40" />,
            tasks: tasksDueDate,
            type: 'dueDate',
        },
        {
            titleSection: 'Tarefas pendentes',
            icon: <MdDateRange className="text-primary/40" />,
            tasks: tasksNotDueDate,
            type: 'notDue',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-end space-x-2">
                    <span className="text-sm text-primary/60">Gerar Relatório de produtividade</span>
                    <Button variant="outline" size="icon" aria-label="Submit">
                        <Download />
                    </Button>
                </div>
                <div className="grid h-auto auto-rows-min gap-4 md:grid-cols-3">
                    {gridOptions?.map((grid, index) => (
                        <GridDashboard key={index} type={grid.type} title={grid.title} tasksCount={grid.count} tasks={grid.data} icon={grid.icon} />
                    ))}
                </div>

                <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
                    {/* GRID pra mostrar qtd de tarefas por categoria do user */}
                    <div className="grid grid-cols-1 rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <div className="flex items-center justify-between gap-2 space-x-2 px-4 py-3">
                            <div className="flex items-center space-x-2">
                                <div className="rounded-full bg-[#F3F7FD] p-2">
                                    <HiOutlineCollection className="text-primary/40" />
                                </div>
                                <span className="font-medium text-black/40 dark:text-gray-300">Tarefas por categorias</span>
                            </div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">{tasksByCategories?.length}</span>
                        </div>
                        {tasksByCategories?.length > 0 ? (
                            <PieChart width={'100%'} height={400}>
                                <Pie
                                    data={tasksByCategories}
                                    dataKey="tasks_count"
                                    nameKey="name"
                                    outerRadius={isMobile ? 180 : 150}
                                    style={{ cursor: 'pointer', outline: 'none' }}
                                    label
                                >
                                    {tasksByCategories.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>

                                <Tooltip formatter={(value, name, props) => [value, props.payload.name]} />
                            </PieChart>
                        ) : (
                            <span className="text-center font-normal text-gray-400">Nenhuma tarefa encontrada para as categorias</span>
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        {gridDate?.map((grid, index) => (
                            <GridTaskDate key={index} titleSection={grid.titleSection} icon={grid.icon} tasks={grid.tasks} type={grid.type} />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
