const addTodo = (todoList, action) => {
  return [action.payload, ...todoList];
};
const deleteTodo = (todoList, action) =>
  todoList.filter(
    (todoItem) => todoItem.UNIQUE_TODO_ID !== action.UNIQUE_TODO_ID
  );
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

function reducer(todoList, action) {
  let newTodoList = todoList;

  if (action.name === "ADD_TODO") {
    newTodoList = addTodo(todoList, action);
  } else if (action.name === "DELETE_TODO") {
    newTodoList = deleteTodo(todoList, action.payload);
  } else if (action.name === "EDITED_TODO") {
    newTodoList = editedTodo(todoList, action.payload);
  } else if (action.name === "COMPLETED_TODO") {
    newTodoList = completedTodo(todoList, action.payload);
  } else if (action.name === "CLEAR_ALL") {
    newTodoList = [];
  } else if (action.name === "LOAD_PREVIOUS_TODO_LIST") {
    newTodoList = action.payload;
  }
  localStorage.setItem("UNIQUE_TODO_LIST", JSON.stringify(newTodoList));
  return newTodoList;
}
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
export default reducer;
