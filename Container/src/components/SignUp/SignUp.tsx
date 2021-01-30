import React from 'react';
import { AuthForm } from '../AuthForm';
import { Dialog } from '../Dialog';

type Props = {
  isOpend: boolean;
  message: { title: string; description: string };
  signup: (_value: { email: string; password: string }) => Promise<void>;
};

export const SignUp: React.VFC<Props> = ({ isOpend, message, signup }) => (
  <>
    {isOpend && <Dialog message={message} />}
    <AuthForm type="signup" onSubmit={signup} />
  </>
);
