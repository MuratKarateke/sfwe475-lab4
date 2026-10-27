import { useState } from "react";

type NewTaskInputProps = {
  onAddTask: (title: string) => void;
};

function NewTaskInput({ onAddTask }: NewTaskInputProps) {
  const [text, setText] = useState("");

  function handleAdd() {
    if (text.trim() === "") return;
    console.log("Adding task:", text);
    onAddTask(text.trim());
    setText("");
  }

  return (
    <div className="new-task-input">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default NewTaskInput;
