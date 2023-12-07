import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { ITodoItem } from "@/types";
import { doTodo, removeTodo, editTodo } from "@/lib/actions";

interface IProps extends ITodoItem {}

const TodoListItem = ({ id, isDone, isEdit, text }: IProps) => {
  const queryClient = useQueryClient();
  const [editTodoText, setEditedTodoText] = useState("");
  const { mutateAsync: doTodoMutate } = useMutation(doTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const { mutateAsync: removeTodoMutate } = useMutation(removeTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const { mutateAsync: editTodoMutate } = useMutation(editTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const buttonHandler = async (action: string) => {
    switch (action) {
      case "remove":
        await removeTodoMutate(id);
        break;
      case "edit":
        await editTodoMutate({ id });
        setEditedTodoText(text);
        break;
      case "accept":
        await editTodoMutate({ id, text: editTodoText });
        break;
      case "decline":
        await editTodoMutate({ id });
        break;
      default:
        break;
    }
  };

  const inputCheckBoxHandler = async () => {
    await doTodoMutate(id);
  };

  const inputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTodoText(e.target.value);
  };

  if (isEdit) {
    return (
      <li className="flex p-5 justify-between gap-1 border-[1px]  bg-gray-300 border-gray-300 items-center rounded ">
        <div className="flex items-center gap-2 w-full whitespace-nowrap">
          <input
            type="text"
            className="outline-none w-full p-3 rounded"
            value={editTodoText}
            onChange={inputHandler}
            onKeyDown={(e) => {
              switch (e.code) {
                case "Enter":
                  buttonHandler("accept");
                  break;
                case "NumpadEnter":
                  buttonHandler("accept");
                  break;
                case "Escape":
                  buttonHandler("decline");
                  break;
                default:
                  break;
              }
            }}
          />
        </div>
        <div className="flex gap-1">
          <button onClick={() => buttonHandler("accept")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-10 h-8 p-1.5 rounded bg-green-500 hover:bg-green-600">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
          <button onClick={() => buttonHandler("decline")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-10 h-8 p-1.5 rounded bg-red-600 hover:bg-red-700">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </li>
    );
  }

  return (
    <li
      className={`flex p-5 justify-between gap-1 border-[1px] border-gray-300 items-center rounded ${
        isDone && "bg-gray-200"
      }`}>
      <div className="flex items-center gap-2 min-w-[100px] whitespace-nowrap">
        <input
          type="checkbox"
          className="outline-none w-4 h-4 "
          checked={isDone}
          onChange={inputCheckBoxHandler}
        />
        <span className="inline-block text-ellipsis overflow-hidden">
          {text}
        </span>
      </div>
      <div className="flex gap-1">
        <button onClick={() => buttonHandler("edit")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-10 h-8 p-1.5 rounded bg-green-500 hover:bg-green-600">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
        <button onClick={() => buttonHandler("remove")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-10 h-8 p-1.5 rounded bg-red-600 hover:bg-red-700">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TodoListItem;
