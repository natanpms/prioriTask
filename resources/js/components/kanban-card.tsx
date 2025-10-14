import { formatDateToText, formatFirstLetterToUpperCase } from '@/lib/utils';
import { Category, SubMenuProps, Task } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { usePage } from '@inertiajs/react';
import { FaEdit } from 'react-icons/fa';
import { IoCopyOutline } from 'react-icons/io5';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import DropdownWrapper from './dropdown-wrapper';
import { toast } from 'sonner';

export const KanbanCard: React.FC<{ task: Task; id: string }> = ({ task, id }) => {
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

    const { props } = usePage();
    const categories = (props?.categories as Category[]) || [];

    const categoryFiltered = categories.find((category) => category.id === task.category_id);
    const tagColor = categoryFiltered?.color;

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
        { title: 'Editar', variant: 'edit', icon: <MdModeEdit />},
        { title: 'Excluir', variant: 'destructive', icon: <MdDelete />},
    ];

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="space-y-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="flex items-center justify-between">
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
            <h3 className="font-bold text-gray-800">{formatFirstLetterToUpperCase(task.title)}</h3>
            <p className="text-sm text-gray-500">{task.description}</p>
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-gray-500">Vence em {formatDateToText(task.due_date)}</p>
                <div onPointerDown={(e) => e.stopPropagation()}>
                    <DropdownWrapper iconPrincipal={<FaEdit className="h-4 w-4" />} subMenuOptions={subMenuOptions} />
                </div>
            </div>
        </div>
    );
};
