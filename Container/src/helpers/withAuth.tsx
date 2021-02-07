import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import firebase from '../libs/firebase/initFirebase';
import { authUser, selectIsAuth } from '../redux/modules/user';
import { PageLoader } from '../components/PageLoader';

export const withAuth = (Component: React.FC): React.FC => (props: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged(async (user) => {
      if (user) {
        dispatch(authUser(true));
      } else {
        dispatch(authUser(false));
        router.push('/');
      }
    });
    return () => {
      cancelAuthListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{!isAuth ? <PageLoader /> : <Component {...props} />}</>;
};
