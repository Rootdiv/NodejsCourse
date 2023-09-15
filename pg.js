import 'dotenv/config';
import pg from 'pg';

const client = new pg.Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

await client.connect();

try {
  const str = process.argv[2];
  const res = await client.query('SELECT * FROM users WHERE name = $1', [str]);
  console.log('res: ', res.rows);
} catch (err) {
  console.error(err);
}

client.end();
