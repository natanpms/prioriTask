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

export type Category = {
    id: string
    name: string
    color: string
}

type subMenuProps = {
    title: string;
    variant: "default" | "destructive" | "edit" | "copy";
    icon: JSX.Element;
    handleClick: () => void;
}

const subMenuOptions: subMenuProps[] = [
    { title: 'Copiar ID', variant: 'copy', icon: <IoCopyOutline />, handleClick: () => { } },
    { title: 'Editar categoria', variant: 'edit', icon: <MdModeEdit />, handleClick: () => { } },
    { title: 'Excluir categoria', variant: 'destructive', icon: <MdDelete />, handleClick: () => { } },
];

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {

            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nome
                    <ArrowUpDown />
                </Button>
            )
        },
    },
    {
        accessorKey: "color",
        header: "Cor",
        cell: ({ row }) => {

            return (
                <div className="flex justify-between items-center gap-2 w-full">
                    <div className="flex items-center gap-2">
                        <div
                            className="h-5 w-5 rounded"
                            style={{ backgroundColor: row.original.color }}
                        >

                        </div>
                        <span>{row.original.color}</span>
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
                            {subMenuOptions?.map((sub, index) => (
                                <div className="flex justify-start items-center">
                                    <DropdownMenuItem
                                        className={`w-full cursor-pointer`}
                                        key={index}
                                        variant={sub.variant}
                                        onClick={sub.handleClick}
                                    >
                                        {sub.title}
                                        <div>
                                            {sub.icon}
                                        </div>
                                    </DropdownMenuItem>
                                </div>
                            ))}

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    }
]