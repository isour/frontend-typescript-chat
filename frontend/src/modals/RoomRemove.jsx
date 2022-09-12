import * as Yup from "yup";
import React, { useEffect, useRef } from 'react';
import { Formik, Field, ErrorMessage, Form as FormikForm, useFormik } from "formik";
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import classNames from 'classnames';

import { actions } from '../slices/index.js';
import useApi from "../hooks/useApi.js";
import '../styles/room-rename.css';

const roomValidation = Yup.object().shape({
    room: Yup.string().min(3, "Too short").max(40, "Please enter no more than 40 characters").required( "Please enter your message" ),
});

const RoomRemove = (props) => {
    const dispatch = useDispatch();
    const api = useApi();
    const { onHide, modalInfo } = props;
    const room = modalInfo.item;

    const createRoom = (values, { setStatus, setSubmitting }) => {
        setStatus();
        setSubmitting(true);
        const newRoom = {
            id: room.id,
            name: values.room
        };
        console.log(newRoom);
        api.removeChannel(
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

    return (
        <Modal show>
        <Modal.Header closeButton onHide={onHide}>
            <Modal.Title>RoomRemove</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                initialValues= {{ room: room.name}}
                validationSchema={roomValidation}
                onSubmit={createRoom}
            >
            {(formik) => (
                <FormikForm  className="RoomRemove-room">
                    <div className="RoomRemove-room__content">
                        <div className="RoomRemove-room__text">Удалить канал {room.name}?</div>
                    </div>
                    <div className="RoomRemove-room__footer">
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

export { RoomRemove as default }