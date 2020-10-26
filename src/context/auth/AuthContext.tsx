import React from 'react';
import { useHistory } from 'react-router-dom';

import { AccessToken, AuthData } from 'interfaces';

import { signIn as ApiSignIn, signUp as ApiSignUp } from 'services/auth';
import { toast } from 'react-toastify';

interface AuthContextData {
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (data: AuthData) => Promise<void>;
  signUp: (data: AuthData) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = React.createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const [isAuthenticated, setIsAutenticated] = React.useState(
    () => !!localStorage.getItem('@t10-challenge:accessToken')
  );

  const history = useHistory();

  const saveTokenAndGo = React.useCallback(
    ({ accessToken }: AccessToken) => {
      localStorage.setItem(
        '@t10-challenge:accessToken',
        JSON.stringify(accessToken)
      );
      setIsAutenticated(true);
      history.push('/');
    },
    [history]
  );

  const signIn = React.useCallback(
    async (data: AuthData) => {
      setLoading(true);
      try {
        const response = await ApiSignIn(data);
        saveTokenAndGo(response.data);
      } catch (error) {
        toast.error('Failed to signin!');
      }
      setLoading(false);
    },
    [saveTokenAndGo]
  );

  const signUp = React.useCallback(
    async (data: AuthData) => {
      setLoading(true);
      try {
        const response = await ApiSignUp(data);
        saveTokenAndGo(response.data);
      } catch (error) {
        toast.error('Failed to signup!');
      }
      setLoading(false);
    },
    [saveTokenAndGo]
  );

  const signOut = React.useCallback(() => {
    localStorage.removeItem('@t10-challenge:accessToken');
    setIsAutenticated(false);
    history.push('/signin');
  }, [history]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
