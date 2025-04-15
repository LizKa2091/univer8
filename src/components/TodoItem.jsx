import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox } from '@mui/material';
import { Delete, NotificationsActive } from '@mui/icons-material';

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <ListItem>
      <Checkbox
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <ListItemText
        primary={todo.text}
        secondary={new Date(todo.createdAt).toLocaleString()}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;