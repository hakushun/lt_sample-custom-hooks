import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { authUser, selectIsAuth } from '../redux/modules/user';
import { emitError } from '../redux/modules/dialog';
import { alertError } from '../libs/firebase/alertError';
import firebase from '../libs/firebase/initFirebase';

type UseAuthType = () => {
  isAuth: boolean;
  signup: (_value: { email: string; password: string }) => Promise<void>;
  signin: (_value: { email: string; password: string }) => Promise<void>;
  signinWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};
export const useAuth: UseAuthType = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const signup = async (value: { email: string; password: string }) => {
    const { email, password } = value;

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      router.push('/mypage');
    } catch (error) {
      dispatch(emitError(alertError(error)));
    }
  };

  const signin = async (value: { email: string; password: string }) => {
    const { email, password } = value;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      router.push('/mypage');
    } catch (error) {
      dispatch(emitError(alertError(error)));
    }
  };

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const signinWithGoogle = async () => {
    try {
      await firebase.auth().signInWithPopup(googleProvider);
      router.push('/mypage');
    } catch (error) {
      dispatch(emitError(alertError(error)));
    }
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut()
      dispatch(authUser(false));
      router.push('/');
    } catch (error) {
      dispatch(emitError(alertError(error)));
    }
  }

  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged(async (user) => {
      if (user) {
        dispatch(authUser(true));
      } else {
        dispatch(authUser(false));
        if (router.pathname === '/signin' || router.pathname === '/signup') {
          router.push(router.pathname);
          return;
        }
        router.push('/');
      }
    });
    return () => {
      cancelAuthListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isAuth, signup, signin, signinWithGoogle, logout };
};
