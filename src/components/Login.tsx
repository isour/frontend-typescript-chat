import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';
import {
  Formik, Field, ErrorMessage, Form as FormikForm, FormikHelpers, FormikProps,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

import routes from '../routes';
import useAuth from '../hooks/useAuth';
import '../styles/login-page.css';
import { TAuthContext } from '../contexts/AuthContext';

interface IFormValues {
  readonly username: string;
  readonly password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logIn } = useAuth() as TAuthContext;
  const rollbar = useRollbar();

  const [authFailed, setAuthFailed] = useState(false);

  const loginSubmit = async (
    values: IFormValues,
    { setSubmitting, setStatus }: FormikHelpers<IFormValues>,
  ) => {
    setStatus();
    setAuthFailed(false);
    setSubmitting(true);
    try {
      const response = await axios.post(routes.backend.loginPath(), values);
      const { token } = response.data;
      setStatus('USER_LOGINED_IN');
      setSubmitting(false);
      logIn({
        token,
        userName: values.username,
      });
      navigate(routes.frontend.chatPath());
    } catch (error: any) {
      rollbar.error(error);
      if (!error.isAxiosError) {
        toast.error(t('errors.unknown'));
        return;
      }

      setAuthFailed(true);
      setStatus(error.code);
      setSubmitting(false);

      toast.error(t('errors.network'));
    }
  };

  const getInputClassNames = (
    formik: Readonly<FormikProps<IFormValues>>,
    inputName: string,
  ) => classNames(
    { 'chat-form__input': true },
    { 'form-text': true },
    { 'form-text_error': formik.errors[inputName as keyof IFormValues] },
  );

  return (
    <Formik
      initialValues={{ password: '', username: '' }}
      validateOnBlur={false}
      onSubmit={loginSubmit}
    >
      {(formik) => (
        <div className="login-page">
          <FormikForm className="login-page__form">
            <h1 className="login-page__title">{t('login.title')}</h1>
            <div className="login-page__field form-field">
              <label className="form-field__label" htmlFor="username">
                {t('login.username')}
              </label>
              <Field
                type="text"
                name="username"
                id="username"
                validate={formik.errors.username}
                value={formik.values.username}
                onChange={formik.handleChange}
                className={getInputClassNames(formik, 'username')}
              />
              <ErrorMessage
                name="username"
                render={(msg) => (
                  <div className="form-error login-page__error">{t(msg)}</div>
                )}
              />
            </div>
            <div className="login-page__field form-field">
              <label className="form-field__label" htmlFor="password">
                {t('login.password')}
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                validate={formik.errors.password}
                value={formik.values.password}
                onChange={formik.handleChange}
                className={getInputClassNames(formik, 'password')}
              />
              <ErrorMessage
                name="password"
                render={(msg) => (
                  <div className="form-error login-page__error">{t(msg)}</div>
                )}
              />
            </div>
            {authFailed && (
              <div className="form-error login-page__error">
                {t('login.authFailed')}
              </div>
            )}
            <button
              className="button login-page__submit"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('login.submit')}
            </button>
          </FormikForm>
          <div className="login-page__footer">
            {t('login.newToChat')}
            <Link
              className="login-page__register"
              to={routes.frontend.registerPath()}
            >
              {t('login.signup')}
            </Link>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
