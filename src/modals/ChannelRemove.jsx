import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

import useApi from '../hooks/useApi.js';
import '../styles/channel-remove.css';

function ChannelRemove(props) {
  const api = useApi();
  const { onHide } = props;
  const currentModal = useSelector((state) => state.modal);
  const currentChannel = currentModal.item;
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const createChannel = (values, { setStatus, setSubmitting }) => {
    setStatus();
    setSubmitting(true);
    const newChannel = {
      id: currentChannel.id,
      name: values.channel,
    };
    api.removeChannel(
      newChannel,
      () => {
        setSubmitting(false);
        onHide();
        toast.success(t('channels.removed'));
      },
      (error) => {
        rollbar.error(error);
        setSubmitting(false);
      },
    );
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik initialValues={{ channel: currentChannel.name }} onSubmit={createChannel}>
          {(formik) => (
            <FormikForm className="channel-remove">
              <div className="channel-remove__content">
                <div className="channel-remove__text">
                  {t('modals.remove')}
                  {' '}
                  {formik.channel}
                  ?
                </div>
              </div>
              <div className="channel-remove__footer">
                <button
                  className="button button_secondary"
                  type="button"
                  disabled={formik.isSubmitting}
                  onClick={onHide}
                >
                  {t('modals.cancel')}
                </button>
                <button
                  className="button btn-danger"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {t('modals.remove')}
                </button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default ChannelRemove;
