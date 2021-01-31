import React from 'react';
import { Form, Field } from 'react-final-form';
import { composeValidators, isEmail, isRequired, minValue } from '../../libs/validations';
import { Dialog } from '../Dialog';
import { Loading } from '../Loading';
import styles from './index.module.scss';

type Props = {
  isOpend: boolean;
  message: { title: string; description: string };
  type: 'signup' | 'signin';
  onSubmit: (_value: { email: string; password: string }) => void;
  signinWithGoogle: () => void;
};
export const AuthForm: React.VFC<Props> = ({
  isOpend,
  message,
  type,
  onSubmit,
  signinWithGoogle,
}) => (
  <>
    {isOpend && <Dialog message={message} />}
    <Form
      onSubmit={onSubmit}
      subscription={{ submitting: true }}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <fieldset>
            <legend>
              <h2 className={styles.title}>{type === 'signup' ? 'Sign Up' : 'Sign In'}</h2>
            </legend>
            <Field
              name="email"
              validate={composeValidators(isRequired, isEmail)}
              subscription={{
                value: true,
                active: true,
                error: true,
                touched: true,
              }}>
              {({ input, meta }) => (
                <div className={styles.inputWrapper}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    disabled={submitting}
                    className={styles.input}
                    {...input}
                  />
                  <div className={styles.error}>{meta.touched && meta.error && meta.error}</div>
                </div>
              )}
            </Field>
            <Field
              name="password"
              validate={composeValidators(isRequired, minValue(6))}
              subscription={{
                value: true,
                active: true,
                error: true,
                touched: true,
              }}>
              {({ input, meta }) => (
                <div className={styles.inputWrapper}>
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    autoComplete={type === 'signup' ? 'new-password' : 'current-password'}
                    disabled={submitting}
                    className={styles.input}
                    {...input}
                  />
                  <div className={styles.error}>{meta.touched && meta.error && meta.error}</div>
                </div>
              )}
            </Field>
          </fieldset>
          <div className={styles.actionWrapper}>
            {submitting ? (
              <Loading />
            ) : (
              <button type="submit" disabled={submitting} className={styles.action}>
                {type === 'signup' ? 'Create Account' : 'Sign In'}
              </button>
            )}
          </div>
          <div className={styles.provider}>
            <button type="button" className={styles.google} onClick={() => signinWithGoogle()}>
              <img
                className={styles.googleImg}
                alt="Google icon"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                width="18"
                height="18"
              />
              <span className={styles.googleText}>Sign in with Google</span>
            </button>
          </div>
        </form>
      )}
    />
  </>
);
