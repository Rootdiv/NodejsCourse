export const writePass = password => {
  process.stdout.write(`Пароль: '${password}'\n`);
  process.exit();
};
