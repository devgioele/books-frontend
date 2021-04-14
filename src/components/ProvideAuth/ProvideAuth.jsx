import React from 'react';
import { authContext, useProvideAuth } from '../../hooks/auth';

export default function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}
