import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { JSX } from "react"
import { MdDelete, MdModeEdit } from "react-icons/md"
import { IoCopyOutline } from "react-icons/io5"
import { Category } from "@/types"


type subMenuProps = {
    title: string;
    variant: "default" | "destructive" | "edit" | "copy";
    icon: JSX.Element;
    handleClick: () => void;
}


type HandlersCategory = {
    onOpenLocal: (typeCategory: 'edit' | 'delete', category : Category) => void;
    onCopy?: (category: Category) => void;  
}

export const columnsComponent = (handlers: HandlersCategory): ColumnDef<Category>[] => [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nome <ArrowUpDown />
                </Button>
            ),
        },
        {
            accessorKey: "color",
            header: "Cor",
            cell: ({ row }) => {
                const category = row.original;

                const subMenuOptions: subMenuProps[] = [
                    { title: "Copiar categoria", variant: "copy", icon: <IoCopyOutline />, handleClick: () => handlers.onCopy?.(category) },
                    { title: "Editar", variant: "edit", icon: <MdModeEdit />, handleClick: () => handlers.onOpenLocal('edit', category) },
                    { title: "Excluir", variant: "destructive", icon: <MdDelete />, handleClick: () => handlers.onOpenLocal('delete', category) },
                ];

                return (
                    <div className="flex justify-between items-center gap-2 w-full">
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded" style={{ backgroundColor: category.color }} />
                            <span>{category.color}</span>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Opções</DropdownMenuLabel>
                                {subMenuOptions.map((sub, idx) => (
                                    <DropdownMenuItem
                                        key={idx}
                                        className="flex justify-between items-center cursor-pointer"
                                        variant={sub.variant}
                                        onClick={sub.handleClick}
                                    >
                                        {sub.title} {sub.icon}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ];