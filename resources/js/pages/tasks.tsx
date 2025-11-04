import { KanbanCard } from '@/components/kanban-card';
import { KanbanColumn } from '@/components/kanban-column';
import { TaskDialog } from '@/components/task-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDialog } from '@/hooks/use-dialog';
// import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Category, ColumnTask, Task } from '@/types';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter } from '@dnd-kit/core';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { IoWarning } from 'react-icons/io5';
import { toast } from 'sonner';

const Tasks: React.FC = () => {
    const { props } = usePage();
    const categories = (props?.categories as Category[]) || [];
    
    const tasks = useMemo(() => {
        return (props?.tasks as Task[]) || [];
    }, [props.tasks]);

    const [columns, setColumns] = useState<ColumnTask[]>([
        { title: 'Pendente', tasks: [] },
        { title: 'Em Progresso', tasks: [] },
        { title: 'Concluído', tasks: [] },
    ]);

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

    useEffect(() => {
        const pendente = tasks.filter((t) => t.step?.toLowerCase().includes('pendente'));
        const emProgresso = tasks.filter((t) => t.step?.toLowerCase().includes('andamento'));
        const concluido = tasks.filter((t) => t.step?.toLowerCase().includes('concluido'));

        setColumns([
            { title: 'Pendente', tasks: pendente },
            { title: 'Em Progresso', tasks: emProgresso },
            { title: 'Concluído', tasks: concluido },
        ]);
        setFilteredTasks(tasks);
    }, [tasks]);

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Tarefas', href: '/tasks' }];
    const { onOpen, onClose, isOpen } = useDialog();

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const task = tasks.find((t) => t.id === active.id);
        if (task) {
            setActiveTask(task);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveTask(null);
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const originalTask = tasks.find((task) => task.id === active.id);
        const overColumn = columns.find((col) => col.title === over.id || col.tasks.some((t) => t.id === over.id));

        if (originalTask && overColumn) {
            let newStep: 'pendente' | 'andamento' | 'concluido' = 'pendente';
            if (overColumn.title === 'Em Progresso') {
                newStep = 'andamento';
            } else if (overColumn.title === 'Concluído') {
                newStep = 'concluido';
            }

            if (originalTask.step === newStep) {
                return;
            }

            router.patch(
                route('tasks.update'),
                {
                    id: originalTask.id,
                    title: originalTask.title,
                    description : originalTask.description,
                    priority : originalTask.priority, 
                    due_date : originalTask.due_date,
                    category_id : originalTask.category_id,
                    step: newStep,
                },
                {
                    onSuccess: () => {
                        toast.success('Task movida com sucesso!');
                    },
                    onError: (error) => {
                        toast.error('Erro ao mover task: ' + JSON.stringify(error));
                    },
                },
            );
        }
    };

    const handleFilterCategories = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value.trim().toLowerCase();

        if (value === '') {
            setFilteredTasks(tasks);
            return;
        }

        const matchingCategories = categories.filter((category) => category.name.toLowerCase().includes(value)).map((category) => category.id);

        // filtre as tasks de acordo com a categoria digitada
        const filtered = tasks.filter((task) => matchingCategories.includes(task.category_id));

        setFilteredTasks(filtered);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="min-h-screen space-y-3 p-4 font-sans sm:p-6 lg:p-8">
                <div className="flex flex-col items-center justify-between space-y-2 xl:flex-row">
                    <div>
                        <h1 className="text-2xl font-bold tracking-wider text-primary md:text-3xl">Gerenciar Tasks</h1>
                        <p className="font-semibol text-lg tracking-widest text-gray-500 md:text-xl">Adicione, edite ou visualize suas tasks</p>
                    </div>

                    <div className="flex w-full flex-col items-center justify-end space-y-2 md:flex-row md:space-y-0 md:space-x-3">
                        <div className="relative w-full md:w-1/3 xl:w-1/4">
                            <Input placeholder="Filtrar categorias..." className="w-full" onChange={handleFilterCategories} />
                            <div className="absolute top-0 right-0 flex h-full w-10 items-center justify-center text-primary">
                                <FaSearch />
                            </div>
                        </div>
                        <div className={`flex w-full justify-start gap-2 py-2 md:py-0 ${tasks.length > 0 ? 'lg:w-1/5' : 'lg:w-auto'} `}>
                            {categories.length > 0 ? (
                                <button
                                    type="button"
                                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-primary bg-white p-1 text-primary transition-transform duration-200 hover:scale-105 sm:w-1/4 md:w-full"
                                    onClick={() => onOpen()}
                                >
                                    <FaPlus size={14} />
                                    <span>Adicionar</span>
                                </button>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => {
                                            toast.error('Informação importante!', {
                                                description: 'Você precisa criar uma categoria antes de adicionar uma task.',
                                            });
                                        }}
                                    >
                                        <IoWarning />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 xl:grid-cols-3">
                    <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                        {columns.map((column, index) => (
                            <KanbanColumn
                                key={index}
                                id={column.title}
                                title={column.title}
                                tasks={column.tasks.filter((task) => filteredTasks.includes(task))}
                                activeTask={activeTask}
                            />
                        ))}
                        <DragOverlay>{activeTask ? <KanbanCard task={activeTask} id={activeTask.id} /> : null}</DragOverlay>
                    </DndContext>
                </div>

                {isOpen && (
                    <TaskDialog categories={categories} isOpen={isOpen} onCloseDlg={onClose}/>
                )}
            </div>
        </AppLayout>
    );
};

export default Tasks;
