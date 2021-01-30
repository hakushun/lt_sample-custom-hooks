import React from 'react';
import { useDialog } from '../../hooks/useDialog';
import { Overlay } from '../Overlay';
import styles from './index.module.scss';

type Props = {
  message: { title: string; description: string };
};

export const Dialog: React.FC<Props> = ({ message }) => {
  const { closeDialog } = useDialog();

  return (
    <Overlay>
      <div className={styles.dialog}>
        <div className={styles.title}>{message.title}</div>
        <div className={styles.description}>
          <div>{message.description}</div>
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.button} type="button" onClick={() => closeDialog()}>
            閉じる
          </button>
        </div>
      </div>
    </Overlay>
  );
};
