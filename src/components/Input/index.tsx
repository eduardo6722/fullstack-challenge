import React from 'react';

import { Container } from './styled';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: any;
}

const Input: React.FC<InputProps> = ({ register, ...rest }) => {
  return (
    <Container>
      <input ref={register} {...rest} />
    </Container>
  );
};

export default Input;
