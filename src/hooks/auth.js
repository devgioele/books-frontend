import { createContext, useContext, useState } from 'react';

const localStorageAuth = {
  login(onSuccess, token) {
    localStorage.setItem('token', token);
    onSuccess(token);
  },
  logout(onSuccess) {
    localStorage.removeItem('token');
    onSuccess();
  },
  getToken() {
    return localStorage.getItem('token');
  },
};

export const authContext = createContext({});

export function useAuth() {
  return useContext(authContext);
}

export function useProvideAuth() {
  const [token, setToken] = useState(localStorageAuth.getToken());

  const login = (serverToken) =>
    localStorageAuth.login((savedToken) => {
      setToken(savedToken);
    }, serverToken);

  const logout = () =>
    localStorageAuth.logout(() => {
      setToken(null);
    });

  const isLoggedIn = () => token;

  return {
    token,
    isLoggedIn,
    login,
    logout,
  };
}
