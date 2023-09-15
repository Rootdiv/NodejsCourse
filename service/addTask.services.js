import { knex } from '../modules/connect.js';

export const addTask = async task => {
  const [{ id }] = await knex('todos').insert({ status: 'В работе', task }).returning('id');
  console.log(`Задача добавлена с идентификатором ${id}`);
  knex.destroy();
};
