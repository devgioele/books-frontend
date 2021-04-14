import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

export default function Login() {
  const auth = useAuth();
  const location = useLocation();
  const history = useHistory();

  const onClick = () => {
    auth.login(() => history.replace(location.state.from));
  };

  return (
    <>
      <h1>Login</h1>
      <button onClick={onClick}>Login</button>
    </>
  );
}
