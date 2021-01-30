import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { alertError } from '../../libs/firebase/alertError';
import { emitError, selectDialog, selectDialogMessage } from '../../redux/modules/dialog';
import { SignIn as Presentational } from './SignIn';
import firebase from '../../libs/firebase/initFirebase';

export const SignIn: React.VFC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const dialogIsOpened = useSelector(selectDialog);
  const dialogMessage = useSelector(selectDialogMessage);

  const signin = async (value: { email: string; password: string }) => {
    const { email, password } = value;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      router.push('/mypage');
    } catch (error) {
      dispatch(emitError(alertError(error)));
    }
  };

  return <Presentational isOpend={dialogIsOpened} message={dialogMessage} signin={signin} />;
};
