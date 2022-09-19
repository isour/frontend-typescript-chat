import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useNavigate, Link } from "react-router-dom";
import { useRollbar } from '@rollbar/react';

import routes from "../routes";
import getValidation from '../logic/validationRules.js';
import useAuth from "../hooks/useAuth.js";
import '../styles/registration-page.css';

const registerValidation = getValidation(['username', 'password', 'password2']);

const Register = () => {
    const navigate = useNavigate();
    const [registerFailed, setRegisterFailed] = useState(false);
    const { logIn } = useAuth();
    const { t } = useTranslation();
    const rollbar = useRollbar();
    
    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            const result = await axios.post(
              routes.backend.registerPath(),
              { username: values.username, password: values.password },
            );
            logIn({
                token: result.data.token,
                userName: result.data.username
            });
            navigate(routes.frontend.chatPath());
          } catch (error) {
            rollbar.error(error);
            if (!error.isAxiosError) {
              throw error;
            }
    
            if (error.response.status === 409) {
                nameEl.current.focus();
                setRegisterFailed(true);
                return;
            }
    
            throw error;
          }
    };
    
    const nameEl = useRef(null);

    useEffect(() => {
        nameEl.current.focus();
    }, []);

    const getInputClassNames = (formik, inputName) => {
        return classNames(
            { 'form-register__input': true }, 
            { 'form-text': true }, 
            { 'form-text_error': (formik.touched && formik.errors[inputName]) || registerFailed }, 
          )
    }
    
    return (
        <>
            <Formik
            initialValues= {{ password: "", password2: "", username: ""}}
            validationSchema={registerValidation}
            onSubmit={handleSubmit}
            >
            {(formik) => (
                <div className="form-register">
                    <FormikForm className="form-register__form">
                        <h1 className="form-register__title">{t('signup.title')}</h1>
                        <div className="form-register__field">
                            <label className="form-field__label" htmlFor="username">{t('signup.username')}</label>
                            <Field type="text" name="username" id="username" validate={formik.errors.username} value={formik.values.username} onChange={formik.handleChange} className={getInputClassNames(formik, 'username')} innerRef={nameEl}/>
                            <ErrorMessage name="username" render={msg => <div className="form-error form-register__error">{t(msg)}</div>}/>
                        </div>
                        <div className="form-register__field">
                            <label className="form-field__label" htmlFor="password">{t('signup.password')}</label>
                            <Field type="password" name="password" id="password" validate={formik.errors.password} value={formik.values.password} onChange={formik.handleChange} className={getInputClassNames(formik, 'password')}/>
                            <ErrorMessage name="password" render={msg => <div className="form-error form-register__error">{t(msg)}</div>}/>
                        </div>
                        <div className="form-register__field">
                            <label className="form-field__label" htmlFor="password2">{t('signup.confirm')}</label>
                            <Field type="password" name="password2" id="password2" validate={formik.errors.password2} value={formik.values.password2} onChange={formik.handleChange} className={getInputClassNames(formik, 'password2')}/>
                            <ErrorMessage name="password2" render={msg => <div className="form-error form-register__error">{t(msg)}</div>}/>
                        </div>
                        {registerFailed && <div className="form-error form-register__error">{t('signup.alreadyExists')}</div>}
                        <button className="button" type="submit" disabled={formik.isSubmitting}>{t('signup.submit')}</button>
                    </FormikForm>
                    <div className="form-register__footer">
                        <Link to={routes.frontend.loginPath()}>{t('signup.enter')}</Link>
                    </div>
                </div>
            )}
        </Formik>
        </>
    )
}

export default Register;