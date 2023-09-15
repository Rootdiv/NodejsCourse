import process from 'node:process';
import { argsParse } from './util/argsParse.js';
import { addTask } from './service/addTask.services.js';
import { listTodo } from './service/listTodo.services.js';
import { getTodo } from './service/getTodo.services.js';
import { delTask } from './service/delTask.services.js';
import { updateTask } from './service/updateTask.services.js';
import { changeStatusTask } from './service/changeStatusTask.services.js';

const app = () => {
  const args = argsParse(process.argv, ['add', 'list', 'get', 'update', 'status', 'delete']);

  if (args.h || args.help) {
    console.log(`
      -h --help               : список команд
      add <task>              : добавить новую задачу.
      list                    : вывести список всех задач.
      get <id>                : вывести информацию о задаче с указанным идентификатором.
      update <id> <newTask>   : обновить задачу с указанным идентификатором.
      status <id> <newStatus> : обновить статус задачи с указанным идентификатором.
      delete <id>             : удалить задачу с указанным идентификатором.
    `);
    return;
  }

  if (args.add) {
    addTask(args.add);
    return;
  }

  if (args.list) {
    listTodo();
    return;
  }

  if (args.get) {
    getTodo(args.get);
    return;
  }

  if (args.update) {
    updateTask(args.update.id, args.update.str);
    return;
  }

  if (args.status) {
    changeStatusTask(args.status.id, args.status.str);
    return;
  }

  if (args.delete) {
    delTask(args.delete);
    return;
  }

  console.log('Неверная команда, выполните команду node index -h для вывода доступных команд');
};

app();
