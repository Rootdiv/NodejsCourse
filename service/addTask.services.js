import { readTodo } from '../modules/readTodo.js';
import { writeTodo } from '../modules/writeTodo.js';

export const addTask = async task => {
  const todoList = JSON.parse((await readTodo('./todo.json')) || '[]');
  const lastId = todoList[todoList.length - 1]?.id;
  const id = lastId ? lastId + 1 : 1;
  const newTask = { id, status: 'В работе', task };
  writeTodo('./todo.json', JSON.stringify([...todoList, newTask]));
  console.log(`Задача добавлена с идентификатором ${id}`);
};
