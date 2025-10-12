import { ColumnTask } from "@/types";
import { KanbanCard } from "./kanban-card";
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

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

    const [fromColumnIndex, taskId] = active.id.toString().split("-");
    const [toColumnIndex, toTaskId] = over.id.toString().split("-");

    const fromCol = parseInt(fromColumnIndex, 10);
    const toCol = parseInt(toColumnIndex, 10);

    const toTaskIndex = columns[toCol].tasks.findIndex((t) => t.id === parseInt(toTaskId, 10));

    moveTask(parseInt(taskId, 10), fromCol, toCol, toTaskIndex >= 0 ? toTaskIndex : 0);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="rounded-md bg-primary/25 p-4 max-h-[50vh] lg:max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
        <h2 className="font-bold text-gray-700 mb-2">{title}</h2>
        <SortableContext items={tasks.map((task) => `${columnIndex}-${task.id}`)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {tasks.map((task,index) => (
              <KanbanCard key={index} task={task} id={`${columnIndex}-${task.id}`} />
            ))}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
};
