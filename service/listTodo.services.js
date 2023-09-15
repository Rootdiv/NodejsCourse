import { knex } from '../modules/connect.js';

export const listTodo = async () => {
  const todoList = await knex('todos');
  if (!todoList.length) {
    console.log('Список задач пуст');
    knex.destroy();
    return;
  }

  console.log('Список задач:');
  todoList.forEach(({ id, status, task }) => {
    console.log(`${id}. [${status}] ${task}`);
  });
  knex.destroy();
};
