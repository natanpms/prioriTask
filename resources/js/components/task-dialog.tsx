import { DialogWrapper } from '@/components/ui/dialog-wrapper';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Category, ResponseFlash, Task } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useRef, useEffect } from 'react';
import { toast } from 'sonner';

interface TaskDialogProps {
    isOpen: boolean;
    onClose: () => void;
    task?: Task | null;
    categories: Category[];
}

export const TaskDialog: React.FC<TaskDialogProps> = ({ isOpen, onClose, task, categories }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const { props } = usePage();
    const response = props.flash as ResponseFlash;

    const { data, setData, reset, errors, post, put, processing } = useForm({
        id: task?.id || '',
        title: task?.title || '',
        description: task?.description || '',
        priority: task?.priority || '',
        step: task?.step || 'pendente',
        category_id: task?.category_id ? String(task.category_id) : '',
        due_date: task?.due_date || '',
    });

    useEffect(() => {
        if (task) {
            setData({
                id: task.id,
                title: task.title,
                description: task.description || '',
                priority: task.priority,
                step: task.step,
                category_id: String(task.category_id),
                due_date: task.due_date,
            });
        } else {
            reset();
        }
    }, [task]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = task ? route('tasks.update', { task: task.id }) : route('tasks.store');
        const method = task ? 'put' : 'post';

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
                toast.success(response.success || `Task ${task ? 'atualizada' : 'criada'} com sucesso!`);
            },
            onError: () => {
                Object.values(errors).forEach((err) => toast.error(err as string));
            },
        };

        if (method === 'put') {
            put(url, options);
        } else {
            post(url, options);
        }
    };

    return (
        <DialogWrapper
            title={task ? 'Editar Task' : 'Adicionar Task'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={task ? 'Confirmar alterações' : 'Adicionar'}
            processing={processing}
            handleClick={() => formRef.current?.requestSubmit()}
        >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
                        <Select name="step" value={data.step} onValueChange={(value) => setData('step', value as 'pendente' | 'andamento' | 'concluido')}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="pendente">Pendente</SelectItem>
                                    <SelectItem value="andamento">Em Progresso</SelectItem>
                                    <SelectItem value="concluido">Concluído</SelectItem>
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
    );
};
