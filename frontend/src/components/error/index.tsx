import { Reload } from "@/assets/svgs";
import { useQueryClient } from "react-query";

interface IProps {
  msg: string;
}
const ErrorComponent = ({ msg }: IProps) => {
  const queryClient = useQueryClient();
  const errorButtonHandler = () => {
    queryClient.invalidateQueries("todos");
  };

  return (
    <div
      role="status"
      className="flex justify-center items-center flex-col text-center">
      <h1 className="text-4xl font-bold text-red-600">Error Message </h1>
      <span className="text-2xl font-medium text-red-400 my-2">{msg}</span>
      <button className="flex gap-2" onClick={errorButtonHandler}>
        Reload <Reload />
      </button>
    </div>
  );
};

export default ErrorComponent;
