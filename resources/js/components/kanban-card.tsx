import { Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const KanbanCard: React.FC<{ task: Task; id: string }> = ({ task, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const tagColor = task.tagColor ?? "bg-purple-200 text-purple-800";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:cursor-grab transition-shadow duration-300 p-4 space-y-3"
    >
      <span className={`text-xs font-semibold px-2 py-1 rounded-md ${tagColor}`}>{task.tag}</span>
      <h3 className="font-bold text-gray-800">{task.title}</h3>
      <p className="text-sm text-gray-500">{task.description}</p>
      <p className="text-xs text-gray-400 font-medium">{task.date}</p>
    </div>
  );
};
