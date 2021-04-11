import React, {createContext, useContext, useCallback, useState} from 'react';
import ToastContainer from '../components/ToastContainer';
import {uuid} from 'uuidv4'

export interface ToastMessage {
  id: string,
  type?: 'success' | 'info' | 'error',
  title: string,
  description?: string
}


interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;

  removeToast(id: string): void;
}

const ToastHook = createContext<ToastContextData>(
    {} as ToastContextData,
);

const ToastProvider: React.FC = ({children}) => {

  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({type, title, description}: Omit<ToastMessage, 'id'>) => {
    const id = uuid();
    const toast = {id, type, title, description}
    setMessages((oldMessages) => [...oldMessages, toast])

  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id))
    console.log('removeToast')
  }, []);


  return (
      <ToastHook.Provider value={{addToast, removeToast}}>
        {children}
        <ToastContainer messages={messages}/>
      </ToastHook.Provider>
  );
};


function useToast(): ToastContextData {

  const context = useContext(ToastHook);

  if (!context) {
    throw new Error('useToast deve ser usado com um toastProvider');
  }
  return context;
}

export {useToast, ToastProvider}
