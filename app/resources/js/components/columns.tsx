
import { ColumnDef } from "@tanstack/react-table"

export type Category = {
    id: string;
    name: string;
    color: string;
}

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "name",
        header: "Nome",
    },
    {
        accessorKey: "color",
        header: "Cor",
    }
]