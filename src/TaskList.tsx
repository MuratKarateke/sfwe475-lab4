import type { Task } from "./schemas";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
  onToggleTask?: (id: number) => void;
};

function TaskList({ tasks, onToggleTask }: TaskListProps) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          done={task.done}
          dueDate={task.dueDate}
          onToggle={onToggleTask ? () => onToggleTask(task.id) : undefined}
        />
      ))}
    </div>
  );
}

export default TaskList;
