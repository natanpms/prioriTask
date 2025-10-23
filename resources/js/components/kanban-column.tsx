import { ColumnTask, Task } from '@/types';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanCard } from './kanban-card';

interface KanbanColumnProps extends Pick<ColumnTask, 'tasks' | 'title'> {
    id: string;
    activeTask: Task | null;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks, id, activeTask }) => {
    const { setNodeRef } = useDroppable({
        id,
    });
    return (
        <div ref={setNodeRef} className="rounded-md bg-primary/25 p-4">
            <h2 className="mb-2 font-bold text-gray-700">{title}</h2>
            <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
                <div className="scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent max-h-[50vh] space-y-4 overflow-y-auto lg:max-h-[75vh]">
                    {tasks.map((task) => (
                        <>
                            {activeTask?.id === task.id ? null : <KanbanCard key={task.id} task={task} id={task.id} />}
                        </>
                    ))}
                </div>
            </SortableContext>
        </div>
    );
};
