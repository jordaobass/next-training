import React from "react";
import {useTransition} from 'react-spring'
import Toast from './Toast';
import {Container,} from './style';
import {ToastMessage, useToast} from '../../hooks/ToastHook'

interface ToastContainerProps {
  messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({messages}) => {
  return (
      <Container>
        {messages.map(message => (
            <Toast key={message.id} message={message}/>
        ))}
      </Container>
  );
};
export default ToastContainer;
