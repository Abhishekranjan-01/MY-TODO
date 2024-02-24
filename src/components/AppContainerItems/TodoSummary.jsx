import { useContext } from "react";
import { TodoContext } from "./CrudContainer";
import { countActiveTodo } from "../../store/TodoListStore";
import WarningMessage from "./WarningMessage";

const Summary = ({ currentDisplay, setCurrentDisplay }) => {
  const { todoList, dispatchTodoList } = useContext(TodoContext);
  const activeTodos = countActiveTodo(todoList);
  return (
    <>
      <li className="relative -top-4 sm:-top-8 list-none bg-[#F8F8FF] rounded-md flex justify-between w-full text-[10px] sm:text-sm text-gray-950 font-bold px-1 sm:px-2 py-0 sm:py-1 outline-none border-b border-b-gray-400">
        <div className="">{activeTodos} items left</div>
        <div className="flex justify-center gap-2 sm:gap-8">
          <button
            className={
              currentDisplay === "ALL" ? "bg-sky-600  px-2 rounded-md" : "_"
            }
            type="button"
            onClick={() => {
              setCurrentDisplay("ALL");
            }}
          >
            All
          </button>
          <button
            className={
              currentDisplay === "ACTIVE"
                ? "bg-yellow-400 px-2 rounded-md"
                : "_"
            }
            type="button"
            onClick={() => {
              setCurrentDisplay("ACTIVE");
            }}
          >
            Active
          </button>
          <button
            className={
              currentDisplay === "COMPLETED"
                ? "bg-green-500  px-2 rounded-md"
                : "_"
            }
            type="button"
            onClick={() => {
              setCurrentDisplay("COMPLETED");
            }}
          >
            Completed
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              dispatchTodoList({ name: "CLEAR_ALL" });
              setCurrentDisplay("ALL");
            }}
          >
            Reset All
          </button>
        </div>
      </li>
    </>
  );
};

export default Summary;
