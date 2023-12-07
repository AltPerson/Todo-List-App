import { Accept, Decline } from "@/assets/svgs";
import { EKeyCodes, ITodoFunctions, ITodoItem } from "@/types";
import { useState, useRef, useEffect } from "react";

type IProps = Pick<ITodoItem, "id" | "text"> &
  Pick<ITodoFunctions, "editTodoMutate">;

export const TodoListItemEdit = ({ id, text, editTodoMutate }: IProps) => {
  const [editTodoText, setEditedTodoText] = useState(text);
  const inputRefElement = useRef<HTMLInputElement>(null);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTodoText(e.target.value);
  };
  const declineEditTodoButtonHandler = async () => {
    await editTodoMutate({ id });
  };
  const acceptEditTodoButtonHandler = async () => {
    await editTodoMutate({ id, text: editTodoText });
  };
  const inputKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.code) {
      case EKeyCodes.ENTER:
      case EKeyCodes.NUMPAD_ENTER:
        acceptEditTodoButtonHandler();
        break;
      case EKeyCodes.ESCAPE:
        declineEditTodoButtonHandler();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (inputRefElement.current) inputRefElement.current.focus();
  }, []);

  return (
    <li className="flex p-5 justify-between gap-1 border-[1px]  bg-gray-300 border-gray-300 items-center rounded ">
      <div className="flex items-center gap-2 w-full whitespace-nowrap">
        <input
          type="text"
          ref={inputRefElement}
          className="outline-none w-full p-3 rounded"
          value={editTodoText}
          onChange={inputHandler}
          onKeyDown={inputKeyHandler}
        />
      </div>
      <div className="flex gap-1">
        <button onClick={acceptEditTodoButtonHandler}>
          <Accept />
        </button>
        <button onClick={declineEditTodoButtonHandler}>
          <Decline />
        </button>
      </div>
    </li>
  );
};

export default TodoListItemEdit;
