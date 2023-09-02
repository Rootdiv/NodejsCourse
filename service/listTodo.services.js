import { readTodo } from '../modules/readTodo.js';
import { isEmptyTodo } from '../util/isEmptyTodo.js';

export const listTodo = async () => {
  const todoList = JSON.parse((await readTodo('./todo.json')) || '[]');
  if (isEmptyTodo(todoList)) return;
  console.log('Список задач:');
  todoList.forEach(({ id, status, task }) => {
    console.log(`${id}. [${status}] ${task}`);
  });
};
