import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AuthForm } from '../AuthForm';

export const SignUp: React.VFC = () => {
  const { signup } = useAuth();
  return <AuthForm type="signup" onSubmit={signup} />;
};
