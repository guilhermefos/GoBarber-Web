/* eslint-disable react/prop-types */
import React from 'react';
import { useTransition } from 'react-spring';
import { ToastData } from '../../hooks/toast';
import Toast from './Toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastData[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const transitions = useTransition(messages, message => message.id, {
    from: { right: '-120%' },
    enter: { right: '0' },
    leave: { right: '-120%' },
  });

  return (
    <Container>
      {transitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
