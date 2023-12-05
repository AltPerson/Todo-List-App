import { data } from "../../constants";
import TodoListItem from "../todoListItem";

const TodoList = () => {
  return (
    <section className="border-[1px] border-gray-400 rounded">
      <h1>Todos ({data.length})</h1>
      <div>
        <div>
          <input type="text" placeholder="Enter todo here" />
          <button>Submit</button>
        </div>
        <ul>
          {data.map((item) => (
            <TodoListItem {...item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodoList;
