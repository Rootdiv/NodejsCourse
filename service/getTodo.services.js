import { readTodo } from '../modules/readTodo.js';
import { isEmptyTodo } from '../util/isEmptyTodo.js';

export const getTodo = async taskId => {
  const todoList = JSON.parse((await readTodo('./todo.json')) || '[]');
  if (isEmptyTodo(todoList)) return;
  todoList.forEach(({ id, status, task }) => {
    if (+taskId === id) {
      console.log(`Задача с идентификатором ${id}:`);
      console.log(`Название: ${task}`);
      console.log(`Статус: ${status}`);
    } else {
      console.log(`Задача с идентификатором ${id} не найдена`);
    }
  });
};
