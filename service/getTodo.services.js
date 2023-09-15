import { knex } from '../modules/connect.js';

export const getTodo = async taskId => {
  const [todo] = await knex('todos').where('id', '=', taskId);
  if (todo) {
    console.log(`Задача с идентификатором ${todo.id}:`);
    console.log(`Название: ${todo.task}`);
    console.log(`Статус: ${todo.status}`);
  } else {
    console.log(`Задача с идентификатором ${taskId} не найдена`);
  }
  knex.destroy();
};
