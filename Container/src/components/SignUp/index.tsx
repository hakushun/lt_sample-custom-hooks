import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { emitError, selectDialog, selectDialogMessage } from '../../redux/modules/dialog';
import { SignUp as Presentational } from './SignUp';
import firebase from '../../libs/firebase/initFirebase';
import { alertError } from '../../libs/firebase/alertError';

export const SignUp: React.VFC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const dialogIsOpened = useSelector(selectDialog);
  const dialogMessage = useSelector(selectDialogMessage);

  const signup = async (value: { email: string; password: string }) => {
    const { email, password } = value;

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      router.push('/mypage');
    } catch (error) {
      dispatch(emitError(alertError(error)));
    }
  };
  return <Presentational isOpend={dialogIsOpened} message={dialogMessage} signup={signup} />;
};
