import { KanbanColumn } from '@/components/kanban-column';
import { DialogWrapper } from '@/components/ui/dialog-wrapper';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useDialog } from '@/hooks/use-dialog';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Category, ColumnTask, ResponseFlash, Task } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { toast } from 'sonner';

const Tasks: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
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

    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

    useEffect(() => {
        setColumns([
            { title: 'Pendente', tasks: tasks.filter((t) => t.step?.toLowerCase().includes('pendente')) },
            { title: 'Em Progresso', tasks: tasks.filter((t) => t.step?.toLowerCase().includes('andamento')) },
            { title: 'Concluído', tasks: tasks.filter((t) => t.step?.toLowerCase().includes('concluido')) },
        ]);
        setFilteredTasks(tasks);
    }, [tasks]);

    const { data, setData, reset, errors, post , processing} = useForm({
        title: '',
        description: '',
        priority: '',
        step: 'pendente',
        category_id: '',
        due_date: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Tarefas', href: '/tasks' }];
    const { onOpen, onClose, isOpen } = useDialog();
    const response = props.flash as ResponseFlash;

    // Função para mover task entre colunas
    const moveTask = (taskId: number, fromColumnIndex: number, toColumnIndex: number, toTaskIndex: number) => {
        if (fromColumnIndex === toColumnIndex) return;

        const newColumns = [...columns];
        const taskIndex = newColumns[fromColumnIndex].tasks.findIndex((t) => t.id === taskId);
        const [task] = newColumns[fromColumnIndex].tasks.splice(taskIndex, 1);

        newColumns[toColumnIndex].tasks.splice(toTaskIndex, 0, task);
        setColumns(newColumns);
    };

    const handleNewTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('tasks.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
                toast.success(response.success || 'Task criada com sucesso!');
            },
            onError: () => {
                Object.values(errors).forEach((err) => toast.error(err as string));
            },
        });
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
                        <div className="flex w-auto justify-start">
                            <button
                                type="button"
                                className="flex w-full cursor-pointer items-center space-x-2 rounded-md border-2 border-primary bg-white p-1 text-primary transition-transform duration-200 hover:scale-105 sm:w-1/4 md:w-full"
                                onClick={() => onOpen()}
                            >
                                <FaPlus size={14} />
                                <span className="text-center">Adicionar</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {columns.map((column, index) => (
                        <KanbanColumn
                            key={index}
                            columnIndex={index}
                            title={column.title}
                            tasks={column.tasks.filter((task) => filteredTasks.includes(task))}
                            columns={columns}
                            moveTask={moveTask}
                        />
                    ))}
                </div>

                {isOpen && (
                    <DialogWrapper
                        title={'Adicionar Task'}
                        isOpen={isOpen}
                        onClose={onClose}
                        buttonText={'Confirmar alterações'}
                        processing={processing}
                        handleClick={() => formRef.current?.requestSubmit()}
                    >
                        <form ref={formRef} onSubmit={handleNewTask} className="space-y-4">
                            <div>
                                <label className="mb-2 block font-semibold text-gray-700">Título</label>
                                <Input
                                    name="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Ex: Estudar programação..."
                                    className="w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold text-gray-700">Descrição</label>
                                <Textarea
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Descreva os detalhes da tarefa..."
                                />
                            </div>

                            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block font-semibold text-gray-700">Prioridade</label>
                                    <Select name="priority" value={data.priority} onValueChange={(value) => setData('priority', value)} required>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione a prioridade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="baixa">Baixa</SelectItem>
                                                <SelectItem value="media">Média</SelectItem>
                                                <SelectItem value="alta">Alta</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="mb-1 block font-semibold text-gray-700">Status</label>
                                    <Input type="hidden" name="step" value="pendente" />
                                    <Select name="step" value="pendente" disabled>
                                        <SelectTrigger className="w-full">
                                            <SelectValue defaultValue="pendente" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="pendente">Pendente</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block font-semibold text-gray-700">Categoria</label>
                                    <Select
                                        name="category_id"
                                        value={data.category_id}
                                        onValueChange={(value) => setData('category_id', value)}
                                        required
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione a categoria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={String(category.id)}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="mb-2 block font-semibold text-gray-700">Data de vencimento</label>
                                    <Input
                                        name="due_date"
                                        type="date"
                                        value={data.due_date}
                                        onChange={(e) => setData('due_date', e.target.value)}
                                        className="w-full"
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </DialogWrapper>
                )}
            </div>
        </AppLayout>
    );
};

export default Tasks;
