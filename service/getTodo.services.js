import { readTodo } from '../modules/readTodo.js';
import { isEmptyTodo } from '../util/isEmptyTodo.js';

export const getTodo = async taskId => {
  const todoList = JSON.parse((await readTodo('./todo.json')) || '[]');
  if (isEmptyTodo(todoList)) return;
  const [todo] = todoList.filter(item => +taskId === item.id);
  if (todo) {
    console.log(`Задача с идентификатором ${todo.id}:`);
    console.log(`Название: ${todo.task}`);
    console.log(`Статус: ${todo.status}`);
  } else {
    console.log(`Задача с идентификатором ${taskId} не найдена`);
  }
};
