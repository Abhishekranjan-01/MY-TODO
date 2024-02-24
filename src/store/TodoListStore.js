const addTodo = (todoList, action) => {
  return [action.payload, ...todoList];
};
const editedTodo = (todoList, payload) => {
  todoList.forEach((item) => {
    if (item.UNIQUE_TODO_ID === payload.UNIQUE_TODO_ID) {
      item.todoName = payload.todoName;
    }
  });
  return [...todoList];
};
const completedTodo = (todoList, action) => {
  let newTodoList = todoList;

  todoList.forEach((item) => {
    if (item.UNIQUE_TODO_ID === action.UNIQUE_TODO_ID) {
      item.todoStatus = "COMPLETED";
    }
  });

  return [...newTodoList];
};
const countActiveTodo = (todoList) => {
  let count = 0;
  todoList.forEach((item) => {
    if (item.todoStatus === "ACTIVE") {
      count++;
    }
  });
  return count;
};

const countCompletedTodo = (todoList) => {
  let count = 0;
  todoList.forEach((item) => {
    if (item.todoStatus === "COMPLETED") {
      count++;
    }
  });
  return count;
};
export { completedTodo, countActiveTodo, countCompletedTodo, editedTodo };
export default addTodo;
