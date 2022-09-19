import React, { useRef, useEffect } from 'react';
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import {useSelector} from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';

import useApi from "../hooks/useApi.js";
import useAuth from "../hooks/useAuth.js";
import getValidation from '../logic/validationRules.js';
import '../styles/chat-form.css';

const messageValidation = getValidation(['message']);

const ChatForm = ({ className }) => {
    const { t } = useTranslation();
    const api = useApi();
    const { user } = useAuth();
    const { currentRoomId } = useSelector((state) => state.roomsInfo);
    const rollbar = useRollbar();
    
    const handleSubmit = (values, { setStatus, setSubmitting }) => {
        setStatus();
        setSubmitting(true);
        const message = {
            message: leoProfanity.clean(values.message),
            roomId: currentRoomId,
            username: user.userName
        };
        api.sendMessage(
            message,
            () => {
                setSubmitting(false);
            },
            (error) => {
                rollbar.error(error);
                setStatus('error.code');
                setSubmitting(false);
            },
        );
        values.message = '';
    };

    const messageEl = useRef(null);

    useEffect(() => {
        messageEl.current.focus();
    }, []);

    const getInputClassNames = (formik, inputName) => {
        return classNames(
            { 'chat-form__input': true }, 
            { 'form-text': true }, 
            { 'form-text_error': (formik.touched && formik.errors[inputName]) }, 
          )
    }
    
    return (
        <Formik
            initialValues= {{ message: ""}}
            validationSchema={messageValidation}
            onSubmit={handleSubmit}
            >
            {(formik) => (
                <FormikForm className = {`chat-form ${className}`}>
                    <Field type="text" name="message" placeholder="Enter message" validate={formik.errors.message} value={formik.values.message} onChange={formik.handleChange} className={getInputClassNames(formik, 'message')} innerRef={messageEl}/>
                    <button className="button chat-form__submit" type="submit" disabled={formik.isSubmitting}>{t('chat.send')}</button>
                    <ErrorMessage name="message" render={msg => <div className="form-error chat-form__error">{t(msg)}</div>}/>
                </FormikForm>
            )}
        </Formik>
    );
}

export default ChatForm;
