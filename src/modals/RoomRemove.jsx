import { Formik, Form as FormikForm } from "formik";
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

import useApi from "../hooks/useApi.js";
import '../styles/room-remove.css';

const RoomRemove = (props) => {
    const api = useApi();
    const { onHide, modalInfo } = props;
    const room = modalInfo.item;
    const { t } = useTranslation();
    const rollbar = useRollbar();

    const createRoom = (values, { setStatus, setSubmitting }) => {
        setStatus();
        setSubmitting(true);
        const newRoom = {
            id: room.id,
            name: values.room
        };
        api.removeChannel(
            newRoom,
            () => {
                setSubmitting(false);
                onHide();
                toast.success(t('rooms.removed'));
            },
            (error) => {
                rollbar.error(error);
                setSubmitting(false);
        });
    }

    return (
        <Modal show>
        <Modal.Header closeButton onHide={onHide}>
            <Modal.Title>{t('modals.remove')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                initialValues= {{ room: room.name}}
                onSubmit={createRoom}
            >
            {(formik) => (
                <FormikForm  className="room-remove">
                    <div className="room-remove__content">
                        <div className="room-remove__text">{t('modals.remove')} {room.name}?</div>
                    </div>
                    <div className="room-remove__footer">
                        <button className="button button_secondary" type="button" disabled={formik.isSubmitting} onClick={onHide}>{t('modals.cancel')}</button>
                        <button className="button btn-danger" type="submit" disabled={formik.isSubmitting}>{t('modals.remove')}</button>
                    </div>
                </FormikForm>
            )}
            </Formik>
        </Modal.Body>
        </Modal>
    )
}

export { RoomRemove as default }