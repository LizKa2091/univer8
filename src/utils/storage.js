export const saveTodos = (todos) => {
  try {
    localStorage.setItem('smart-todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Ошибка при сохранении задач:', error);
  }
};

export const loadTodos = () => {
  try {
    const savedTodos = localStorage.getItem('smart-todos');
    const todos = savedTodos ? JSON.parse(savedTodos) : [];
    return todos;
  } catch (error) {
    console.error('Ошибка при загрузке задач:', error);
    return null;
  }
};