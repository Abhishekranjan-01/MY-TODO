import { useContext, useRef } from "react";
import { TodoContext } from "./CrudContainer";

const InputTodo = () => {
  const todoNameRef = useRef("");
  const { dispatchTodoList, setCurrentDisplay } = useContext(TodoContext);
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        if (todoNameRef.current.value.trim() === "") {
          alert("Please Enter Todo...");
          todoNameRef.current.value = "";
          return 0;
        }

        dispatchTodoList({
          name: "ADD_TODO",
          payload: {
            todoName: todoNameRef.current.value.trim(),
            todoStatus: "ACTIVE",
            UNIQUE_TODO_ID: Date.now(),
          },
        });
        todoNameRef.current.value = "";
        setCurrentDisplay("ALL");
      }}
    >
      <div className="relative">
        <input
          required
          ref={todoNameRef}
          onChange={(e) => {
            todoNameRef.current.value = e.target.value;
          }}
          type="text"
          placeholder="Enter TODO... "
          className="  w-full rounded-md text-sm sm:text-xl px-1 sm:px-2 py-1 sm:py-2 outline-none"
        />
        <button
          type="submit"
          className="font-poppins absolute right-1 sm:right-3 top-1 sm:top-2 px-2 bg-[#c31431ef] text-sm sm:text-lg text-gray-200 font-semibold w-fit  rounded-sm sm:rounded-md"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default InputTodo;
