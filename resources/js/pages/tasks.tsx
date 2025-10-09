import { KanbanColumn } from '@/components/kanban-column';
import { DialogWrapper } from '@/components/ui/dialog-wrapper';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useDialog } from '@/hooks/use-dialog';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ColumnTask } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';

// --- Dados de exemplo ---
const kanbanData: ColumnTask[] = [
    {
        title: 'Pendente',
        tasks: [
            {
                id: 1,
                tag: 'Research',
                tagColor: 'bg-blue-200 text-blue-800',
                title: 'Auditing information architecture',
                description: 'Create content for peceland App',
                date: 'Aug 20, 2021',
                assignees: ['https://i.pravatar.cc/24?img=4'],
            },
            {
                id: 2,
                tag: 'Content',
                tagColor: 'bg-orange-200 text-orange-800',
                title: 'Update support documentation',
                description: 'Create content for peceland App',
                date: 'Aug 16, 2021',
                assignees: ['https://i.pravatar.cc/24?img=6'],
            },
        ],
    },
    {
        title: 'Em andamento',
        tasks: [
            {
                id: 3,
                tag: 'Research',
                tagColor: 'bg-blue-200 text-blue-800',
                title: 'Qualitative research planning',
                description: 'Create content for peceland App',
                date: 'Aug 20, 2021',
                assignees: ['https://i.pravatar.cc/24?img=7'],
            },
        ],
    },
    {
        title: 'Concluído',
        tasks: [
            {
                id: 4,
                tag: 'Content',
                tagColor: 'bg-orange-200 text-orange-800',
                title: 'Update support documentation',
                description: 'Create content for peceland App',
                date: 'Aug 16, 2021',
                assignees: ['https://i.pravatar.cc/24?img=6'],
            },
        ],
    },
];

const Tasks: React.FC = () => {
    const [columns, setColumns] = useState<ColumnTask[]>(kanbanData);
    const { props } = usePage();
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Tarefas', href: '/tasks' }];
    const { onOpen, onClose, isOpen } = useDialog();

    // Função para mover task entre colunas
    const moveTask = (taskId: number, fromColumnIndex: number, toColumnIndex: number, toTaskIndex: number) => {
        if (fromColumnIndex === toColumnIndex) return;

        const newColumns = [...columns];
        const taskIndex = newColumns[fromColumnIndex].tasks.findIndex((t) => t.id === taskId);
        const [task] = newColumns[fromColumnIndex].tasks.splice(taskIndex, 1);

        newColumns[toColumnIndex].tasks.splice(toTaskIndex, 0, task);
        setColumns(newColumns);
    };

    const handleAddTask = () => {
        // Lógica para adicionar uma nova task
        console.log('Adicionar nova task');
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
                            <Input placeholder="Filtrar categorias..." className="w-full" />
                            <div className="absolute top-0 right-0 flex h-full w-10 items-center justify-center text-primary">
                                <FaSearch />
                            </div>
                        </div>
                        <div className="flex w-full justify-start md:w-auto">
                            <button
                                type="button"
                                className="flex w-1/3 cursor-pointer items-center space-x-2 rounded-md border-2 border-primary bg-white p-1 text-primary transition-transform duration-200 hover:scale-105 sm:w-1/4 lg:w-full"
                                onClick={() => onOpen()}
                            >
                                <FaPlus size={14} />
                                <span className="text-center">Adicionar</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {columns.map((column, index) => (
                        <KanbanColumn
                            key={column.title}
                            columnIndex={index}
                            title={column.title}
                            tasks={props.tasks}
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
                        handleClick={() => handleAddTask()}
                    >
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block font-semibold text-gray-700">Título</label>
                                <Input type="text" placeholder="Ex: Estudar programação..." className="w-full" />
                            </div>
                            <div>
                                <label className="mb-2 block font-semibold text-gray-700">Descrição</label>
                                <Textarea placeholder="Descreva os detalhes da tarefa. Ex: realizar exercícios de javascript" id="task-field" />
                            </div>
                            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block font-semibold text-gray-700">Prioridade</label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione a prioridade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {[
                                                    {
                                                        label: 'Baixa',
                                                        value: 'baixa',
                                                    },
                                                    {
                                                        label: 'Média',
                                                        value: 'media',
                                                    },
                                                    {
                                                        label: 'Alta',
                                                        value: 'alta',
                                                    },
                                                ].map((priority, index) => (
                                                    <SelectItem key={index} value={priority?.value}>
                                                        {priority?.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="mb-1 block font-semibold text-gray-700">Status</label>
                                    <Select value='pendente' disabled>
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
                            <div>
                                 <label className="mb-2 block font-semibold text-gray-700">Data e vencimento</label>
                                <Input type="date" className="w-full lg:w-1/3" />
                            </div>
                        </div>
                    </DialogWrapper>
                )}
            </div>
        </AppLayout>
    );
};

export default Tasks;
