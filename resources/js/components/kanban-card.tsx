import { Task } from "@/types";
import { CheckCircleIcon, MoreHorizontal, PaperclipIcon } from "lucide-react";
import { FaComment } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export const KanbanCard: React.FC<{ task: Task }> = ({ task }) => {
    const tagColor = task.tagColor ?? "bg-purple-200 text-purple-800";
    const subMenuOptions = [
        { title: "Editar", variant: "edit", icon: <MdModeEdit /> },
        { title: "Excluir", variant: "destructive", icon: <MdDelete /> },
    ];
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:cursor-pointer transition-shadow duration-300">

            <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-md ${tagColor}`}>
                        {task.tag}
                    </span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Opções</DropdownMenuLabel>
                            {subMenuOptions.map((sub, idx) => (
                                <DropdownMenuItem
                                    key={idx}
                                    className="flex justify-between items-center cursor-pointer"
                                // variant={sub.variant}
                                >
                                    {sub.title} {sub.icon}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <h3 className="font-bold text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
                <p className="text-xs text-gray-400 font-medium">{task.date}</p>

                <div className="flex justify-between items-center pt-2">
                    <div className="flex -space-x-2">
                        {task.assignees?.map((assignee, index) => (
                            <img
                                key={index}
                                src={assignee}
                                alt={`Assignee ${index}`}
                                className="h-6 w-6 rounded-full border-2 border-white"
                            />
                        ))}
                    </div>

                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                        {task.comments && (
                            <div className="flex items-center space-x-1">
                                <FaComment />
                                <span>{task.comments}</span>
                            </div>
                        )}
                        {task.files && (
                            <div className="flex items-center space-x-1">
                                <PaperclipIcon />
                                <span>{task.files}</span>
                            </div>
                        )}
                        {task.progress && (
                            <div className="flex items-center space-x-1">
                                <CheckCircleIcon />
                                <span>{`${task.progress.current}/${task.progress.total}`}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}