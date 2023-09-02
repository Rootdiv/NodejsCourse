export const isEmptyTodo = todo => {
  if (!todo.length) {
    console.log('Список задач пуст');
    return true;
  }
  return false;
};
