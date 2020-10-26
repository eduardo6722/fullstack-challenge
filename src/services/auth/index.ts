import { AxiosResponse } from 'axios';

import api from 'services/api';
import { AccessToken, AuthData } from 'interfaces';

const signIn = (data: AuthData): Promise<AxiosResponse<AccessToken>> => {
  return api.post('/auth/signin', data);
};

const signUp = (data: AuthData): Promise<AxiosResponse<AccessToken>> => {
  return api.post('/auth/signup', data);
};

export { signIn, signUp };
