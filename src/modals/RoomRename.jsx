import React, { useEffect, useRef } from 'react';
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import { Modal } from 'react-bootstrap';
import {useSelector} from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';

import useApi from "../hooks/useApi.js";
import getValidation from '../logic/validationRules.js';
import '../styles/room-rename.css';
import { getRoomsList } from "../selectors/index.js";

const roomValidation = (rooms) => getValidation(['room'], {rooms: rooms});

const RoomRename = (props) => {
    const api = useApi();
    const { onHide, modalInfo } = props;
    const room = modalInfo.item;
    const rooms = useSelector(getRoomsList);
    const { t } = useTranslation();
    const rollbar = useRollbar();

    const createRoom = (values, { setStatus, setSubmitting }) => {
        setStatus();
        setSubmitting(true);
        const newRoom = {
            id: room.id,
            name: leoProfanity.clean(values.room)
        };
        api.renameChannel(
            newRoom,
            () => {
                setSubmitting(false);
                onHide();
                toast.success(t('rooms.renamed'));
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
            { 'room-rename__content': true }, 
            { 'form-text': true }, 
            { 'form-text_error': formik.touched && formik.errors }, 
          )
    }

    return (
        <Modal show>
        <Modal.Header closeButton onHide={onHide}>
            <Modal.Title>{t('modals.rename')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                initialValues= {{ room: room.name}}
                validationSchema={() => roomValidation(rooms)}
                onSubmit={createRoom}
            >
            {(formik) => (
                <FormikForm  className="room-rename">
                    <div className="room-rename__content">
                        <label className="form-field__label" htmlFor="room">{t('modals.channelName')}</label>
                        <Field type="text" name="room" id="room" placeholder="Enter room" validate={formik.errors.room} value={formik.values.room} onChange={formik.handleChange} className={getRoomClassNames(formik)} innerRef={inputEl}/>
                        <ErrorMessage name="room" render={msg => <div className="form-error room-rename__error">{t(msg)}</div>}/>
                    </div>
                    <div className="room-rename__footer">
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

export { RoomRename as default }