export interface ITodoItem {
	id: string;
	text: string;
	isEdit: boolean;
	isDone: boolean;
}

export enum EActions {
	ACCEPT = "accept",
	DECLINE = "decline",
	EDIT = "edit",
	REMOVE = "remove",
}

export enum EKeyCodes {
	ENTER = "Enter",
	NUMPAD_ENTER = "NumpadEnter",
	ESCAPE = "Escape",
}

export interface IEditTodoOptions {
	id: string;
	text?: string
}

export interface ITodoFunctions {
	doTodoMutate: (id: string) => void;
	removeTodoMutate: (id: string) => void;
	editTodoMutate: ({ id, text }: IEditTodoOptions) => void;
}