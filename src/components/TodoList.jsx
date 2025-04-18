import React, { useState, useEffect } from 'react';
import { TextField, Button, List, Paper, Typography } from '@mui/material';
import TodoItem from './TodoItem';
import FilterButtons from './FilterButtons';
import NotificationButton from './NotificationButton';
import { saveTodos, loadTodos } from '../utils/storage';
import { scheduleReminders } from '../utils/notification';

const TodoList = () => {
  const [todos, setTodos] = useState(loadTodos());
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    saveTodos(todos);
    if (todos.length > 0) {
      scheduleReminders(todos);
    }
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
      
      if (Notification.permission === 'granted') {
        new Notification('Новая задача добавлена', {
          body: inputValue,
          icon: '/assets/icons/logo192.png'
        });
      }
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px', margin: '20px auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Умный список задач
      </Typography>
      
      <NotificationButton />
      
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Добавить новую задачу"
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={addTodo}
          style={{ marginLeft: '10px' }}
        >
          Добавить
        </Button>
      </div>
      
      <FilterButtons filter={filter} setFilter={setFilter} />
      
      <List>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </List>
    </Paper>
  );
};

export default TodoList;