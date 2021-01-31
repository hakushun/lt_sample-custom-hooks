import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AuthForm as Presentational } from './AuthForm';
import firebase from '../../libs/firebase/initFirebase';
import { alertError } from '../../libs/firebase/alertError';
import { emitError, selectDialog, selectDialogMessage } from '../../redux/modules/dialog';

type Props = {
  type: 'signup' | 'signin';
  onSubmit: (_value: { email: string; password: string }) => Promise<void>;
};
export const AuthForm: React.VFC<Props> = ({ type, onSubmit }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const dialogIsOpened = useSelector(selectDialog);
  const dialogMessage = useSelector(selectDialogMessage);

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const signinWithGoogle = async () => {
    try {
      await firebase.auth().signInWithPopup(googleProvider);
      router.push('/mypage');
    } catch (error) {
      dispatch(emitError(alertError(error)));
    }
  };

  return (
    <Presentational
      isOpend={dialogIsOpened}
      message={dialogMessage}
      type={type}
      onSubmit={onSubmit}
      signinWithGoogle={signinWithGoogle}
    />
  );
};
