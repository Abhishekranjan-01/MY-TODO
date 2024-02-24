import { useContext, useState } from "react";
import { TodoContext } from "./CrudContainer";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todoList, currentDisplay } = useContext(TodoContext);

  return (
    <ul className="font-poppins bg-white rounded-md overflow-y-scroll max-h-52 md:max-h-[220px] 2xl:max-xl:max-h-[400px] py-2 shadow-2xl">
      {todoList.map((item, i) => {
        return (
          <>
            {item.todoStatus === "ACTIVE" && currentDisplay === "ACTIVE" && (
              <TodoItem key={item.UNIQUE_TODO_ID} item={item} />
            )}

            {item.todoStatus === "COMPLETED" &&
              currentDisplay === "COMPLETED" && (
                <TodoItem key={item.UNIQUE_TODO_ID} item={item} />
              )}

            {currentDisplay === "ALL" && (
              <TodoItem key={item.UNIQUE_TODO_ID} item={item} />
            )}
          </>
        );
      })}
    </ul>
  );
};

export default TodoList;
