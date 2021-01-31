import React from 'react';
import { AuthForm } from '../AuthForm';

type Props = {
  signup: (_value: { email: string; password: string }) => Promise<void>;
};

export const SignUp: React.VFC<Props> = ({ signup }) => (
  <AuthForm type="signup" onSubmit={signup} />
);
