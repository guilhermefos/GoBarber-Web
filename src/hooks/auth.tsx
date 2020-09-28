/* eslint-disable react/prop-types */
import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface DataState {
  user: User;
  token: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  avatar_url: string;
}

interface AuthContextState {
  user: User;
  signOut(): void;
  signIn(credentials: Credentials): Promise<void>;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<DataState>(() => {
    const user = sessionStorage.getItem('@GoBarber:user');
    const token = sessionStorage.getItem('@GoBarber:token');

    if (user && token) {
      return { user: JSON.parse(user), token };
    }

    return {} as DataState;
  });

  const signIn = useCallback(async ({ email, password }: Credentials) => {
    const response = await api.post('sessions', { email, password });

    const { user, token } = response.data;

    sessionStorage.setItem('@GoBarber:token', token);
    sessionStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ user, token });
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem('@GoBarber:token');
    sessionStorage.removeItem('@GoBarber:user');

    setData({} as DataState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
