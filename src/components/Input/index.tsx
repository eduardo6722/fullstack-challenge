import React from 'react';

import { Container } from './styled';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: any;
  error?: boolean;
}

const Input: React.FC<InputProps> = ({ register, error, ...rest }) => {
  return (
    <Container error={error}>
      <input ref={register} {...rest} />
    </Container>
  );
};

export default Input;
