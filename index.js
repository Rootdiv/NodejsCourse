import 'dotenv/config';
import { default as Knex } from 'knex';

const knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    //port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

const getAllUsers = async () => await knex('users');

const addUser = async ({ name, phone, email, age }) => {
  await knex('users').insert({ name, phone, email, age });
  console.log('Пользователь успешно добавлен');
};

const updateUser = async (id, user) => {
  await knex('users').where({ id }).update(user);
};

const deleteUser = async id => {
  await knex('users').where({ id }).del();
};

//const getUserByName = async name => await knex('users').where('name', '=', name);
//const getUserByName = async name => await knex('users').where('name', 'ilike', name);
const getUserByName = async name => await knex('users').where('name', 'ilike', `%${name}%`);
const getUserByAge = async age => await knex('users').where('age', '>', age);

const init = async () => {
  console.log('users1:', await getAllUsers());

  await addUser({
    name: 'Марат',
    phone: '+74556555489',
    email: 'marat@mail.com',
    age: 30,
  });

  await updateUser(3, {
    age: 15,
  });

  await deleteUser(5);

  console.log('users2:', await getAllUsers());

  console.log(await getUserByName('Лескин'));

  console.log(await getUserByAge(33));

  knex.destroy();
};

init();
