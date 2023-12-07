import { ITodoFunctions, ITodoItem } from "@/types";
import TodoListItemEdit from "../todoListItemEdit";
import { Edit, Remove } from "@/assets/svgs";

type IProps = ITodoItem & ITodoFunctions;

const TodoListItem = ({
  id,
  isDone,
  isEdit,
  text,
  doTodoMutate,
  editTodoMutate,
  removeTodoMutate,
}: IProps) => {
	
  const removeTodoButtonHandler = async () => {
    await removeTodoMutate(id);
  };
  const editTodoButtonHandler = async () => {
    await editTodoMutate({ id });
  };
  const inputCheckBoxHandler = async () => {
    await doTodoMutate(id);
  };

  if (isEdit) {
    return (
      <TodoListItemEdit id={id} text={text} editTodoMutate={editTodoMutate} />
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
        <button onClick={editTodoButtonHandler}>
          <Edit />
        </button>
        <button onClick={removeTodoButtonHandler}>
          <Remove />
        </button>
      </div>
    </li>
  );
};

export default TodoListItem;
