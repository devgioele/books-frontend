import { createContext, useContext, useState } from 'react';
import { LOCAL_STORAGE_TOKEN_KEY } from 'utils/environment';

const localStorageAuth = {
  login(onSuccess, token) {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    onSuccess(token);
  },
  logout(onSuccess) {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    onSuccess();
  },
  getToken() {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
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

  const isLoggedIn = () => !!token;

  return {
    token,
    isLoggedIn,
    login,
    logout,
  };
}
