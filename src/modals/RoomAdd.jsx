import React, { useEffect, useRef } from 'react';
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import { Modal } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';

import { actions } from '../slices/index.js';
import getValidation from '../logic/validationRules.js';
import useApi from "../hooks/useApi.js";
import '../styles/room-add.css';
import { getRoomsList } from "../selectors/index.js";


const roomValidation = (rooms) => getValidation(['room'], {rooms: rooms});

const RoomAdd = (props) => {
    const dispatch = useDispatch();
    const api = useApi();
    const { onHide } = props;
    const rooms = useSelector(getRoomsList);
    const { t } = useTranslation();
    const rollbar = useRollbar();

    const createRoom = (values, { setStatus, setSubmitting }) => {
        setStatus();
        setSubmitting(true);
        const room = {
            name: leoProfanity.clean(values.room)
        };
        api.createChannel(
            room,
            (result) => {
                setSubmitting(false);
                onHide();
                dispatch(actions.setRoom(result[0].data))
                toast.success(t('rooms.created'));
            },
            (error) => {
                rollbar.error(error);
                setSubmitting(false);
        });
    }
  
    const inputEl = useRef(null);

    useEffect(() => {
        inputEl.current.focus();
    }, []);

    const getRoomClassNames = (formik) => {
        return classNames(
            { 'RoomAdd-room__content': true }, 
            { 'form-text': true }, 
            { 'form-text_error': formik.touched && formik.errors }, 
          )
    }

    return (
        <Modal show>
        <Modal.Header closeButton onHide={onHide}>
            <Modal.Title>{t('modals.add')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                initialValues= {{ room: ""}}
                validationSchema={() => roomValidation(rooms)}
                onSubmit={createRoom}
            >
            {(formik) => (
                <FormikForm className="add-room">
                    <div className="add-room__content">
                        <label className="form-field__label" htmlFor="room">{t('modals.channelName')}</label>
                        <Field type="text" name="room" id="room" validate={formik.errors.room} value={formik.values.room} onChange={formik.handleChange} className={getRoomClassNames(formik)} innerRef={inputEl}/>
                        <ErrorMessage name="room" render={msg => <div className="form-error add-room__error">{t(msg)}</div>}/>
                    </div>
                    <div className="add-room__footer">
                        <button className="button button_secondary" type="button" disabled={formik.isSubmitting} onClick={onHide}>{t('modals.cancel')}</button>
                        <button className="button" type="submit" disabled={formik.isSubmitting}>{t('modals.submit')}</button>
                    </div>
                </FormikForm>
            )}
            </Formik>
        </Modal.Body>
        </Modal>
    )
}

export { RoomAdd as default }