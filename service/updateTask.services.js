import { knex } from '../modules/connect.js';

export const updateTask = async (id, task) => {
  const isUpdated = await knex('todos').where({ id }).update({ task });
  if (isUpdated) {
    console.log(`Задача с идентификатором ${id} обновлена`);
  } else {
    console.log(`Задача с идентификатором ${id} не найдена`);
  }
  knex.destroy();
};
