
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { NotificationPayload } from '../types';

interface NotificationContextType {
  notification: NotificationPayload | null;
  showNotification: (message: string, type?: NotificationPayload['type']) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationPayload | null>(null);

  const showNotification = useCallback((message: string, type: NotificationPayload['type'] = 'success') => {
    const newNotification: NotificationPayload = {
      id: new Date().toISOString(), // Unique ID for the notification
      message,
      type,
    };
    setNotification(newNotification);

    // Auto-dismiss after a few seconds
    setTimeout(() => {
      setNotification(currentNotification => 
        currentNotification?.id === newNotification.id ? null : currentNotification
      );
    }, 3000); // Dismiss after 3 seconds
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
