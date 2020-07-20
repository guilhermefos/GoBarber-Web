/* eslint-disable react/prop-types */
import React, { useContext, createContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastData, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export interface ToastData {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description: string;
}

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastData[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastData, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(prev => [...prev, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(prev => prev.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
