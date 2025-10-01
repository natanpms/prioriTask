import { Category, ColumnTask } from "@/types";
import { IoIosMore } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { KanbanCard } from "./kanban-card";
import { FaPlus } from "react-icons/fa";
import { useDialog } from "@/hooks/use-dialog";
import { DialogWrapper } from "./ui/dialog-wrapper";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { usePage } from "@inertiajs/react";
import { DatePicker } from "./date-picker";

export const KanbanColumn: React.FC<ColumnTask> = ({ title, tasks }) => {
    const { props } = usePage();
    console.log(props);

    const categories = props.categories as Category[];
    const { onOpen, onClose, isOpen } = useDialog();

    const showCreateTask = ['concluído', 'andamento'].some((status) => title?.toLowerCase().includes(status));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    }

    const typePriority = [
        { value: 'baixa', label: 'Baixa' },
        { value: 'media', label: 'Média' },
        { value: 'alta', label: 'Alta' }
    ];

    return (
        <div className="bg-primary/25 rounded-md p-4 ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-700">{title}</h2>
                {!showCreateTask &&
                    <button
                        type="button"
                        className="flex items-center space-x-2 bg-white cursor-pointer rounded-sm p-1.5 text-primary hover:scale-110 transition-transform duration-200"
                        onClick={onOpen}
                    >
                        <FaPlus size={12} />
                    </button>
                }
            </div>

            <div className="space-y-4 overflow-y-auto scrollbar-thin max-h-[35vh] lg:max-h-[50vh] xl:max-h-[70vh] pr-2">
                {tasks.map((task) => (
                    <KanbanCard key={task.id} task={task} />
                ))}
            </div>

            {isOpen &&
                <DialogWrapper
                    title={'Criar nova tarefa'}
                    isOpen={isOpen}
                    onClose={onClose}
                    // processing={typeModal === 'edit' ? processingUpdate : processingDelete}
                    // buttonText={typeModal === 'edit' ? 'Confirmar alterações' : 'Excluir'}
                    handleClick={() => {
                        console.log('teste')
                    }}
                >

                    <div className="w-full">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="flex flex-col w-full items-start gap-2">
                                    <div className="w-full space-y-2">
                                        <Label htmlFor="titulo">Título <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            placeholder="Editar vídeo..."

                                        />
                                        <Label htmlFor="message">Descrição</Label>
                                        <Textarea placeholder="Descreva mais sobre a tarefa." id="message" />
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                                        <div className="w-full">
                                            <Label htmlFor="categoria">Categoria <span className="text-red-500">*</span></Label>
                                            <Select>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione uma categoria" />
                                                </SelectTrigger>
                                                <SelectContent>

                                                    <SelectGroup>
                                                        {categories.map((category: Category) => (
                                                            <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                                                        ))}

                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="w-full">
                                            <Label htmlFor="prioridade">Prioridade <span className="text-red-500">*</span></Label>
                                            <Select>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione uma prioridade" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {typePriority.map((priority: { value: string; label: string }) => (
                                                            <SelectItem key={priority.value} value={priority.value}>
                                                                {priority.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="due_date">Data de conclusão <span className="text-red-500">*</span></Label>
                                        <DatePicker />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </DialogWrapper>
            }
        </div >
    );
};