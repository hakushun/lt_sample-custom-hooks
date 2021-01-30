import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { authUser, selectIsAuth } from '../../redux/modules/user';
import { Header as Presentational } from './Header';
import firebase from '../../libs/firebase/initFirebase';
import { alertError } from '../../libs/firebase/alertError';
import { emitError } from '../../redux/modules/dialog';

export const Header: React.VFC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const logout = async () =>
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(authUser(false));
        router.push('/');
      })
      .catch((error) => {
        dispatch(emitError(alertError(error)));
      });

  return <Presentational isAuth={isAuth} logout={logout} />;
};
