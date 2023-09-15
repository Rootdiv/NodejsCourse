import { knex } from '../modules/connect.js';

export const delTask = async id => {
  const isDeleted = await knex('todos').where({ id }).del();
  if (isDeleted) {
    console.log(`Задача с идентификатором ${id} удалена`);
  } else {
    console.log(`Задача с идентификатором ${id} не найдена`);
  }
  knex.destroy();
};
