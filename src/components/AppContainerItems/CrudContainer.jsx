import { createContext, useReducer, useState } from "react";
import InputTodo from "./InputTodo";
import addTodo, {
  completedTodo,
  countCompletedTodo,
  editedTodo,
} from "../../store/TodoListStore";
import AllTodoList from "./TodoList";
import Summary from "./TodoSummary";
import { countActiveTodo } from "../../store/TodoListStore";
import WarningMessage from "./WarningMessage";

function reducer(todoList, action) {
  let newTodoList = todoList;

  if (action.name === "ADD_TODO") {
    newTodoList = addTodo(todoList, action);
  } else if (action.name === "EDITED_TODO") {
    newTodoList = editedTodo(todoList, action.payload);
  } else if (action.name === "COMPLETED_TODO") {
    newTodoList = completedTodo(todoList, action.payload);
  } else if (action.name === "CLEAR_ALL") {
    newTodoList = [];
  } else if (action.name === "LOAD_PREVIOUS_TODO_LIST") {
    newTodoList = action.payload;
  }
  return newTodoList;
}

let todoList = null;
let dispatchTodoList = null;
let currentDisplay = null;

const TodoContext = createContext(todoList, dispatchTodoList, currentDisplay);

const CrudContainer = () => {
  const [TodoList, DispatchTodoList] = useReducer(reducer, []);
  const [CurrentDisplay, setCurrentDisplay] = useState("ALL");
  const [initalRender, setInitialRender] = useState(true);
  let activeTodos = null;
  todoList = TodoList;
  dispatchTodoList = DispatchTodoList;
  currentDisplay = CurrentDisplay;
  if (initalRender && localStorage.getItem("UNIQUE_TODO_LIST")) {
    const newTodoList = JSON.parse(localStorage.getItem("UNIQUE_TODO_LIST"));
    dispatchTodoList({ name: "LOAD_PREVIOUS_TODO_LIST", payload: newTodoList });

    setInitialRender(false);
  }
  localStorage.setItem("UNIQUE_TODO_LIST", JSON.stringify(TodoList));
  // localStorage.removeItem("UNIQUE_TODO_LIST");

  return (
    <TodoContext.Provider
      value={{ todoList, dispatchTodoList, currentDisplay, setCurrentDisplay }}
    >
      <div className="relative flex flex-col gap-4 md:gap-10 ">
        <InputTodo />

        <>
          {currentDisplay === "ACTIVE" && countActiveTodo(TodoList) === 0 && (
            <WarningMessage message={"'Active'"} />
          )}
          {currentDisplay === "COMPLETED" &&
            countCompletedTodo(TodoList) === 0 && (
              <WarningMessage message={"'Completed'"} />
            )}
          {currentDisplay === "ALL" && TodoList.length === 0 && (
            <WarningMessage />
          )}
          {TodoList.length !== 0 && (
            <AllTodoList currentDisplay={currentDisplay} />
          )}

          <Summary
            currentDisplay={currentDisplay}
            setCurrentDisplay={setCurrentDisplay}
          />
        </>
      </div>
    </TodoContext.Provider>
  );
};
export { TodoContext };
export default CrudContainer;
