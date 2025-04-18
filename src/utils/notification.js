export const scheduleReminders = (todos) => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return;
  }

  const activeTodos = todos.filter(todo => !todo.completed);
  
  if (activeTodos.length === 0) {
    return;
  }

  if (window.reminderIntervals) {
    window.reminderIntervals.forEach(interval => clearInterval(interval));
  }

  window.reminderIntervals = [];

  const interval = setInterval(() => {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('Незавершенные задачи', {
          body: `У вас есть ${activeTodos.length} невыполненных задач`,
          icon: '/assets/icons/logo192.png',
          vibrate: [200, 100, 200]
        });
      });
    }
  }, 2 * 60 * 60 * 1000); // 2 часа

  window.reminderIntervals.push(interval);
};