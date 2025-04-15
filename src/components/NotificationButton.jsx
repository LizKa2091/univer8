import React from 'react';
import { Button } from '@mui/material';
import useNotifications from '../hooks/useNotification';

const NotificationButton = () => {
  const { permission, requestPermission, unsubscribe } = useNotifications();

  if (permission === 'granted') {
    return (
      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={unsubscribe}
        fullWidth
        style={{ marginBottom: '20px' }}
      >
        Отключить уведомления
      </Button>
    );
  }

  return (
    <Button 
      variant="contained" 
      color="secondary" 
      onClick={requestPermission}
      fullWidth
      style={{ marginBottom: '20px' }}
    >
      Включить уведомления
    </Button>
  );
};

export default NotificationButton;