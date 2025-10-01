import { KanbanCard } from "@/components/kanban-card";
import { KanbanColumn } from "@/components/kanban-column";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, ColumnTask } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { FaSearch } from "react-icons/fa";


// --- Dados de exemplo ---
const kanbanData: ColumnTask[] = [

    {
        title: "Pendente",
        tasks: [
            {
                id: 4,
                tag: "Research",
                tagColor: "bg-blue-200 text-blue-800",
                title: "Auditing information architecture",
                description: "Create content for peceland App",
                date: "Aug 20, 2021",
                assignees: ["https://i.pravatar.cc/24?img=4", "https://i.pravatar.cc/24?img=5"],
                progress: { current: 0, total: 8 },
            },
            {
                id: 5,
                tag: "Content",
                tagColor: "bg-orange-200 text-orange-800",
                image: "https://placehold.co/600x400/F97316/FFFFFF?text=Content",
                title: "Update support documentation",
                description: "Create content for peceland App",
                date: "Aug 16, 2021",
                assignees: ["https://i.pravatar.cc/24?img=6"],
                progress: { current: 0, total: 8 },
            },
            {
                id: 6,
                tag: "Research",
                tagColor: "bg-blue-200 text-blue-800",
                title: "Qualitative research planning",
                description: "Create content for peceland App",
                date: "Aug 20, 2021",
                assignees: ["https://i.pravatar.cc/24?img=7"],
                progress: { current: 0, total: 8 },
            },
            {
                id: 7,
                tag: "Research",
                tagColor: "bg-blue-200 text-blue-800",
                title: "Qualitative research planning",
                description: "Create content for peceland App",
                date: "Aug 20, 2021",
                assignees: ["https://i.pravatar.cc/24?img=7"],
                progress: { current: 0, total: 8 },
            },
            {
                id: 8,
                tag: "Research",
                tagColor: "bg-blue-200 text-blue-800",
                title: "Qualitative research planning",
                description: "Create content for peceland App",
                date: "Aug 20, 2021",
                assignees: ["https://i.pravatar.cc/24?img=7"],
                progress: { current: 0, total: 8 },
            },
        ],
    },

    {
        title: "Em andamento",
        tasks: [
            {
                id: 4,
                tag: "Research",
                tagColor: "bg-blue-200 text-blue-800",
                title: "Auditing information architecture",
                description: "Create content for peceland App",
                date: "Aug 20, 2021",
                assignees: ["https://i.pravatar.cc/24?img=4", "https://i.pravatar.cc/24?img=5"],
                progress: { current: 0, total: 8 },
            },
            {
                id: 5,
                tag: "Content",
                tagColor: "bg-orange-200 text-orange-800",
                image: "https://placehold.co/600x400/F97316/FFFFFF?text=Content",
                title: "Update support documentation",
                description: "Create content for peceland App",
                date: "Aug 16, 2021",
                assignees: ["https://i.pravatar.cc/24?img=6"],
                progress: { current: 0, total: 8 },
            },
            {
                id: 6,
                tag: "Research",
                tagColor: "bg-blue-200 text-blue-800",
                title: "Qualitative research planning",
                description: "Create content for peceland App",
                date: "Aug 20, 2021",
                assignees: ["https://i.pravatar.cc/24?img=7"],
                progress: { current: 0, total: 8 },
            },
        ],
    },
    {
        title: "Concluído",
        tasks: [
            {
                id: 4,
                tag: "Research",
                tagColor: "bg-blue-200 text-blue-800",
                title: "Auditing information architecture",
                description: "Create content for peceland App",
                date: "Aug 20, 2021",
                assignees: ["https://i.pravatar.cc/24?img=4", "https://i.pravatar.cc/24?img=5"],
                progress: { current: 0, total: 8 },
            },
            {
                id: 5,
                tag: "Content",
                tagColor: "bg-orange-200 text-orange-800",
                image: "https://placehold.co/600x400/F97316/FFFFFF?text=Content",
                title: "Update support documentation",
                description: "Create content for peceland App",
                date: "Aug 16, 2021",
                assignees: ["https://i.pravatar.cc/24?img=6"],
                progress: { current: 0, total: 8 },
            },
            {
                id: 6,
                tag: "Research",
                tagColor: "bg-blue-200 text-blue-800",
                title: "Qualitative research planning",
                description: "Create content for peceland App",
                date: "Aug 20, 2021",
                assignees: ["https://i.pravatar.cc/24?img=7"],
                progress: { current: 0, total: 8 },
            },
        ],
    },
];

const Tasks: React.FC = () => {

   

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Tarefas", href: "/tasks" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="min-h-screen font-sans p-4 sm:p-6 lg:p-8 space-y-3">
                <div className="flex flex-col xl:flex-row  justify-between items-center space-y-2 ">
                    <div>
                        <h1 className="font-bold text-2xl md:text-3xl tracking-wider text-primary">Gerenciar Tasks</h1>
                        <p className="font-semibol tracking-widest text-lg md:text-xl text-gray-500">Adicione, edite ou visualize suas tasks</p>
                    </div>

                    <div className="relative w-full md:w-1/3 xl:w-1/4">
                        <Input
                            id="filtro-categoria"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="categoria"
                            placeholder="Filtrar categorias..."
                        />
                        <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center text-primary">
                            <FaSearch />
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {kanbanData.map((column) => (
                        <KanbanColumn key={column.title} title={column.title} tasks={column.tasks} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Tasks;