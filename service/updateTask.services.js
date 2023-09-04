import { readTodo } from '../modules/readTodo.js';
import { writeTodo } from '../modules/writeTodo.js';
import { isEmptyTodo } from '../util/isEmptyTodo.js';

export const updateTask = async (id, task) => {
  const todoList = JSON.parse((await readTodo('./todo.json')) || '[]');
  if (isEmptyTodo(todoList)) return;
  todoList.forEach(item => {
    if (+id === item.id) {
      item.task = task;
      console.log(`Задача с идентификатором ${item.id} обновлена`);
    }
  });
  writeTodo('./todo.json', JSON.stringify(todoList, null, 2));
};
