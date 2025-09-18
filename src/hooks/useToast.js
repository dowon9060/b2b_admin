import { useState } from 'react';

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ type = 'info', title, message, duration = 4000 }) => {
    const id = ++toastId;
    const toast = { id, type, title, message, duration };
    
    setToasts(prev => [...prev, toast]);
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const success = (message, title = '성공') => {
    return addToast({ type: 'success', title, message });
  };

  const error = (message, title = '오류') => {
    return addToast({ type: 'error', title, message });
  };

  const warning = (message, title = '경고') => {
    return addToast({ type: 'warning', title, message });
  };

  const info = (message, title = '알림') => {
    return addToast({ type: 'info', title, message });
  };

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  };
}
