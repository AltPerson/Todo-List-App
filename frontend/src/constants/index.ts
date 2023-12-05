import { v4 as uuidv4 } from "uuid";

export const data = [{
	id: uuidv4(),
	isDone: false,
	isEdit: false,
	text: 'First step'
}, {
	id: uuidv4(),
	isDone: true,
	isEdit: false,
	text: 'Second step'
}, {
	id: uuidv4(),
	isDone: false,
	isEdit: false,
	text: 'Third step'
}]


