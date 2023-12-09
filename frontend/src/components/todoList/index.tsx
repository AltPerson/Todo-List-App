import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import {
  addTodo,
  doTodo,
  editTodo,
  fetchTodos,
  removeTodo,
} from "@/lib/actions";
import { v4 as uuidv4 } from "uuid";
import TodoListItem from "@/components/todoListItem";
import Loader from "../loader";
import { EKeyCodes } from "@/types";
import ErrorComponent from "../error";

const TodoList = () => {
  const queryClient = useQueryClient();
  const [todoText, setTodoText] = useState("");
  const { data, isLoading, isError, error } = useQuery("todos", fetchTodos, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { mutateAsync: addTodoMutate } = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
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

  const addTodoInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };
  const addTodoInputKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.code) {
      case EKeyCodes.ENTER:
      case EKeyCodes.NUMPAD_ENTER:
        addTodoButtonHandler();
        break;
      default:
        break;
    }
  };
  const addTodoButtonHandler = async () => {
    if (!todoText) return;

    await addTodoMutate({
      id: uuidv4(),
      text: todoText,
      isDone: false,
      isEdit: false,
    });

    setTodoText("");
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    if (error instanceof Error) return <ErrorComponent msg={error.message} />;
  }

  return (
    <section className="border-[1px] border-gray-300 rounded w-1/2 min-w-[300px]">
      <h1 className="border-b-[1px] border-gray-300 bg-gray-100 font-medium p-3">
        Todos ({data?.length || 0})
      </h1>
      <div className="py-5 px-3">
        <div className="flex mb-4">
          <input
            type="text"
            value={todoText}
            placeholder="Enter todo here"
            onChange={addTodoInputHandler}
            onKeyDown={addTodoInputKeyHandler}
            className="outline-none border-[1px] border-gray-300 p-2 w-full"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded"
            onClick={addTodoButtonHandler}>
            Submit
          </button>
        </div>
        <ul className="max-h-[400px] overflow-auto">
          {data?.map((item) => (
            <TodoListItem
              {...item}
              doTodoMutate={doTodoMutate}
              removeTodoMutate={removeTodoMutate}
              editTodoMutate={editTodoMutate}
              key={item.id}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodoList;
