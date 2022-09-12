import * as Yup from "yup";
import React, { useEffect, useRef } from 'react';
import { Formik, Field, ErrorMessage, Form as FormikForm, useFormik } from "formik";
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import classNames from 'classnames';

import { actions } from '../slices/index.js';
import useApi from "../hooks/useApi.js";
import '../styles/add-room.css';
import { getRoomsList } from "../selectors/index.js";

const roomValidation = (rooms) => Yup.object().shape({
    room: Yup.string().min(3, "Too short").max(40, "Please enter no more than 40 characters").required( "Please enter your message" ).notOneOf(rooms, 'Уже существует'),
});

const RoomAdd = (props) => {
    const dispatch = useDispatch();
    const api = useApi();
    const { onHide } = props;
    const rooms = useSelector(getRoomsList);

    const createRoom = (values, { setStatus, setSubmitting }) => {
        setStatus();
        setSubmitting(true);
        const room = {
            name: values.room
        };
        api.createChannel(
            room,
            (result) => {
                setSubmitting(false);
                onHide();
                dispatch(actions.setRoom(result[0].data))
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
            { 'RoomAdd-room__content': true }, 
            { 'form-text': true }, 
            { 'form-text_error': formik.touched && formik.errors }, 
          )
    }

    return (
        <Modal show>
        <Modal.Header closeButton onHide={onHide}>
            <Modal.Title>RoomAdd</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                initialValues= {{ room: ""}}
                validationSchema={() => roomValidation(rooms)}
                onSubmit={createRoom}
            >
            {(formik) => (
                <FormikForm  className="RoomAdd-room">
                    <div className="RoomAdd-room__content">
                        <Field type="text" name="room" placeholder="Enter room" validate={formik.errors.room} value={formik.values.room} onChange={formik.handleChange} className={getRoomClassNames(formik)} innerRef={inputEl}/>
                        <ErrorMessage name="room" component="div" className="form-error RoomAdd-room__error" />
                    </div>
                    <div className="RoomAdd-room__footer">
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

export { RoomAdd as default }