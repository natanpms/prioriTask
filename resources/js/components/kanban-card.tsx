import { useIsMobile } from '@/hooks/use-mobile';
import { useIsTablet } from '@/hooks/use-tablet';
import { formatDateToText, formatFirstLetterToUpperCase, verifyIfDateIsPastDue } from '@/lib/utils';
import { Category, ResponseFlash, SubMenuProps, Task } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { router, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { IoCopyOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { RiDraggable } from 'react-icons/ri';
import { toast } from 'sonner';
import Combobox from './combobox';
import DropdownWrapper from './dropdown-wrapper';

interface KanbanCardProps {
    task: Task;
    id: number;
    onClick?: (task: Task) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task, id, onClick }) => {
    let bgColorPriority;

    switch (task?.priority) {
        case 'baixa':
            bgColorPriority = '#008000';
            break;
        case 'media':
            bgColorPriority = '#FFA500';
            break;
        case 'alta':
            bgColorPriority = '#FF0000';
            break;
        default:
            bgColorPriority = '#f1f1f1f';
    }

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition };
    const { delete: deleteTask } = useForm({});
    const { props } = usePage();
    const response = props.flash as ResponseFlash;
    const categories = (props?.categories as Category[]) || [];
    const isDuePast = verifyIfDateIsPastDue(task.due_date);
    const textDuePast = isDuePast ? 'Venceu' : 'Vence';
    const isMobile = useIsMobile();
    const isTablet = useIsTablet();
    const categoryFiltered = categories.find((category) => category.id === task.category_id);
    const tagColor = categoryFiltered?.color;

    const handleDeleteTask = (taskId: number) => {
        if (!taskId) {
            return toast.error('Falha ao encontrar taskId.');
        }

        deleteTask(route('tasks.destroy', taskId), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(response.success || 'task excluída!');
            },
            onError: (error) => {
                toast.error('Erro ao excluir task:' + error);
            },
        });
    };

    const handleStepChange = (newStep: string) => {
        router.patch(
            route('tasks.update'),
            {
                id: task.id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                due_date: task.due_date,
                category_id: task.category_id,
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
    };

    const subMenuOptions: SubMenuProps[] = [
        {
            title: 'Copiar categoria',
            variant: 'copy',
            icon: <IoCopyOutline />,
            handleClick: () => {
                navigator.clipboard.writeText(categoryFiltered?.name || '');
                toast.success('Categoria copiada!');
            },
        },
        { title: 'Excluir', variant: 'destructive', icon: <MdDelete />, handleClick: () => handleDeleteTask(task.id) },
    ];

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={`space-y-3 rounded-lg border border-gray-200 ${task?.step === 'concluido' ? 'bg-white/70' : 'bg-white'} cursor-pointer p-4 shadow-sm transition-shadow hover:shadow-md`}
            onClick={() => {
                if (typeof onClick === 'function' && task.step !== 'concluido') {
                    onClick(task);
                    return;
                }
                return null;
            }}
        >
            <div className="flex items-center justify-between">
                <div className="space-x-2">
                    <span
                        className={`rounded-md px-2 py-1 text-sm font-semibold text-white`}
                        style={{
                            backgroundColor: tagColor,
                        }}
                    >
                        {categoryFiltered?.name}
                    </span>
                    <span
                        className={`rounded-md px-2 py-1 text-sm font-semibold text-white`}
                        style={{
                            backgroundColor: bgColorPriority,
                        }}
                    >
                        {formatFirstLetterToUpperCase(task?.priority)}
                    </span>
                </div>
                {task.step !== 'concluido' ? (
                    <React.Fragment>
                        <div className="w-auto text-black" onClick={(e) => e.stopPropagation()}>
                            <Combobox
                                name="optStep"
                                groupOptions={[
                                    {
                                        value: 'pendente',
                                        label: 'Pendente',
                                    },
                                    {
                                        value: 'andamento',
                                        label: 'Em Progresso',
                                    },
                                    {
                                        value: 'concluido',
                                        label: 'Concluído',
                                    },
                                ]}
                                value={task.step}
                                onChange={handleStepChange}
                                textPlaceholder="Mover para..."
                            />
                        </div>
                        {!isMobile && !isTablet && (
                            <div {...listeners} onClick={(e) => e.stopPropagation()} className="cursor-move p-2 text-black">
                                <RiDraggable />
                            </div>
                        )}
                    </React.Fragment>
                ) : null}

                {task.step === 'concluido' && (
                    <div>
                        <IoMdCheckmarkCircle size={25} className="text-green-500" />
                    </div>
                )}
            </div>
            <h3 className="font-bold text-gray-800">{formatFirstLetterToUpperCase(task.title)}</h3>
            <p className="text-sm text-gray-500">{task.description}</p>
            <div className="flex items-center justify-between">
                <p className={`text-xs font-medium ${isDuePast ? 'text-red-500' : 'text-gray-500'} `}>
                    {textDuePast} {formatDateToText(task.due_date)}
                </p>
                {task.step !== 'concluido' && (
                    <div className="flex items-center gap-2">
                        <div onClick={(e) => e.stopPropagation()}>
                            <DropdownWrapper iconPrincipal={<FaEdit className="h-4 w-4" />} subMenuOptions={subMenuOptions} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
