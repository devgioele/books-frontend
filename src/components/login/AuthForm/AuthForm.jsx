import React, { useState } from 'react';
import AuthProgress from 'screens/Login/authProgress';
import IdentityForm from 'components/login/IdentityForm';
import SignupForm from 'components/login/SignupForm';
import LoginForm from 'components/login/LoginForm';

export default function AuthForm({
  progress,
  ...remProps
}) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');

  switch (progress) {
    case AuthProgress.IDENTITY:
      return (
        <IdentityForm
          usernameOrEmail={usernameOrEmail}
          setUsernameOrEmail={setUsernameOrEmail}
          {...remProps}
        />
      );
    case AuthProgress.SIGNUP:
      return <SignupForm usernameOrEmail={usernameOrEmail} {...remProps} />;
    case AuthProgress.LOGIN:
      return <LoginForm usernameOrEmail={usernameOrEmail} {...remProps} />;
    default:
      return <div />;
  }
}
