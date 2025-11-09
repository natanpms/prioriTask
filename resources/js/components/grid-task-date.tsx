import { formatDateToText } from '@/lib/utils';
import { tasksDueDate } from '@/types';
import { JSX } from 'react';

type PropsType = {
    titleSection: string;
    icon: JSX.Element;
    tasks: tasksDueDate[];
    type?: string;
};

export function GridTaskDate({ titleSection, icon, tasks, type }: PropsType) {
    return (
        <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
            <div className="flex items-center justify-between gap-2 space-x-2 px-4 py-3">
                <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-[#F3F7FD] p-2">{icon}</div>
                    <span className="font-medium text-black/40 dark:text-gray-300">{titleSection}</span>
                </div>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
                {tasks.length === 0 ? (
                    <p className="p-4 text-center text-sm text-gray-500">Nenhuma tarefa vencida.</p>
                ) : (
                    <ul>
                        {tasks.map((task) => (
                            <div key={task.id} className="flex-wrap border-b border-gray-200 px-4 py-2 last:border-0">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-base font-medium text-gray-800 dark:text-gray-200">{task.title}</span>
                                    <span className={`text-xs ${type === 'notDue' ? 'text-yellow-600' : 'text-red-500'} md:text-base`}>
                                        {type === 'notDue' ? 'Vence ' : 'Venceu em '} {formatDateToText(task.due_date)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
