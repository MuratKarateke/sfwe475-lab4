# React Lab 4 - Written Questions (`notes/react.md`)

## 1. Strand 1 (Step 6): Difference between `title` (prop) and `done` (state)
`title` is a **prop** passed down from the parent component, which makes it read-only (immutable) inside `TaskCard`; `TaskCard` cannot modify its own props directly because in React data flows one way from parent to child. In contrast, `done` (when managed via `useState`) is local **state** owned by `TaskCard` itself, and React provides the `setDone` setter function specifically so the component can update that value in response to user interactions like clicking the checkbox and trigger a re-render.

## 2. Strand 2 (Step 4 & Step 6): Why array index as `key` is risky & Controlled Input experiment
### Why using `key={index}` is risky:
Using the array index as a key ties a component's identity to its position in the array rather than the actual data item it represents. If the task list is reordered, filtered, or an item is inserted/deleted in the middle, the indices shift and React may reuse component instances and their internal state (such as local checkbox state or input focus) for the wrong tasks, leading to visual bugs and stale state. Using a stable, unique ID (`key={task.id}`) ensures React matches each component instance to the exact same task across renders.

### Removing `onChange` experiment (Step 6):
When the `onChange` handler is temporarily removed from `<input value={text} />`, typing into the text box does nothing on screen—the input appears completely frozen and locked to its initial empty string value `""`. This happens because the input's `value` is strictly driven by the React state `text`, and without `onChange` calling `setText`, the state never updates, plus React logs a console warning about rendering a controlled input with a `value` prop without an `onChange` handler.

## 3. Strand 3 (Step 5): Full round trip of clicking "Add"
`TaskBoard` owns the `tasks` array state and passes its state-updating helper function (`handleAddTask`) down to `NewTaskInput` via the `onAddTask` prop. When the user types a task title and clicks the "Add" button inside `NewTaskInput`, `NewTaskInput` requests the change by calling `onAddTask(text)`, passing the new title string up to `TaskBoard`. `TaskBoard`'s `handleAddTask` function then calls `setTasks` with a new array containing the appended task, causing `TaskBoard` to re-render and pass the updated `tasks` array down as a prop to `TaskList`, which immediately renders the new `TaskCard` on screen.
