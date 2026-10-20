import { useState, useEffect } from "react";
import type { Task } from "./schemas";
import TaskList from "./TaskList";
import NewTaskInput from "./NewTaskInput";
import FilterBar, { type FilterType } from "./FilterBar";

const STORAGE_KEY = "sfwe475_lab4_tasks";

const initialTasks: Task[] = [
  { id: 1, title: "Read Chapter 3", done: false, dueDate: "2026-10-25" },
  { id: 2, title: "Build TaskCard", done: true },
  { id: 3, title: "Start TaskList", done: false },
];

function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as Task[];
      }
    } catch (e) {
      console.error("Failed to read tasks from localStorage", e);
    }
    return initialTasks;
  });

  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error("Failed to save tasks to localStorage", e);
    }
  }, [tasks]);

  function handleAddTask(title: string) {
    const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    setTasks([...tasks, { id: nextId, title, done: false }]);
  }

  function handleToggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "open") return !task.done;
    return true;
  });

  return (
    <div className="task-board">
      <h1>Task Board</h1>
      <NewTaskInput onAddTask={handleAddTask} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <TaskList tasks={filteredTasks} onToggleTask={handleToggleTask} />
    </div>
  );
}

export default TaskBoard;
