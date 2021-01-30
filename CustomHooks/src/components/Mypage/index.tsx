import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { PageLoader } from '../PageLoader';
import styles from './index.module.scss';

export const Mypage: React.VFC = () => {
  const { isAuth } = useAuth();

  return <>{isAuth ? <div className={styles.root}>You’re Authenticated!</div> : <PageLoader />}</>;
};
