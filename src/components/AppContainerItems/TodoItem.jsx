import { FaCheckCircle } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { TfiCheck } from "react-icons/tfi";
import { TodoContext } from "./CrudContainer";
import { useContext, useRef, useState } from "react";

const TodoItem = ({ item }) => {
  const { dispatchTodoList } = useContext(TodoContext);
  const [editStatus, setEditStatus] = useState(false);
  const todoEditedNameRef = useRef(" yy");

  return (
    <li
      id={item.UNIQUE_TODO_ID}
      className="list-none relative px-4 bg-white rounded-md flex flex-row flex-wrap justify-between items-center"
    >
      {item.todoStatus === "COMPLETED" && (
        <span className="text-green-500 text-xs sm:text-base absolute left-1">
          <FaCheckCircle />
        </span>
      )}

      {editStatus == true ? (
        <input
          defaultValue={item.todoName}
          ref={todoEditedNameRef}
          type="text"
          className={
            (editStatus == true ? "bg-[#c7233eea] " : " ") +
            "block text-sm sm:text-xl px-1 sm:px-2 py-0 sm:py-1 outline-none border-b border-b-gray-400 min-w-64 w-full text-wrap rounded-md"
          }
        />
      ) : (
        <input
          defaultValue={item.todoName}
          readOnly
          type="text"
          className="block text-sm sm:text-xl px-1 sm:px-2 py-0 sm:py-1 outline-none border-b border-b-gray-400 min-w-64 w-full text-wrap"
        />
      )}

      {item.todoStatus === "ACTIVE" && (
        <div className="flex gap-1 text-xs sm:text-base h-fit w-fit absolute right-0">
          <BiSolidEdit
            onClick={(e) => {
              setEditStatus(!editStatus);
              {
                editStatus == true
                  ? todoEditedNameRef.current.value &&
                    dispatchTodoList({
                      name: "EDITED_TODO",
                      payload: {
                        todoName: todoEditedNameRef.current.value,
                        UNIQUE_TODO_ID: item.UNIQUE_TODO_ID,
                      },
                    })
                  : "";
              }
            }}
          />
          <TfiCheck
            onClick={(e) => {
              if (editStatus == true) {
                setEditStatus(false);
                console.log(todoEditedNameRef.current.value);
                dispatchTodoList({
                  name: "EDITED_TODO",
                  payload: {
                    todoName: todoEditedNameRef.current.value,
                    UNIQUE_TODO_ID: item.UNIQUE_TODO_ID,
                  },
                });
                return;
              } else
                dispatchTodoList({
                  name: "COMPLETED_TODO",
                  payload: {
                    todoName: item.todoName,
                    todoStatus: "COMPLETED",
                    UNIQUE_TODO_ID: item.UNIQUE_TODO_ID,
                  },
                });
            }}
          />
        </div>
      )}
    </li>
  );
};
export default TodoItem;
