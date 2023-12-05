import "./App.css";
import TodoList from "./components/todoList";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="w-full min-h-screen flex justify-center items-center">
        <TodoList />
      </main>
    </QueryClientProvider>
  );
}

export default App;
