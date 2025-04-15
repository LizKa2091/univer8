import { useState, useEffect } from 'react';

const useNotification = () => {
  const [permission, setPermission] = useState(Notification.permission);

  const requestPermission = () => {
    Notification.requestPermission().then(result => {
      setPermission(result);
    });
  };

  const unsubscribe = () => {
    setPermission('denied');
  };

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(subscription => {
          if (subscription) {
            setPermission('granted');
          }
        });
      });
    }
  }, []);

  return { permission, requestPermission, unsubscribe };
};

export default useNotification;