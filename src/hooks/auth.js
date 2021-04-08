import { useContext, createContext, useState } from "react";

// TODO: replace authentication strategy
const fakeAuth = {
  isAuthenticated: false,
  login(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  logout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export const authContext = createContext({});

export function useAuth() {
  return useContext(authContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const login = cb => fakeAuth.login(() => {
      setUser("user");
      cb();
    });

  const logout = cb => fakeAuth.logout(() => {
      setUser(null);
      cb();
    });

  // TODO: update with real logic.
  const isLoggedIn = () => true

  return {
    user,
    isLoggedIn,
    login,
    logout
  };
}
