import { useState, useEffect } from "react";
import type { Task } from "./schemas";
import TaskList from "./TaskList";
import NewTaskForm from "./NewTaskForm";
import FilterBar, { type FilterType } from "./FilterBar";
import { simulateFetchTasks } from "./mockApi";

function TaskBoard() {
  const [status, setStatus] = useState<"loading" | "success" | "empty" | "error">("loading");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  // useEffect içinde veriyi çekiyoruz
  useEffect(() => {
    simulateFetchTasks()
      .then((data) => {
        setTasks(data);
        // Kısa if (ternary) yerine normal if/else kullanalım
        if (data.length === 0) {
          setStatus("empty");
        } else {
          setStatus("success");
        }
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  function handleAddTask(newTaskInfo: { title: string; dueDate?: string }) {
    // Daha basit bir ID bulma mantığı
    let nextId = 1;
    if (tasks.length > 0) {
      const ids = tasks.map((t) => t.id);
      nextId = Math.max(...ids) + 1;
    }

    const newTask = {
      id: nextId,
      title: newTaskInfo.title,
      dueDate: newTaskInfo.dueDate,
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleToggleTask(id: number) {
    // Kısa yazım yerine daha açık bir map ve if döngüsü
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // Filtrelemeyi daha basit bir if/else yapısıyla çözelim
  let filteredTasks = tasks;
  if (filter === "done") {
    filteredTasks = tasks.filter((task) => task.done === true);
  } else if (filter === "open") {
    filteredTasks = tasks.filter((task) => task.done === false);
  }

  return (
    <div className="task-board">
      <h1>Task Board</h1>
      
      <NewTaskForm onAddTask={handleAddTask} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      
      {/* Ekran okuyucular için aria-live div'i[cite: 8] */}
      <div aria-live="polite">
        {status === "loading" && <p>Loading tasks...</p>}
        {status === "error" && <p>We couldn't load your tasks.</p>}
        {status === "empty" && <p>No tasks yet. Add your first one below.</p>}
      </div>

      {status === "success" && (
        <TaskList tasks={filteredTasks} onToggleTask={handleToggleTask} />
      )}
    </div>
  );
}

export default TaskBoard;