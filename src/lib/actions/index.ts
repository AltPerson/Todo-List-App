import { data } from "../../constants";
import { ITodoItem } from "../../types";

export const fetchTodos = async (): Promise<ITodoItem[]> => {
	await new Promise(resolve => setTimeout(resolve, 1000))
	return data;
}

export const doTodo = async (id: string) => {
	await new Promise(resolve => setTimeout(resolve, 0));
	const dataItem = data.findIndex(item => item.id === id);
	data[dataItem].isDone = !data[dataItem].isDone;
}

export const addTodo = async (todo: ITodoItem) => {
	await new Promise(resolve => setTimeout(resolve, 0));
	data.push(todo);
}

export const removeTodo = async (id: string) => {
	await new Promise(resolve => setTimeout(resolve, 0));
	const dataItem = data.findIndex(item => item.id === id);
	data.splice(dataItem, 1);
}

export const editTodo = async ({ id, text }: { id: string, text?: string }) => {
	await new Promise(resolve => setTimeout(resolve, 0));
	const dataItem = data.findIndex(item => item.id === id);
	if (text) data[dataItem].text = text;
	data[dataItem].isEdit = !data[dataItem].isEdit;
}