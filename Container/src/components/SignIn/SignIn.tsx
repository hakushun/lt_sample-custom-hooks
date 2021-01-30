import Link from 'next/link';
import React from 'react';
import { AuthForm } from '../AuthForm';
import { Dialog } from '../Dialog';
import styles from './index.module.scss';

type Props = {
  isOpend: boolean;
  message: { title: string; description: string };
  signin: (_value: { email: string; password: string }) => Promise<void>;
};

export const SignIn: React.VFC<Props> = ({ isOpend, message, signin }) => (
  <>
    <AuthForm type="signin" onSubmit={signin} />
    {isOpend && <Dialog message={message} />}
    <div className={styles.root}>
      If you do not have an account, please{' '}
      <Link href="signup">
        <a>Create Account</a>
      </Link>
    </div>
  </>
);
