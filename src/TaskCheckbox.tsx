type TaskCheckboxProps = {
  done: boolean;
  onToggle: () => void;
};

function TaskCheckbox({ done, onToggle }: TaskCheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={done}
      onChange={onToggle}
      aria-label="Toggle task status"
    />
  );
}

export default TaskCheckbox;
