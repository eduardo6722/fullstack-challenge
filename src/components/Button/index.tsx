/* eslint-disable react/button-has-type */
import React from 'react';

import { Container } from './styled';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ children, type, ...rest }) => (
  <Container>
    <button type={type || 'button'} {...rest}>
      {children}
    </button>
  </Container>
);

export default Button;
