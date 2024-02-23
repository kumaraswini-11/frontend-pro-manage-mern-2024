export default function getTodoItemOptionsStyle(todo) {
  const isDone = todo.section.toLowerCase() === "done";
  const isOverdue = new Date() < new Date(todo.dueDate);

  let backgroundColor = isDone ? "#63C05B" : isOverdue ? "#DBDBDB" : "#CF3636";
  let color = isOverdue && !isDone ? "#5A5A5A" : "#FFFFFF";

  return { backgroundColor, color };
}
