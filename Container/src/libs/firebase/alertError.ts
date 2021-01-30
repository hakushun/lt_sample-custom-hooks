export const alertError = (
  error: firebase.default.auth.Error,
): {
  title: string;
  description: string;
} => {
  switch (error.code) {
    case 'auth/invalid-email':
      return {
        title: 'auth/invalid-email',
        description: 'メールアドレスを正しく入力してください。',
      };
    case 'auth/weak-password':
      return {
        title: 'auth/weak-password',
        description: '６文字以上のパスワードを設定してください。',
      };
    case 'auth/email-already-in-use':
      return {
        title: 'auth/email-already-in-use',
        description:
          'このメールアドレスは既に登録されています。\n SigninフォームよりSigninしてください。',
      };
    case 'auth/wrong-password':
      return {
        title: 'auth/wrong-password',
        description: 'パスワードが違います。',
      };
    case 'auth/user-not-found':
      return {
        title: 'auth/user-not-found',
        description:
          'このメールアドレスは登録されていません\nSign Upフォームより登録してください。',
      };
    default:
      return { title: `${error.code}`, description: `${error.message}` };
  }
};
