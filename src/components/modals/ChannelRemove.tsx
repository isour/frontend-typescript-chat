import React from 'react';
import { Formik, Form as FormikForm, FormikHelpers } from 'formik';
import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

import { rootState } from '../../store/index';
import useApi from '../../hooks/useApi';
import '../../styles/channel-remove.css';

interface IProps {
  readonly onHide: () => void;
}

interface IFormValues {
  readonly channel: string;
}

const ChannelRemove: React.FC<IProps> = (props) => {
  const api = useApi();
  const { onHide } = props;
  const currentModal = useSelector((state: rootState) => state.modal);
  const currentChannel = currentModal.item;
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const handleRemoveChannel = (
    values: IFormValues,
    { setStatus, setSubmitting }: FormikHelpers<IFormValues>,
  ) => {
    setStatus();
    setSubmitting(true);
    const removeChannel: IChannel = {
      id: currentChannel.id,
      name: values.channel,
      removable: true,
    };
    api.removeChannel(
      removeChannel,
      () => {
        setSubmitting(false);
        onHide();
        toast.success(t('channels.removed'));
      },
      (error) => {
        toast.error(error);
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
        <Formik initialValues={{ channel: currentChannel.name }} onSubmit={handleRemoveChannel}>
          {(formik) => (
            <FormikForm className="channel-remove">
              <div className="channel-remove__content">
                <div className="channel-remove__text">
                  {t('modals.remove')}
                  {' '}
                  {currentChannel.name}
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
};

export default ChannelRemove;
