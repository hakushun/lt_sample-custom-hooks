# Custom Hooks vs Container Component Sample Code

## ディレクトリ構成
### Container配下
- Container Componentを使用したコード

### CustomHooks配下
- Custom Hooksを使用したコード
---
## Container Componentとは
- [https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [https://medium.com/@learnreact/container-components-c0e67432e005](https://medium.com/@learnreact/container-components-c0e67432e005)

## Custom Hooksとは
### Hooksとは
- [https://reactjs.org/docs/hooks-intro.html](https://reactjs.org/docs/hooks-intro.html)
- [https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)

### Custom Hooksとは
- [https://ja.reactjs.org/docs/hooks-custom.html](https://ja.reactjs.org/docs/hooks-custom.html)

## Example 1: 認証系ロジックの書き換え
### Use Container Component
- [Container/src/components/SignUp/index.tsx](Container/src/components/SignUp/index.tsx)
```jsx
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
```

- [Container/src/components/SignIn/index.tsx](Container/src/components/SignIn/index.tsx)
```jsx
export const SignIn: React.VFC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const signin = async (value: { email: string; password: string }) => {
    const { email, password } = value;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      router.push('/mypage');
    } catch (error) {
      dispatch(emitError(alertError(error)));
    }
  };

  return <Presentational signin={signin} />;
};
```

- [Container/src/components/AuthForm/index.tsx](Container/src/components/AuthForm/index.tsx)
```jsx
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
```

- [Container/src/components/Header/index.tsx](Container/src/components/Header/index.tsx)
```jsx
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
```

### Use Custom Hooks
- [CustomHooks/src/hooks/useAuth.ts](Container/src/components/Header/index.tsx)
```jsx
export const useAuth: UseAuthType = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // Container/src/components/Header/index.tsxから移植
  const isAuth = useSelector(selectIsAuth);

  // Container/src/components/SignUp/index.tsxから移植
  const signup = async (value: { email: string; password: string }) => {
    const { email, password } = value;

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      router.push('/mypage');
    } catch (error) {
      dispatch(emitError(alertError(error)));
    }
  };

  // Container/src/components/SignIn/index.tsxから移植
  const signin = async (value: { email: string; password: string }) => {
    const { email, password } = value;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      router.push('/mypage');
    } catch (error) {
      dispatch(emitError(alertError(error)));
    }
  };

  // Container/src/components/AuthForm/index.tsxから移植
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const signinWithGoogle = async () => {
    try {
      await firebase.auth().signInWithPopup(googleProvider);
      router.push('/mypage');
    } catch (error) {
      dispatch(emitError(alertError(error)));
    }
  };

  // Container/src/components/Header/index.tsxから移植
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

  return { isAuth, signup, signin, signinWithGoogle, logout };
};
```

- [CustomHooks/src/components/SignUp/index.tsx](CustomHooks/src/components/SignUp/index.tsx)
```jsx
export const SignUp: React.VFC = () => {
  const { signup } = useAuth();

  return <AuthForm type="signup" onSubmit={signup} />;
};
```

- [CustomHooks/src/components/SignIn/index.tsx](CustomHooks/src/components/SignIn/index.tsx)
```jsx
export const SignIn: React.VFC = () => {
  const { signin } = useAuth();

  return (
    <>
      <AuthForm type="signin" onSubmit={signin} />
      <div className={styles.root}>
        If you do not have an account, please{' '}
        <Link href="/signup">
          <a>Create Account</a>
        </Link>
      </div>
    </>
  );
};
```

- [CustomHooks/src/components/AuthForm/index.tsx](CustomHooks/src/components/AuthForm/index.tsx)
```jsx
export const AuthForm: React.VFC<Props> = ({ type, onSubmit }) => {
  const { signinWithGoogle } = useAuth();
  const dialogIsOpened = useSelector(selectDialog);
  const dialogMessage = useSelector(selectDialogMessage);

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
```

- [CustomHooks/src/components/Header/index.tsx](CustomHooks/src/components/Header/index.tsx)
```jsx
export const Header: React.VFC = () => {
  const { isAuth, logout } = useAuth();

  return (
    <header className={styles.header}>
      ~ 省略 ~
    </header>
  );
};
```

## Example 2: ダイアログ関連ロジックの書き換え
### Use Container Component
- [Container/src/components/AuthForm/index.tsx](Container/src/components/AuthForm/index.tsx)
```jsx
export const AuthForm: React.VFC<Props> = ({ type, onSubmit }) => {
  const { signinWithGoogle } = useAuth();
  const dialogIsOpened = useSelector(selectDialog);
  const dialogMessage = useSelector(selectDialogMessage);

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
```

- [Container/src/components/Dialog/index.tsx](Container/src/components/Dialog/index.tsx)
```jsx
export const Dialog: React.FC<Props> = ({ message }) => {
  const dispatch = useDispatch();

  const closeDialog = () => {
    dispatch(toggle());
  };

  return <Preasentational message={message} closeDialog={closeDialog} />;
};
```

### Use Custom Hooks
- [CustomHooks/src/hooks/useDialog.ts](CustomHooks/src/hooks/useDialog.ts)
```jsx
export const useDialog: UseDialogType = () => {
  const dispatch = useDispatch();
  // Container/src/components/AuthForm/index.tsxから移植
  const isOpend = useSelector(selectDialog);
  const message = useSelector(selectDialogMessage);

  // Container/src/components/Dialog/index.tsxから移植
  const closeDialog = () => {
    dispatch(toggle());
  };

  return { isOpend, message, closeDialog };
};
```

- [Container/src/components/AuthForm/index.tsx](Container/src/components/AuthForm/index.tsx)
```jsx
export const AuthForm: React.VFC<Props> = ({ type, onSubmit }) => {
  const { isOpend, message } = useDialog();
  const { signinWithGoogle } = useAuth();

  return (
    <>
      ~ 省略 ~
    </>
  );
};
```

- [Container/src/components/Dialog/index.tsx](Container/src/components/Dialog/index.tsx)
```jsx
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
```

## Example 3: HOCの書き換え
### Use HOC
- [Container/src/helpers/withAuth.tsx](Container/src/helpers/withAuth.tsx)
```jsx
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
```

- [Container/src/components/Mypage/index.tsx](Container/src/components/Mypage/index.tsx)
```jsx
const Component: React.VFC = () => <div className={styles.root}>You’re Authenticated!</div>;

export const Mypage = withAuth(Component);
```

### Use Custom Hooks
- [CustomHooks/src/hooks/useAuth.ts](CustomHooks/src/hooks/useAuth.ts)
```jsx
export const useAuth: UseAuthType = () => {
	〜　省略　〜

  // Container/src/helpers/withAuth.tsxから移植
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
```

- [CustomHooks/src/components/Mypage/index.tsx](CustomHooks/src/components/Mypage/index.tsx)
```jsx
export const Mypage: React.VFC = () => {
  const { isAuth } = useAuth();

  return <>{isAuth ? <div className={styles.root}>You’re Authenticated!</div> : <PageLoader />}</>;
};
```