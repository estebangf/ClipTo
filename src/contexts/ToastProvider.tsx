"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe usarse dentro de ToastProvider');
  }
  return context;
};

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<string[]>([]);

  const showToast = (newMessage: string) => {
    // setMessages(p => ([newMessage, ...p]));
    setMessages(p => ([...p, newMessage]));
    setTimeout(() => setMessages(p => {
      const _p = p;
      _p.pop()
      return [..._p];
    }), 3000); // Duración del toast
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {messages.length > 0 &&
        createPortal(<Toasts messages={messages} />, document.body)
      }
    </ToastContext.Provider>
  );
};



const Toasts: React.FC<{ messages: string[] }> = ({ messages }) => (
  <div className="fixed bottom-4 right-4 space-x-4 flex">
    {messages.map((message, index) => (<Toast key={`t-${message}-${index}`} message={message} />))}
  </div>
);

const Toast: React.FC<{ message: string }> = ({ message }) => (
  <div className="py-3 px-6 bg-gray-800 text-white rounded-lg shadow-lg animate-fade-in-out">
    {message}
  </div>
);

export default ToastProvider;
