import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

const FilterButtons = ({ filter, setFilter }) => {
  return (
    <ButtonGroup fullWidth style={{ marginBottom: '20px' }}>
      <Button 
        variant={filter === 'all' ? 'contained' : 'outlined'}
        onClick={() => setFilter('all')}
      >
        Все
      </Button>
      <Button 
        variant={filter === 'active' ? 'contained' : 'outlined'}
        onClick={() => setFilter('active')}
      >
        Активные
      </Button>
      <Button 
        variant={filter === 'completed' ? 'contained' : 'outlined'}
        onClick={() => setFilter('completed')}
      >
        Выполненные
      </Button>
    </ButtonGroup>
  );
};

export default FilterButtons;