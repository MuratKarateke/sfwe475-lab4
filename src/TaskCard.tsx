import { useState } from "react";
import type { Task } from "./schemas";
import TaskCheckbox from "./TaskCheckbox";

type TaskCardProps = Pick<Task, "title" | "done" | "dueDate"> & {
  onToggle?: () => void;
};

function TaskCard({ title, done: initialDone, dueDate, onToggle }: TaskCardProps) {
  const [localDone, setLocalDone] = useState(initialDone);

  // If parent controls toggling (Strand 3 Stretch), use parent's prop; otherwise fallback to local state (Strand 1 Core)
  const isDone = onToggle ? initialDone : localDone;

  function handleToggle() {
    if (onToggle) {
      onToggle();
    } else {
      setLocalDone(!localDone);
    }
  }

  return (
    <div className={`task-card ${isDone ? "done" : ""}`}>
      <div>
        <h3>{title}</h3>
        {dueDate && <p className="due-date">Due: {dueDate}</p>}
      </div>
      <TaskCheckbox done={isDone} onToggle={handleToggle} />
    </div>
  );
}

export default TaskCard;
