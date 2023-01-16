import React, { useRef, useEffect } from 'react';
import {
  Formik, Field, ErrorMessage, Form as FormikForm, FormikHelpers, FormikProps,
} from 'formik';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';

import { rootState } from '../store/index';
import useApi from '../hooks/useApi';
import useAuth from '../hooks/useAuth';
import getValidation from '../logic/validationRules';
import { TAuthContext } from '../contexts/AuthContext';
import '../styles/chat-form.css';

interface IProps {
  readonly className: string;
}

interface IChatFormValues {
  readonly message: string;
}

const messageValidation = getValidation(['message']);

const ChatForm: React.FC<IProps> = ({ className }) => {
  const { t } = useTranslation();
  const api = useApi();
  const { user } = useAuth() as TAuthContext;
  const { currentChannelId } = useSelector((state: rootState) => state.channelsInfo);
  const rollbar = useRollbar();

  const handleSubmit = (
    values: IChatFormValues,
    { setStatus, setSubmitting, resetForm }: FormikHelpers<IChatFormValues>,
  ) => {
    setStatus();
    setSubmitting(true);
    const message = {
      message: leoProfanity.clean(values.message),
      channelId: currentChannelId,
      username: user.userName,
    };
    api.sendMessage(
      message,
      () => {
        setSubmitting(false);
        resetForm();
      },
      (error: any) => {
        rollbar.error(error);
        setStatus('error.code');
        setSubmitting(false);
      },
    );
  };

  const messageEl = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    messageEl.current?.focus();
  }, []);

  const getInputClassNames = (
    formik: Readonly<FormikProps<IChatFormValues>>,
    inputName: string,
  ) => classNames(
    { 'chat-form__input': true },
    { 'form-text': true },
    { 'form-text_error': formik.errors[inputName as keyof IChatFormValues] },
  );

  const initialValues:IChatFormValues = { message: '' };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={messageValidation}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <FormikForm className={`chat-form ${className}`}>
          <Field
            type="text"
            name="message"
            placeholder={t('chat.newMessage')}
            aria-label={t('chat.newMessage')}
            validate={formik.errors.message}
            value={formik.values.message}
            onChange={formik.handleChange}
            className={getInputClassNames(formik, 'message')}
            innerRef={messageEl}
          />
          <button
            className="button chat-form__submit"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {t('chat.send')}
          </button>
          <ErrorMessage
            name="message"
            render={(msg) => (
              <div className="form-error chat-form__error">{t(msg)}</div>
            )}
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default ChatForm;
