import { createContext, useEffect, useReducer, useState } from "react";
import InputTodo from "./InputTodo";
import reducer, { countCompletedTodo } from "../../store/TodoListStore";
import AllTodoList from "./TodoList";
import Summary from "./TodoSummary";
import { countActiveTodo } from "../../store/TodoListStore";
import WarningMessage from "./WarningMessage";
import { getTodoFromFirebase, getUserEmail } from "../../Firebase/Firebase";

const TodoContext = createContext(null);

const CrudContainer = () => {
  const [todoList, dispatchTodoList] = useReducer(reducer, []);
  const [currentDisplay, setCurrentDisplay] = useState("ALL");
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      getTodoFromFirebase(getUserEmail(), dispatchTodoList);

      setInitialRender(false);
    }
  }, []);

  // localStorage.removeItem("UNIQUE_TODO_LIST");

  return (
    <TodoContext.Provider
      value={{ todoList, dispatchTodoList, currentDisplay, setCurrentDisplay }}
    >
      <div className="relative flex flex-col gap-4 md:gap-10 ">
        <InputTodo />

        <>
          {currentDisplay === "ACTIVE" && countActiveTodo(todoList) === 0 && (
            <WarningMessage initialRender={initialRender} />
          )}
          {currentDisplay === "COMPLETED" &&
            countCompletedTodo(todoList) === 0 && (
              <WarningMessage initialRender={initialRender} />
            )}
          {currentDisplay === "ALL" && todoList.length === 0 && (
            <WarningMessage initialRender={initialRender} />
          )}
          {todoList.length !== 0 && (
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
