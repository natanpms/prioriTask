import { ColumnTask } from '@/types';
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanCard } from './kanban-card';

interface KanbanColumnProps extends ColumnTask {
    columnIndex: number;
    columns: ColumnTask[];
    moveTask: (taskId: number, fromColumnIndex: number, toColumnIndex: number, toTaskIndex: number) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks, columnIndex, columns, moveTask }) => {
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const [fromColumnIndex, taskId] = active.id.toString().split('-');
        const [toColumnIndex, toTaskId] = over.id.toString().split('-');

        const fromCol = parseInt(fromColumnIndex, 10);
        const toCol = parseInt(toColumnIndex, 10);

        const toTaskIndex = columns[toCol].tasks.findIndex((t) => t.id === parseInt(toTaskId, 10));

        moveTask(parseInt(taskId, 10), fromCol, toCol, toTaskIndex >= 0 ? toTaskIndex : 0);
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="rounded-md bg-primary/25 p-4">
                <h2 className="mb-2 font-bold text-gray-700">{title}</h2>
                <SortableContext items={tasks.map((task) => `${columnIndex}-${task.id}`)} strategy={verticalListSortingStrategy}>
                    <div className="scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent max-h-[50vh] space-y-4 overflow-y-auto lg:max-h-[75vh]">
                        {tasks.map((task, index) => (
                            <KanbanCard key={index} task={task} id={`${columnIndex}-${task.id}`} />
                        ))}
                    </div>
                </SortableContext>
            </div>
        </DndContext>
    );
};
