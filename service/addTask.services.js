import { readTodo } from '../modules/readTodo.js';
import { writeTodo } from '../modules/writeTodo.js';

export const addTask = async task => {
  const todoList = JSON.parse((await readTodo('./todo.json')) || '[]');
  const id = (todoList[todoList.length - 1]?.id || 0) + 1;
  const newTask = { id, status: 'В работе', task };
  writeTodo('./todo.json', JSON.stringify([...todoList, newTask]));
  console.log(`Задача добавлена с идентификатором ${id}`);
};
