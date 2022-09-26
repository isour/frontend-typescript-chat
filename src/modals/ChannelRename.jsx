import React, { useEffect, useRef } from 'react';
import {
  Formik, Field, ErrorMessage, Form as FormikForm,
} from 'formik';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';

import useApi from '../hooks/useApi.js';
import getValidation from '../logic/validationRules.js';
import '../styles/channel-rename.css';
import { getChannelsList } from '../selectors/index.js';

const channelValidation = (channels) => getValidation(['channel'], { channels });

function ChannelRename(props) {
  const api = useApi();
  const { onHide } = props;
  const currentModal = useSelector((state) => state.modal);
  const currentChannel = currentModal.item;
  const channels = useSelector(getChannelsList);
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const createChannel = (values, { setStatus, setSubmitting }) => {
    setStatus();
    setSubmitting(true);
    const newChannel = {
      id: currentChannel.id,
      name: leoProfanity.clean(values.channel),
    };
    api.renameChannel(
      newChannel,
      () => {
        setSubmitting(false);
        onHide();
        toast.success(t('channels.renamed'));
      },
      (error) => {
        rollbar.error(error);
        setSubmitting(false);
      },
    );
  };

  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const getChannelClassNames = (formik) => classNames(
    { 'channel-rename__content': true },
    { 'form-text': true },
    { 'form-text_error': Object.keys(formik.errors).length !== 0 },
  );

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channel: currentChannel.name }}
          validationSchema={() => channelValidation(channels)}
          validateOnBlur={false}
          onSubmit={createChannel}
        >
          {(formik) => (
            <FormikForm className="channel-rename">
              <div className="channel-rename__content">
                <label className="form-field__label" htmlFor="channel">
                  {t('modals.channelName')}
                </label>
                <Field
                  type="text"
                  name="channel"
                  id="channel"
                  placeholder="Enter channel"
                  validate={formik.errors.channel}
                  value={formik.values.channel}
                  onChange={formik.handleChange}
                  className={getChannelClassNames(formik, 'channel')}
                  innerRef={inputEl}
                />
                <ErrorMessage
                  name="channel"
                  render={(msg) => (
                    <div className="form-error channel-rename__error">
                      {t(msg)}
                    </div>
                  )}
                />
              </div>
              <div className="channel-rename__footer">
                <button
                  className="button button_secondary"
                  type="button"
                  disabled={formik.isSubmitting}
                  onClick={onHide}
                >
                  {t('modals.cancel')}
                </button>
                <button
                  className="button"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {t('modals.submit')}
                </button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default ChannelRename;
