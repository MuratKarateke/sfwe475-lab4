# Lab 4 Self-Check Reflection (`notes/reflection.md`)

## 4. Why can't `FilterBar` and `TaskList` share filter state directly, without lifting it to a shared parent? (Strand 3)
In React, state is local and private to the component that declares it, and data can only be passed downward from parent to child via props. Because `FilterBar` and `TaskList` are sibling components, neither renders the other, so there is no direct channel for one sibling to pass props to the other. Lifting the `filter` state up to their closest common parent (`TaskBoard`) allows `TaskBoard` to own the single source of truth and pass both the current value and updater function down to both siblings.

## 5. What would go wrong, specifically, if `TaskList` used the array index as each `TaskCard`'s key instead of `task.id`? (Strand 2)
If each `TaskCard` holds local state (such as `useState(initialDone)` from Strand 1) and the user filters or reorders the list, the array indices `0, 1, 2...` stay the same even though different tasks now occupy those positions. React would see `key={0}` and assume it is still the exact same first component instance, keeping the previous task's local `done` checkbox state on the newly shifted task. Using `task.id` guarantees that React associates the state and DOM node with the specific task regardless of where it moves in the list.

## 6. In the sentence "props flow down, requests flow up," what in your `TaskBoard` app is an example of each direction? (Strand 3)
**Props flowing down:** `TaskBoard` passes the `tasks` array (or `filteredTasks`) down as a prop to `TaskList`, which in turn passes `title`, `done`, and `dueDate` down as props to each `TaskCard`.  
**Requests flowing up:** When a user clicks the "Add" button in `NewTaskInput` (or toggles a checkbox in `TaskCard`), the child component invokes the callback prop `onAddTask(text)` (or `onToggleTask(id)`) to send a request up to `TaskBoard` to update its central `tasks` state.
