import 'dotenv/config';

const port = process.env.PORT || 3000;
console.log('port: ', port);

// const dbUrl = process.env.DB_URL;
// connectToDatabase(dbUrl);

// const apiKey = process.env.API_KEY;
// authenticateUser(username, password, process.env.SECRET_KEY);

if (process.env.DEBUG_MODE) {
  //Булевы значения всегда будут проходить проверку
  //так как все значения переменных хранятся в виде строк
  // enableDebugger();
}

const environment = process.env.NODE_ENV || 'development';
console.log('environment: ', environment);
