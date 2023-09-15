import { knex } from '../modules/connect.js';

export const changeStatusTask = async (id, status) => {
  const isUpdated = await knex('todos').where({ id }).update({ status });
  if (isUpdated) {
    console.log(`Статус задачи с идентификатором ${id} обновлён`);
  } else {
    console.log(`Задача с идентификатором ${id} не найдена`);
  }
  knex.destroy();
};
