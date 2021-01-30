import React from 'react';
import { withAuth } from '../../helpers/withAuth';
import styles from './index.module.scss';

const Component: React.VFC = () => <div className={styles.root}>You’re Authenticated!</div>;

export const Mypage = withAuth(Component);
