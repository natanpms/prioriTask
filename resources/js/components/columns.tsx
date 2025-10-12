import { Button } from '@/components/ui/button';
import { Category, SubMenuProps } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { IoCopyOutline } from 'react-icons/io5';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import DropdownWrapper from './dropdown-wrapper';

type HandlersCategory = {
    onOpenLocal: (typeCategory: 'edit' | 'delete', category: Category) => void;
    onCopy?: (category: Category) => void;
};

export const columnsComponent = (handlers: HandlersCategory): ColumnDef<Category>[] => [
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Nome <ArrowUpDown />
            </Button>
        ),
    },
    {
        accessorKey: 'color',
        header: 'Cor',
        cell: ({ row }) => {
            const category = row.original;

            const subMenuOptions: SubMenuProps[] = [
                { title: 'Copiar categoria', variant: 'copy', icon: <IoCopyOutline />, handleClick: () => handlers.onCopy?.(category) },
                { title: 'Editar', variant: 'edit', icon: <MdModeEdit />, handleClick: () => handlers.onOpenLocal('edit', category) },
                { title: 'Excluir', variant: 'destructive', icon: <MdDelete />, handleClick: () => handlers.onOpenLocal('delete', category) },
            ];

            return (
                <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded" style={{ backgroundColor: category.color }} />
                        <span>{category.color}</span>
                    </div>
                    <DropdownWrapper iconPrincipal={<MoreHorizontal className="h-4 w-4" />} subMenuOptions={subMenuOptions} />
                </div>
            );
        },
    },
];
