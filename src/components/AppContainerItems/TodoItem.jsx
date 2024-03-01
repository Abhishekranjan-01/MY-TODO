import { FaCheckCircle } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { TfiCheck } from "react-icons/tfi";
import { MdDelete } from "react-icons/md";
import { TodoContext } from "./CrudContainer";
import { useContext, useRef, useState } from "react";

const TodoItem = ({ item }) => {
  const { dispatchTodoList } = useContext(TodoContext);
  const [editStatus, setEditStatus] = useState(false);
  const todoEditedNameRef = useRef(" yy");

  return (
    <div className="flex gap-4 border-b border-b-gray-400">
      <li
        id={item.UNIQUE_TODO_ID}
        className="list-none relative  bg-white rounded-md flex flex-row gap-2 flex-wrap justify-between items-center text-wrap py-1 w-full"
      >
        {editStatus == false && (
          <div className="flex gap-2 items-center">
            {item.todoStatus === "COMPLETED" && (
              <span className="block text-green-500 text-xs sm:text-base ">
                <FaCheckCircle />
              </span>
            )}

            <p className="text-wrap">{editStatus == false && item.todoName}</p>
          </div>
        )}

        {editStatus == true && (
          <input
            defaultValue={item.todoName}
            ref={todoEditedNameRef}
            type="text"
            className={
              (editStatus == true ? "bg-[#c7233eea] " : " ") +
              "block text-sm sm:text-base min-w-64 w-full text-wrap rounded-md"
            }
          />
        )}
      </li>
      <div className="flex justify-between gap-1 text-base sm:text-lg w-fit items-center ">
        {item.todoStatus === "ACTIVE" && (
          <>
            <BiSolidEdit
              onClick={(e) => {
                console.log(editStatus);
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
          </>
        )}

        <MdDelete
          className="text-red-600"
          onClick={() => {
            dispatchTodoList({
              name: "DELETE_TODO",
              payload: {
                UNIQUE_TODO_ID: item.UNIQUE_TODO_ID,
              },
            });
          }}
        />
      </div>
    </div>
  );
};
// export { sendEditStatus };
export default TodoItem;
