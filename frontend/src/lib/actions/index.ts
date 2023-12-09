import { IEditTodoOptions, ITodoItem } from "@/types";


const baseUrl = "http://localhost:3000";

export const fetchTodos = async (): Promise<ITodoItem[]> => {
	const result = await fetch(`${baseUrl}/todos`);
	return result.json();
}

export const doTodo = async (id: string) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id })
	};
	await fetch(`${baseUrl}/doTodo`, requestOptions)
}

export const addTodo = async (todo: ITodoItem) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ todo })
	};
	await fetch(`${baseUrl}/addTodo`, requestOptions);
}

export const removeTodo = async (id: string) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id })
	};
	await fetch(`${baseUrl}/removeTodo`, requestOptions);
}

export const editTodo = async ({ id, text }: IEditTodoOptions) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id, text })
	};
	await fetch(`${baseUrl}/editTodo`, requestOptions);
}

