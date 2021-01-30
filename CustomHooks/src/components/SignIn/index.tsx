import Link from 'next/link';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AuthForm } from '../AuthForm';
import styles from './index.module.scss';

export const SignIn: React.VFC = () => {
  const { signin } = useAuth();

  return (
    <>
      <AuthForm type="signin" onSubmit={signin} />
      <div className={styles.root}>
        If you do not have an account, please{' '}
        <Link href="/signup">
          <a>Create Account</a>
        </Link>
      </div>
    </>
  );
};
