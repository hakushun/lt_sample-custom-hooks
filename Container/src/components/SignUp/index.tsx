import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { emitError } from '../../redux/modules/dialog';
import { SignUp as Presentational } from './SignUp';
import firebase from '../../libs/firebase/initFirebase';
import { alertError } from '../../libs/firebase/alertError';

export const SignUp: React.VFC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const signup = async (value: { email: string; password: string }) => {
    const { email, password } = value;

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      router.push('/mypage');
    } catch (error) {
      dispatch(emitError(alertError(error)));
    }
  };
  return <Presentational signup={signup} />;
};
