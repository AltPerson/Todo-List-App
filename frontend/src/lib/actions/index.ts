import { ITodoItem } from "@/types";


const baseUrl = "http://localhost:3000";
// export const fetchTodos = async (): Promise<ITodoItem[]> => {
// 	await new Promise(resolve => setTimeout(resolve, 1000))
// 	return data;
// }

export const fetchTodos = async (): Promise<ITodoItem[]> => {
	const result = await fetch(`${baseUrl}/todos`);
	console.log('Result', result);
	return result.json();
}

// export const doTodo = async (id: string) => {
// 	await new Promise(resolve => setTimeout(resolve, 0));
// 	const dataItem = data.findIndex(item => item.id === id);
// 	data[dataItem].isDone = !data[dataItem].isDone;
// }

export const doTodo = async (id: string) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id })
	};
	await fetch(`${baseUrl}/doTodo`, requestOptions)
}

// export const addTodo = async (todo: ITodoItem) => {
// 	await new Promise(resolve => setTimeout(resolve, 0));
// 	data.push(todo);
// }

export const addTodo = async (todo: ITodoItem) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ todo })
	};
	await fetch(`${baseUrl}/addTodo`, requestOptions);
}

// export const removeTodo = async (id: string) => {
// 	await new Promise(resolve => setTimeout(resolve, 0));
// 	const dataItem = data.findIndex(item => item.id === id);
// 	data.splice(dataItem, 1);
// }

export const removeTodo = async (id: string) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id })
	};
	await fetch(`${baseUrl}/removeTodo`, requestOptions);
}

// export const editTodo = async ({ id, text }: { id: string, text?: string }) => {
// 	await new Promise(resolve => setTimeout(resolve, 0));
// 	const dataItem = data.findIndex(item => item.id === id);
// 	if (text) data[dataItem].text = text;
// 	data[dataItem].isEdit = !data[dataItem].isEdit;
// }

export const editTodo = async ({ id, text }: { id: string, text?: string }) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id, text })
	};
	await fetch(`${baseUrl}/editTodo`, requestOptions);
}