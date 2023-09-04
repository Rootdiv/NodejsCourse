import { readTodo } from '../modules/readTodo.js';
import { writeTodo } from '../modules/writeTodo.js';
import { isEmptyTodo } from '../util/isEmptyTodo.js';

export const changeStatusTask = async (id, status) => {
  const todoList = JSON.parse((await readTodo('./todo.json')) || '[]');
  if (isEmptyTodo(todoList)) return;
  todoList.forEach(item => {
    if (+id === item.id) {
      item.status = status;
      console.log(`Статус задачи с идентификатором ${item.id} обновлён`);
    }
  });
  writeTodo('./todo.json', JSON.stringify(todoList, null, 2));
};
