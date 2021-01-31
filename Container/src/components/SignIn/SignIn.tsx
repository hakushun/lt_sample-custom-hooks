import Link from 'next/link';
import React from 'react';
import { AuthForm } from '../AuthForm';
import styles from './index.module.scss';

type Props = {
  signin: (_value: { email: string; password: string }) => Promise<void>;
};

export const SignIn: React.VFC<Props> = ({ signin }) => (
  <>
    <AuthForm type="signin" onSubmit={signin} />
    <div className={styles.root}>
      If you do not have an account, please{' '}
      <Link href="signup">
        <a>Create Account</a>
      </Link>
    </div>
  </>
);
