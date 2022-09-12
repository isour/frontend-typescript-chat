import * as Yup from "yup";
import React, { useEffect, useRef } from 'react';
import { Formik, Field, ErrorMessage, Form as FormikForm, useFormik } from "formik";
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import classNames from 'classnames';

import useApi from "../hooks/useApi.js";
import '../styles/room-rename.css';
import { getRoomsList } from "../selectors/index.js";

const roomValidation = (rooms) => Yup.object().shape({
    room: Yup.string().min(3, "Too short").max(40, "Please enter no more than 40 characters").required( "Please enter your message" ).notOneOf(rooms, 'Уже существует'),
});

const RoomRename = (props) => {
    const api = useApi();
    const { onHide, modalInfo } = props;
    const room = modalInfo.item;
    const rooms = useSelector(getRoomsList);

    const createRoom = (values, { setStatus, setSubmitting }) => {
        setStatus();
        setSubmitting(true);
        const newRoom = {
            id: room.id,
            name: values.room
        };
        console.log(newRoom);
        api.renameChannel(
            newRoom,
            () => {
                setSubmitting(false);
                onHide();
            },
            () => {
                console.log('error');
                // setStatus('error.code');
                setSubmitting(false);
        });
    }
  
    const inputEl = useRef(null);

    useEffect(() => {
        inputEl.current.focus();
    }, []);

    const getRoomClassNames = (formik) => {
        return classNames(
            { 'RoomRename-room__content': true }, 
            { 'form-text': true }, 
            { 'form-text_error': formik.touched && formik.errors }, 
          )
    }

    return (
        <Modal show>
        <Modal.Header closeButton onHide={onHide}>
            <Modal.Title>RoomRename</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                initialValues= {{ room: room.name}}
                validationSchema={() => roomValidation(rooms)}
                onSubmit={createRoom}
            >
            {(formik) => (
                <FormikForm  className="RoomRename-room">
                    <div className="RoomRename-room__content">
                        <Field type="text" name="room" placeholder="Enter room" validate={formik.errors.room} value={formik.values.room} onChange={formik.handleChange} className={getRoomClassNames(formik)} innerRef={inputEl}/>
                        <ErrorMessage name="room" component="div" className="form-error RoomRename-room__error" />
                    </div>
                    <div className="RoomRename-room__footer">
                        <button className="button button_secondary" type="button" disabled={formik.isSubmitting} onClick={onHide}>Cancel</button>
                        <button className="button" type="submit" disabled={formik.isSubmitting}>Send</button>
                    </div>
                </FormikForm>
            )}
            </Formik>
        </Modal.Body>
        </Modal>
    )
}

export { RoomRename as default }