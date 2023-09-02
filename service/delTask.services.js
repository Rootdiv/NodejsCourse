import { readTodo } from '../modules/readTodo.js';
import { writeTodo } from '../modules/writeTodo.js';
import { isEmptyTodo } from '../util/isEmptyTodo.js';

export const delTask = async id => {
  const todoList = JSON.parse((await readTodo('./todo.json')) || '[]');
  if (isEmptyTodo(todoList)) return;
  todoList.forEach((item, i) => {
    if (+id === item.id) {
      todoList.splice(i, 1);
      console.log(`Задача с идентификатором ${id} удалена`);
    }
  });
  writeTodo('./todo.json', JSON.stringify(todoList));
};
