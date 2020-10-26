import React from 'react';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from 'components/Input';
import Button from 'components/Button';
import CircularLoading from 'components/CircularLoading';

import { AuthData } from 'interfaces';
import { useAuth } from 'context/auth/AuthContext';

import { Form, Container } from './styled';

const schema = yup.object().shape({
  email: yup.string().email().required('E-mail is required!'),
  password: yup.string().min(6, 'Password must be at least 6 characters!'),
});

const SignUp: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<AuthData>({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const { signUp, loading, isAuthenticated } = useAuth();

  const onSubmit = React.useCallback(
    (values: AuthData) => {
      signUp(values);
    },
    [signUp]
  );

  React.useEffect(() => {
    if (isAuthenticated) history.push('/');
  }, [history, isAuthenticated]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="email"
          register={register({ required: true })}
          placeholder="E-mail*"
          error={!!errors.email?.message}
        />
        <Input
          type="password"
          name="password"
          register={register({ required: true })}
          placeholder="Password*"
          error={!!errors.password?.message}
        />
        {loading ? <CircularLoading /> : <Button type="submit">SignUp</Button>}
        <Link to="/signin">Back to login</Link>
      </Form>
    </Container>
  );
};

export default SignUp;
